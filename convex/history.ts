import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

/**
 * List purchased products for the current user, most recently bought first.
 */
export const listHistory = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("history")
      .withIndex("by_user_bought", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

/**
 * Get a single history item by ID (must belong to current user).
 */
export const getHistoryItem = query({
  args: { historyId: v.id("history") },
  handler: async (ctx, { historyId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const item = await ctx.db.get(historyId);
    if (!item || item.userId !== userId) return null;
    return item;
  },
});

/**
 * Restore a history item back to the active wishlist.
 */
export const restoreToList = mutation({
  args: { historyId: v.id("history") },
  handler: async (ctx, { historyId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const item = await ctx.db.get(historyId);
    if (!item || item.userId !== userId) throw new Error("Not found");

    // Re-insert into products
    await ctx.db.insert("products", {
      userId,
      url: item.url,
      label: item.label,
      name: item.name,
      imageUrl: item.imageUrl,
      price: item.price,
      store: item.store,
      scrapingStatus: "done",
      savedAt: item.savedAt,
    });

    // Remove from history
    await ctx.db.delete(historyId);
  },
});
