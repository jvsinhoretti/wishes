import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  // ── Convex Auth built-in tables (sessions, verificationCodes, accounts) ──
  ...authTables,

  // ── Users (extended from authTables base with subscription fields) ─────────
  users: defineTable({
    // Convex Auth base fields
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),

    // Subscription
    subscriptionStatus: v.union(
      v.literal("trial"),
      v.literal("active"),
      v.literal("canceled"),
      v.literal("expired")
    ),
    trialEndsAt: v.optional(v.number()),          // Unix ms — end of 7-day trial
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  // ── Products (wishlist) ───────────────────────────────────────────────────
  products: defineTable({
    userId: v.id("users"),
    url: v.string(),
    label: v.optional(v.string()),         // user-defined tag e.g. "camiseta daora"

    // Scraped metadata (filled async)
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    price: v.optional(v.string()),
    store: v.optional(v.string()),         // hostname derived from URL

    scrapingStatus: v.union(
      v.literal("pending"),
      v.literal("done"),
      v.literal("failed")
    ),

    savedAt: v.number(),                   // Unix ms — when user saved the product
  })
    .index("by_user", ["userId"])
    .index("by_user_saved", ["userId", "savedAt"]),

  // ── History (bought products) ─────────────────────────────────────────────
  history: defineTable({
    userId: v.id("users"),

    // Snapshot of product data at time of purchase
    url: v.string(),
    label: v.optional(v.string()),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    price: v.optional(v.string()),
    store: v.optional(v.string()),
    savedAt: v.number(),                   // original savedAt from products

    boughtAt: v.number(),                  // Unix ms — when user marked as bought
  })
    .index("by_user", ["userId"])
    .index("by_user_bought", ["userId", "boughtAt"]),

  // ── AI Insights ───────────────────────────────────────────────────────────
  insights: defineTable({
    userId: v.id("users"),
    content: v.array(v.string()),          // array of natural-language insight strings
    generatedAt: v.number(),               // Unix ms
    productRefs: v.optional(v.array(v.id("products"))), // products mentioned
  })
    .index("by_user", ["userId"]),
});
