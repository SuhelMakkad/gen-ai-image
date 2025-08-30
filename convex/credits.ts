import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";

const INITIAL_CREDITS = 3;

export const getUserCredits = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!userCredits) {
      return {
        balance: 0,
        totalEarned: 0,
        totalSpent: 0,
      };
    }

    return {
      balance: userCredits.balance,
      totalEarned: userCredits.totalEarned,
      totalSpent: userCredits.totalSpent,
    };
  },
});

export const initializeUserCredits = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const existingCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (existingCredits) {
      return existingCredits;
    }

    const userCreditsId = await ctx.db.insert("userCredits", {
      userId: args.userId,
      balance: INITIAL_CREDITS,
      totalEarned: INITIAL_CREDITS,
      totalSpent: 0,
    });

    await ctx.db.insert("creditTransactions", {
      userId: args.userId,
      type: "earned",
      amount: INITIAL_CREDITS,
      source: "initial_signup",
      balanceAfter: INITIAL_CREDITS,
    });

    return await ctx.db.get(userCreditsId);
  },
});

export const deductCredits = internalMutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
    source: v.string(),
    sourceId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!userCredits) {
      throw new Error("User credits not found");
    }

    if (userCredits.balance < args.amount) {
      throw new Error("Insufficient credits");
    }

    const newBalance = userCredits.balance - args.amount;
    const newTotalSpent = userCredits.totalSpent + args.amount;

    await ctx.db.patch(userCredits._id, {
      balance: newBalance,
      totalSpent: newTotalSpent,
    });

    await ctx.db.insert("creditTransactions", {
      userId: args.userId,
      type: "spent",
      amount: args.amount,
      source: args.source,
      sourceId: args.sourceId,
      balanceAfter: newBalance,
    });

    return {
      balance: newBalance,
      totalSpent: newTotalSpent,
      totalEarned: userCredits.totalEarned,
    };
  },
});

export const addCredits = mutation({
  args: {
    userId: v.string(),
    amount: v.number(),
    source: v.string(),
    sourceId: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId as Id<"users">;
    let userCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!userCredits) {
      userCredits = await ctx.db.get(
        await ctx.db.insert("userCredits", {
          userId,
          balance: 0,
          totalEarned: 0,
          totalSpent: 0,
        })
      );
    }

    const newBalance = userCredits!.balance + args.amount;
    const newTotalEarned = userCredits!.totalEarned + args.amount;

    await ctx.db.patch(userCredits!._id, {
      balance: newBalance,
      totalEarned: newTotalEarned,
    });

    await ctx.db.insert("creditTransactions", {
      userId,
      type: "earned",
      amount: args.amount,
      source: args.source,
      sourceId: args.sourceId,
      balanceAfter: newBalance,
      metadata: args.metadata,
    });

    return {
      balance: newBalance,
      totalEarned: newTotalEarned,
      totalSpent: userCredits!.totalSpent,
    };
  },
});

export const getCreditHistory = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const transactions = await ctx.db
      .query("creditTransactions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(args.limit || 50);

    return transactions;
  },
});

export const checkCreditsAvailable = internalQuery({
  args: {
    requiredAmount: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!userCredits) {
      return {
        available: false,
        balance: 0,
        required: args.requiredAmount,
      };
    }

    return {
      available: userCredits.balance >= args.requiredAmount,
      balance: userCredits.balance,
      required: args.requiredAmount,
    };
  },
});
