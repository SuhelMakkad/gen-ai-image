import GitHub from "@auth/core/providers/github";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { queryGeneric } from "convex/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [GitHub],
});

export const currentUser = queryGeneric({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    return (await ctx.db.get(userId)) as {
      email: string;
      name: string;
      image: string;
      _creationTime: number;
      _id: string;
    };
  },
});
