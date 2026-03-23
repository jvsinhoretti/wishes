import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { stripeWebhook } from "./stripe";

const http = httpRouter();

/**
 * Convex Auth HTTP routes (required for OTP verification callbacks)
 * Adds routes like: POST /api/auth/signin, GET /api/auth/verify, etc.
 */
auth.addHttpRoutes(http);

/**
 * Stripe webhook receiver
 * Configure in Stripe dashboard: https://<convex-url>/stripe/webhook
 */
http.route({
  path: "/stripe/webhook",
  method: "POST",
  handler: stripeWebhook,
});

export default http;
