import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";

import { api } from "./_generated/api";
import { query } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [GitHub, Google],
  callbacks: {
    afterUserCreatedOrUpdated: async (ctx, args) => {
      if (!args.existingUserId) {
        ctx.runMutation(api.credits.initializeUserCredits, {
          userId: args.userId,
        });
      }
    },
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const user = await ctx.db.get(userId);

    return user;
  },
});
