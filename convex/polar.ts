// convex/example.ts
import { Polar } from "@convex-dev/polar";

import { api, components } from "./_generated/api";
import { action } from "./_generated/server";
import { env } from "./lib/env";

const devProducts = {
  hobby: "fa291e9e-a706-41e6-9f73-e8597572a4b4",
  pro: "e334a7bb-6558-42cf-8221-b2a823abb012",
};

const prodProducts = {
  hobby: "fa291e9e-a706-41e6-9f73-e8597572a4b4",
  pro: "e334a7bb-6558-42cf-8221-b2a823abb012",
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

  products: polarProducts,
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

export const syncProducts = action(async (ctx) => {
  await polar.syncProducts(ctx);
});
