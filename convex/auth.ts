import { convexAuth } from "@convex-dev/auth/server";
import { Email } from "@convex-dev/auth/providers/Email";
import Resend from "@auth/core/providers/resend";

/**
 * Convex Auth — Email Magic Link via Resend
 *
 * Flow:
 * 1. User submits email → signIn("resend", { email })
 * 2. Resend sends Magic Link to user's email
 * 3. User clicks link → Authenticated
 *
 * Requires env vars in Convex dashboard:
 *   AUTH_RESEND_KEY  — Resend API key
 *   AUTH_SECRET      — Random 32+ char secret for session signing
 */
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Email({
      id: "resend",
      sendVerificationRequest: Resend({
        apiKey: process.env.AUTH_RESEND_KEY,
      }).sendVerificationRequest,
    }),
  ],
});

