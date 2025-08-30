import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,

  generations: defineTable({
    id: v.string(),
    userId: v.id("users"),
    prompt: v.string(),
    style: v.string(),
    imageId: v.id("_storage"),
  }).index("by_user", ["userId"]),

  userCredits: defineTable({
    userId: v.id("users"),
    balance: v.number(),
    totalEarned: v.number(),
    totalSpent: v.number(),
  }).index("by_user", ["userId"]),

  creditTransactions: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("earned"), v.literal("spent")),
    amount: v.number(),
    source: v.string(),
    sourceId: v.optional(v.string()),
    balanceAfter: v.number(),
    metadata: v.optional(v.any()),
  })
    .index("by_user", ["userId"])
    .index("by_type", ["type"])
    .index("by_user_type", ["userId", "type"]),
});
