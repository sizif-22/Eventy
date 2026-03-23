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
      status: "PENDING",
    });

    // Schedule the confirmation email
    await ctx.scheduler.runAfter(0, api.email.sendRsvpEmail, {
      submissionId,
    });

    return submissionId;
  },
});
export const getUserEvents = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return await ctx.db
      .query("events")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const getEventById = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.eventId);
  },
});

export const getEventSubmissions = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("submissions")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();
  },
});

export const getEventStats = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    const submissions = await ctx.db
      .query("submissions")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();

    const rsvps = submissions.length;
    const checkIns = submissions.filter((s) => s.status === "CHECKED_IN").length;

    return {
      views: event?.totalViews ?? 0,
      rsvps,
      checkIns,
      capacity: 100, // Default capacity for now
    };
  },
});

export const incrementViews = mutation({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (event) {
      await ctx.db.patch(args.eventId, {
        totalViews: (event.totalViews ?? 0) + 1,
      });
    }
  },
});

export const updateSubmissionStatus = mutation({
  args: { 
    submissionId: v.id("submissions"),
    status: v.string() 
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.submissionId, {
      status: args.status,
    });
  },
});
