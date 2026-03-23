import { v } from "convex/values";
import { query, mutation, internalAction, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

// ── Queries ────────────────────────────────────────────────────────────────

/**
 * List all active products for the logged-in user, newest first.
 */
export const listProducts = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("products")
      .withIndex("by_user_saved", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

/**
 * Get a single product by ID (must belong to the current user).
 */
export const getProduct = query({
  args: { productId: v.id("products") },
  handler: async (ctx, { productId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const product = await ctx.db.get(productId);
    if (!product || product.userId !== userId) return null;
    return product;
  },
});

// ── Mutations ──────────────────────────────────────────────────────────────

/**
 * Add a new product to the wishlist. Starts scraping in background.
 */
export const addProduct = mutation({
  args: {
    url: v.string(),
    label: v.optional(v.string()),
  },
  handler: async (ctx, { url, label }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Create product with pending scraping status
    const productId = await ctx.db.insert("products", {
      userId,
      url,
      label,
      scrapingStatus: "pending",
      savedAt: Date.now(),
    });

    // Schedule background scraping
    await ctx.scheduler.runAfter(0, internal.products.scrapeProduct, {
      productId,
      url,
    });

    return productId;
  },
});

/**
 * Update a product's label (auto-save on blur).
 */
export const updateLabel = mutation({
  args: {
    productId: v.id("products"),
    label: v.string(),
  },
  handler: async (ctx, { productId, label }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const product = await ctx.db.get(productId);
    if (!product || product.userId !== userId) throw new Error("Not found");

    await ctx.db.patch(productId, { label });
  },
});

/**
 * Mark a product as bought: moves it to history table and deletes from products.
 */
export const markAsBought = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, { productId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const product = await ctx.db.get(productId);
    if (!product || product.userId !== userId) throw new Error("Not found");

    // Create history record
    await ctx.db.insert("history", {
      userId,
      url: product.url,
      label: product.label,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      store: product.store,
      savedAt: product.savedAt,
      boughtAt: Date.now(),
    });

    // Delete from wishlist
    await ctx.db.delete(productId);
  },
});

/**
 * Permanently delete a product.
 */
export const deleteProduct = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, { productId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const product = await ctx.db.get(productId);
    if (!product || product.userId !== userId) throw new Error("Not found");

    await ctx.db.delete(productId);
  },
});

/**
 * Internal mutation called by scrapeProduct action to save scraped data.
 */
export const updateScrapingResult = internalMutation({
  args: {
    productId: v.id("products"),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    price: v.optional(v.string()),
    store: v.optional(v.string()),
    scrapingStatus: v.union(v.literal("done"), v.literal("failed")),
  },
  handler: async (ctx, { productId, name, imageUrl, price, store, scrapingStatus }) => {
    await ctx.db.patch(productId, {
      name,
      imageUrl,
      price,
      store,
      scrapingStatus,
    });
  },
});

// ── Internal Queries ──────────────────────────────────────────────────────

/**
 * Internal query: fetch all products for a given userId.
 * Used by generateInsights action.
 */
export const listProductsInternal = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("products")
      .withIndex("by_user_saved", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

// ── Internal Actions ─────────────────────────────────────────────────────────

/**
 * Scrape product metadata from URL using Open Graph / meta tags.
 * Runs in background after addProduct mutation.
 */
export const scrapeProduct = internalAction({
  args: {
    productId: v.id("products"),
    url: v.string(),
  },
  handler: async (ctx, { productId, url }) => {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; WishesApp/1.0; +https://wishes.app)",
          Accept: "text/html",
        },
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const html = await response.text();

      // Extract Open Graph + meta tags
      const getMeta = (property: string): string | undefined => {
        const ogMatch = html.match(
          new RegExp(
            `<meta[^>]+property=["']og:${property}["'][^>]+content=["']([^"']+)["']`,
            "i"
          )
        );
        if (ogMatch) return ogMatch[1];
        const nameMatch = html.match(
          new RegExp(
            `<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`,
            "i"
          )
        );
        return nameMatch ? nameMatch[1] : undefined;
      };

      // Extract price from og:price:amount, meta, or text patterns
      const getPrice = (): string | undefined => {
        const ogPrice = getMeta("price:amount");
        if (ogPrice) {
          const currency = getMeta("price:currency") ?? "BRL";
          return `${ogPrice} ${currency}`;
        }
        // Common price patterns: R$ 99,99 | $ 99.99
        const priceMatch = html.match(
          /(?:R\$|BRL|USD|\$)\s*[\d.,]+(?:\s*\w{0,3})?/i
        );
        return priceMatch ? priceMatch[0].trim() : undefined;
      };

      // Derive store name from URL hostname
      const getStore = (): string => {
        try {
          const { hostname } = new URL(url);
          return hostname.replace(/^www\./, "");
        } catch {
          return url;
        }
      };

      // Extract title: og:title > title tag
      const getTitleTag = (): string | undefined => {
        const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        return match ? match[1].trim() : undefined;
      };

      const result = {
        name: getMeta("title") ?? getTitleTag(),
        imageUrl: getMeta("image"),
        price: getPrice(),
        store: getStore(),
        scrapingStatus: "done" as const,
      };

      await ctx.runMutation(internal.products.updateScrapingResult, {
        productId,
        ...result,
      });
    } catch (err) {
      console.error("Scraping failed for", url, err);
      await ctx.runMutation(internal.products.updateScrapingResult, {
        productId,
        scrapingStatus: "failed",
      });
    }
  },
});
