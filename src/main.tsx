import React from "react";
import ReactDOM from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";

/**
 * Convex client — reads VITE_CONVEX_URL from .env.local
 * Run `npx convex dev` first to get your deployment URL.
 */
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexAuthProvider client={convex}>
      {/*
        App shell goes here.
        Pages and routing will be added when the design system is provided.
        For now, this file just wires up Convex + Auth providers.
      */}
      <div id="app-root" />
    </ConvexAuthProvider>
  </React.StrictMode>
);
