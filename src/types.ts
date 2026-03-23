/**
 * TypeScript types derived from the Convex schema.
 * Import Doc and Id from the generated data model.
 *
 * Usage:
 *   import type { Product, HistoryItem, Insight, User } from "@/types";
 */
import type { Doc, Id } from "../convex/_generated/dataModel";

// Re-export Convex primitive types for convenience
export type { Doc, Id };

// ── Domain types ───────────────────────────────────────────────────────────

/** A wishlist item (active product). */
export type Product = Doc<"products">;

/** A purchased product stored in history. */
export type HistoryItem = Doc<"history">;

/** An AI-generated insight document. */
export type Insight = Doc<"insights">;

/** User document with subscription fields. */
export type User = Doc<"users">;

// ── Enum helpers ───────────────────────────────────────────────────────────

export type SubscriptionStatus =
  | "trial"
  | "active"
  | "canceled"
  | "expired";

export type ScrapingStatus = "pending" | "done" | "failed";

// ── Utility types ──────────────────────────────────────────────────────────

/** Check if a user can add products (trial not expired OR active subscription). */
export function isSubscriptionActive(
  status: SubscriptionStatus,
  trialEndsAt?: number
): boolean {
  if (status === "active") return true;
  if (status === "trial") {
    return !trialEndsAt || Date.now() < trialEndsAt;
  }
  return false;
}

/** Human-readable subscription status labels (pt-BR). */
export const SUBSCRIPTION_LABELS: Record<SubscriptionStatus, string> = {
  trial: "Trial gratuito",
  active: "Assinante ativo",
  canceled: "Cancelado",
  expired: "Expirado",
};
