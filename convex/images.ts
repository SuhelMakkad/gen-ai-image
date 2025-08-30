import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { v4 as uuidv4 } from "uuid";

import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const generation = await ctx.db
      .query("generations")
      .withIndex("by_id", (q) => q.eq("_id", args.id as Id<"generations">))
      .first();
    if (!generation) {
      throw null;
    }

    return {
      ...generation,
      imageUrl: await ctx.storage.getUrl(generation.imageId),
    };
  },
});

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

    // Check if user has sufficient credits
    const creditCheck = await ctx.runQuery(internal.credits.checkCreditsAvailable, {
      requiredAmount: 1,
    });

    if (!creditCheck.available) {
      throw new Error(
        `Insufficient credits. You have ${creditCheck.balance} credits but need ${creditCheck.required}.`
      );
    }

    // Deduct credits before generation
    await ctx.runMutation(internal.credits.deductCredits, {
      userId,
      amount: 1,
      source: "image_generation",
      sourceId: uuid, // Will be set to generation ID after creation
    });

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

export const listPublicShowcase = query({
  args: {},
  handler: async (ctx) => {
    const maxGenerations = 16;
    const generations = await ctx.db.query("generations").order("desc").take(maxGenerations);

    // get latest generation for each user
    const generationsWithImageUrl = await Promise.all(
      generations.map(async (generation) => {
        const imageUrl = await ctx.storage.getUrl(generation.imageId);
        if (!imageUrl) {
          return null;
        }

        const { userId: _, ...generationWithoutUserId } = generation;

        return {
          ...generationWithoutUserId,
          imageUrl,
        };
      })
    );

    const filteredGenerations = generationsWithImageUrl.filter(Boolean);

    return filteredGenerations as {
      imageUrl: string;
      _id: Id<"generations">;
      _creationTime: number;
      id: string;
      prompt: string;
      style: string;
      imageId: Id<"_storage">;
    }[];
  },
});
