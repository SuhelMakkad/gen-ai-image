// convex/example.ts
import { Polar } from "@convex-dev/polar";

import { api, components } from "./_generated/api";
import { env } from "./lib/env";

const devProducts = {
  hobby: "985b83bd-6d19-42f8-9131-d967fff66719",
  pro: "2d48971e-e82e-467c-a7ba-e0a206fec6c0",
};

const prodProducts = {
  hobby: "7419c091-a26b-49d9-9bdd-00e7bca40b6f",
  pro: "08f926c2-d876-4130-a80e-6413640d9fe3",
};

const polarProducts = env.POLAR_SERVER === "production" ? prodProducts : devProducts;

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

  products: {
    hobby: polarProducts.hobby,
    pro: polarProducts.pro,
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
