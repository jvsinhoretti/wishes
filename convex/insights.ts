import Anthropic from "@anthropic-ai/sdk";
import { v } from "convex/values";
import { query, action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

const MIN_PRODUCTS_FOR_INSIGHTS = 3;

/**
 * Get the most recent insights for the current user.
 */
export const getInsights = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    return await ctx.db
      .query("insights")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .first();
  },
});

/**
 * Internal mutation to save generated insights.
 */
export const saveInsights = internalMutation({
  args: {
    userId: v.id("users"),
    content: v.array(v.string()),
  },
  handler: async (ctx, { userId, content }) => {
    await ctx.db.insert("insights", {
      userId,
      content,
      generatedAt: Date.now(),
    });
  },
});

/**
 * Generate AI insights about the user's wishlist using Claude.
 * Requires at least 3 products.
 */
export const generateInsights = action({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Load products
    const products = await ctx.runQuery(internal.products.listProductsInternal, {
      userId,
    });

    if (products.length < MIN_PRODUCTS_FOR_INSIGHTS) {
      throw new Error(
        `Need at least ${MIN_PRODUCTS_FOR_INSIGHTS} products to generate insights`
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const productList = products
      .map(
        (p: any, i: number) =>
          `${i + 1}. "${p.name ?? p.url}" — ${p.store ?? "??"} — ${p.price ?? "preço não capturado"} — salvo há ${Math.floor((Date.now() - p.savedAt) / 86_400_000)} dias${p.label ? ` — etiqueta: "${p.label}"` : ""}`
      )
      .join("\n");

    const message = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Você é um assistente pessoal de compras. Analise esta wishlist e gere de 3 a 5 insights curtos e úteis em português, em linguagem natural e casual.

Foque em:
- Produtos há muito tempo na lista (prioridade de compra)
- Padrões de categoria ou interesse
- Variações de preço ou contexto
- Observações motivacionais para reativar intenção de compra

Retorne APENAS um array JSON de strings, sem nenhum texto extra. Exemplo:
["Insight 1", "Insight 2", "Insight 3"]

Wishlist atual:
${productList}`,
        },
      ],
    });

    const rawContent = message.content[0];
    if (rawContent.type !== "text") throw new Error("Unexpected response type");

    // Parse JSON array from Claude response
    const jsonMatch = rawContent.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("Could not parse insights JSON");

    const insights: string[] = JSON.parse(jsonMatch[0]);

    // Save insights
    await ctx.runMutation(internal.insights.saveInsights, {
      userId,
      content: insights,
    });

    return insights;
  },
});
