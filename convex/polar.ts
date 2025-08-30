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

    console.log("user", user);
    return {
      userId: user._id,
      email: user.email,
    };
  },

  products: {
    hobby: "985b83bd-6d19-42f8-9131-d967fff66719",
    pro: "2d48971e-e82e-467c-a7ba-e0a206fec6c0",
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

// Credit amounts for each product
export const PRODUCT_CREDIT_MAPPING = {
  [polar.products.hobby]: 10, // 10 credits for hobby plan
  [polar.products.pro]: 25,   // 25 credits for pro plan
} as const;

// Helper function to get credits for a product ID
export const getCreditsForProduct = (productId: string): number => {
  return PRODUCT_CREDIT_MAPPING[productId] || 0;
};
