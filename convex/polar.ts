// convex/example.ts
import { Polar } from "@convex-dev/polar";

import { api, components } from "./_generated/api";
import { env } from "./lib/env";

export const polar = new Polar(components.polar, {
  getUserInfo: async (ctx) => {
    const user = (await ctx.runQuery(api.auth.currentUser)) as {
      _id: string;
      email: string;
    };
    return {
      userId: user._id,
      email: user.email,
    };
  },

  // Optional: Set Polar configuration directly in code
  organizationToken: env.POLAR_ORGANIZATION_TOKEN, // Defaults to POLAR_ORGANIZATION_TOKEN env var
  webhookSecret: env.POLAR_WEBHOOK_SECRET, // Defaults to POLAR_WEBHOOK_SECRET env var
  server: (env.POLAR_SERVER as "sandbox" | "production") || "sandbox", // Optional: "sandbox" or "production", defaults to POLAR_SERVER env var
});

// Export API functions from the Polar client
export const {
  changeCurrentSubscription,
  cancelCurrentSubscription,
  getConfiguredProducts,
  listAllProducts,
  generateCheckoutLink,
  generateCustomerPortalUrl,
} = polar.api();
