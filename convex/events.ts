import { v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { api } from './_generated/api';

export const createEvent = mutation({
  args: {
    routeName: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    colors: v.any(),
    content: v.any(),
    form: v.any(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    // Check if route name is already taken
    const existing = await ctx.db
      .query("events")
      .withIndex("by_route", (q) => q.eq("routeName", args.routeName))
      .first();

    if (existing && existing.userId !== identity.subject) {
      throw new Error("Route name is already taken by another user");
    }

    if (existing) {
      // Update existing
      await ctx.db.patch(existing._id, {
        ...args,
        userId: identity.subject,
      });
      return existing._id;
    } else {
      // Insert new
      return await ctx.db.insert("events", {
        ...args,
        userId: identity.subject,
      });
    }
  },
});

export const getEventByRoute = query({
  args: { routeName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .withIndex("by_route", (q) => q.eq("routeName", args.routeName))
      .first();
  },
});

export const submitRsvp = mutation({
  args: {
    eventId: v.id("events"),
    answers: v.any(),
  },
  handler: async (ctx, args) => {
    const submissionId = await ctx.db.insert("submissions", {
      eventId: args.eventId,
      answers: args.answers,
    });

    // Schedule the confirmation email
    await ctx.scheduler.runAfter(0, api.email.sendRsvpEmail, {
      submissionId,
    });

    return submissionId;
  },
});
