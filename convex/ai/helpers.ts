import { v } from "convex/values";

import { internal } from "../_generated/api";
import { internalAction, internalMutation } from "../_generated/server";
import { base64ToBlob } from "../lib/base64ToBlob";
import { genImage } from "./openai";

export const saveImage = internalMutation({
  args: {
    id: v.string(),
    userId: v.id("users"),
    imageId: v.id("_storage"),
    prompt: v.string(),
    aspectRatio: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("in saveImage", args.userId);
    await ctx.db.insert("generations", {
      id: args.id,
      userId: args.userId,
      prompt: args.prompt,
      imageId: args.imageId,
      aspectRatio: args.aspectRatio,
    });
  },
});

export const generateImgAction = internalAction({
  args: {
    userId: v.id("users"),
    uuid: v.string(),
    prompt: v.string(),
    aspectRatio: v.string(),
  },
  handler: async (ctx, args) => {
    const base64ImageString = await genImage(args.prompt);
    if (!base64ImageString) {
      throw new Error("Something went wrong");
    }
    console.log("in generateImgAction", args.userId);

    const imageId = await ctx.storage.store(
      base64ToBlob(base64ImageString.replace(/^data:image\/\w+;base64,/, ""), "image/png")
    );

    await ctx.runMutation(internal.ai.helpers.saveImage, {
      imageId,
      id: args.uuid,
      userId: args.userId,
      prompt: args.prompt,
      aspectRatio: args.aspectRatio,
    });

    return imageId;
  },
});
