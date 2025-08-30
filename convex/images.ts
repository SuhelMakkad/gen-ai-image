import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { v4 as uuidv4 } from "uuid";

import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not found");
    }

    const generations = await ctx.db
      .query("generations")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(10);

    return Promise.all(
      generations.map(async (generation) => ({
        ...generation,
        imageUrl: await ctx.storage.getUrl(generation.imageId),
      }))
    );
  },
});

export const generate = mutation({
  args: {
    prompt: v.string(),
    style: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not found");
    }

    const uuid = uuidv4();

    await ctx.scheduler.runAfter(0, internal.ai.helpers.generateImgAction, {
      uuid,
      userId,
      prompt: args.prompt,
      style: args.style,
    });

    return {
      id: uuid,
    };
  },
});
