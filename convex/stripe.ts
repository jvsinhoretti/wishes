import Stripe from "stripe";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

/**
 * Stripe Webhook Handler
 *
 * Endpoint: POST /stripe/webhook
 * Configure in Stripe Dashboard → Webhooks → Add endpoint
 *
 * Events handled:
 *   checkout.session.completed      → trial → active, save subscription IDs
 *   invoice.payment_succeeded       → keep active
 *   invoice.payment_failed          → set expired
 *   customer.subscription.deleted  → set canceled
 *   customer.subscription.updated  → sync status
 */
export const stripeWebhook = httpAction(async (ctx, request) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
  });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const body = await request.text();
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        await ctx.runMutation(internal.users.updateSubscription, {
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          subscriptionStatus: "active",
        });
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        await ctx.runMutation(internal.users.updateSubscription, {
          stripeCustomerId: customerId,
          subscriptionStatus: "active",
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        await ctx.runMutation(internal.users.updateSubscription, {
          stripeCustomerId: customerId,
          subscriptionStatus: "expired",
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await ctx.runMutation(internal.users.updateSubscription, {
          stripeCustomerId: customerId,
          subscriptionStatus: "canceled",
        });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const stripeStatus = subscription.status;

        // Map Stripe subscription statuses to app statuses
        const statusMap: Record<string, "active" | "canceled" | "expired"> = {
          active: "active",
          past_due: "expired",
          canceled: "canceled",
          unpaid: "expired",
          incomplete_expired: "expired",
        };

        const appStatus = statusMap[stripeStatus];
        if (appStatus) {
          await ctx.runMutation(internal.users.updateSubscription, {
            stripeCustomerId: customerId,
            subscriptionStatus: appStatus,
          });
        }
        break;
      }

      default:
        // Unhandled event — ignore silently
        break;
    }
  } catch (err) {
    console.error("Error processing Stripe event:", event.type, err);
    return new Response("Internal error", { status: 500 });
  }

  return new Response(null, { status: 200 });
});
