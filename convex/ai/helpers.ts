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
    style: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("generations", {
      id: args.id,
      userId: args.userId,
      prompt: args.prompt,
      imageId: args.imageId,
      style: args.style,
    });
  },
});

export const generateImgAction = internalAction({
  args: {
    userId: v.id("users"),
    uuid: v.string(),
    prompt: v.string(),
    style: v.string(),
  },
  handler: async (ctx, args) => {
    const base64ImageString = await genImage(args.prompt, args.style);
    if (!base64ImageString) {
      throw new Error("Something went wrong");
    }

    const imageId = await ctx.storage.store(
      base64ToBlob(base64ImageString.replace(/^data:image\/\w+;base64,/, ""), "image/png")
    );

    await ctx.runMutation(internal.ai.helpers.saveImage, {
      imageId,
      id: args.uuid,
      userId: args.userId,
      prompt: args.prompt,
      style: args.style,
    });

    return imageId;
  },
});
