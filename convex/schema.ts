import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  events: defineTable({
    routeName: v.string(),
    userId: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    colors: v.any(),
    content: v.any(),
    form: v.any(),
    totalViews: v.optional(v.number()),
  }).index("by_route", ["routeName"])
    .index("by_user", ["userId"]),
  
  submissions: defineTable({
    eventId: v.id("events"),
    answers: v.any(),
    status: v.optional(v.string()), // PENDING, CHECKED_IN
  }).index("by_event", ["eventId"]),
});
