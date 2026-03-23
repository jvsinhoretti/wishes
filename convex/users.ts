import Stripe from "stripe";
import { v } from "convex/values";
import { query, internalMutation, internalQuery, action } from "./_generated/server";
import { internal } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

// ── Queries ────────────────────────────────────────────────────────────────

/**
 * Return the currently logged-in user's data (including subscription status).
 */
export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db.get(userId);
  },
});

/**
 * Check whether the current user can add new products.
 * Returns true only for active subscriptions or unexpired trials.
 */
export const canAddProducts = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const user = await ctx.db.get(userId);
    if (!user) return false;

    const { subscriptionStatus, trialEndsAt } = user;

    if (subscriptionStatus === "active") return true;

    if (subscriptionStatus === "trial") {
      // Trial valid if trialEndsAt hasn't passed
      return !trialEndsAt || Date.now() < trialEndsAt;
    }

    return false;
  },
});

// ── Internal Mutations ─────────────────────────────────────────────────────

/**
 * Called by the Stripe webhook to update subscription status.
 * Looked up by stripeCustomerId since that's what Stripe sends.
 */
export const updateSubscription = internalMutation({
  args: {
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.optional(v.string()),
    subscriptionStatus: v.union(
      v.literal("trial"),
      v.literal("active"),
      v.literal("canceled"),
      v.literal("expired")
    ),
  },
  handler: async (ctx, { stripeCustomerId, stripeSubscriptionId, subscriptionStatus }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_stripe_customer", (q) =>
        q.eq("stripeCustomerId", stripeCustomerId)
      )
      .unique();

    if (!user) {
      console.error("User not found for stripeCustomerId:", stripeCustomerId);
      return;
    }

    const patch: Record<string, unknown> = { subscriptionStatus };
    if (stripeSubscriptionId) patch.stripeSubscriptionId = stripeSubscriptionId;

    await ctx.db.patch(user._id, patch);
  },
});

/**
 * Set stripeCustomerId for a user (called after Stripe customer is created).
 */
export const setStripeCustomerId = internalMutation({
  args: {
    userId: v.id("users"),
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, { userId, stripeCustomerId }) => {
    await ctx.db.patch(userId, { stripeCustomerId });
  },
});

// ── Actions ────────────────────────────────────────────────────────────────

/**
 * Create a Stripe Checkout session for the subscription plan.
 * Returns the Checkout URL to redirect the user.
 */
export const createStripeCheckout = action({
  args: {},
  handler: async (ctx): Promise<string> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.runQuery(internal.users.currentUserInternal, { userId });
    if (!user) throw new Error("User not found");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });

    // Create or retrieve Stripe customer
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        metadata: { convexUserId: userId },
      });
      stripeCustomerId = customer.id;
      await ctx.runMutation(internal.users.setStripeCustomerId, {
        userId,
        stripeCustomerId,
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.VITE_CONVEX_URL?.replace("convex.cloud", "vercel.app") ?? "http://localhost:5173"}/?checkout=success`,
      cancel_url: `${process.env.VITE_CONVEX_URL?.replace("convex.cloud", "vercel.app") ?? "http://localhost:5173"}/?checkout=canceled`,
    });

    return session.url ?? "";
  },
});

/**
 * Create a Stripe Customer Portal session.
 * Returns the portal URL so the user can manage their subscription.
 */
export const createCustomerPortal = action({
  args: {},
  handler: async (ctx): Promise<string> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.runQuery(internal.users.currentUserInternal, { userId });
    if (!user?.stripeCustomerId) {
      throw new Error("No Stripe customer found");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.VITE_CONVEX_URL?.replace("convex.cloud", "vercel.app") ?? "http://localhost:5173"}/conta`,
    });

    return session.url;
  },
});

// ── Internal Query ─────────────────────────────────────────────────────────

/**
 * Internal version of currentUser for use in actions.
 */
export const currentUserInternal = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db.get(userId);
  },
});
