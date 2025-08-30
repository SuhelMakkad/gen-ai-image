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
});
