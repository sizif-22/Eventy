'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { AppNavbar } from '@/components/nav/AppNavbar';
import { EventCard } from '@/components/cards/EventCard';
import { CreateEventCard } from '@/components/cards/CreateEventCard';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function ConsolePage() {
  const events = useQuery(api.events.getUserEvents);

  const isLoading = events === undefined;
  const eventList = events || [];

  return (
    <div className="bg-background min-h-screen pb-20">
      <AppNavbar />

      <main className="max-w-7xl mx-auto px-6 pt-24 md:pt-32">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="flex flex-col">
            <span className="font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-secondary mb-2">
              YOUR PROJECTS
            </span>
            <h1 className="font-newsreader italic text-4xl md:text-[56px] text-foreground leading-tight">
              Console
            </h1>
            {!isLoading && (
              <p className="font-inter text-[14px] text-secondary mt-2">
                {eventList.length} total events · Free Plan
              </p>
            )}
          </div>

          <Link href="/eventEditor" className="w-full md:w-auto">
            <button className="w-full bg-foreground text-background font-inter text-[13px] px-6 py-3 rounded-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl">
              <Plus size={16} /> New Event
            </button>
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-secondary/15 my-10" />

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* <CreateEventCard /> */}
          {eventList.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              routeName={event.routeName}
              title={event.content?.heading || event.routeName}
              eventName={event.content?.eventName}
              date={event.date}
              location={event.location}
              heroImage={event.content?.heroImage}
              featureImage={event.content?.featureImage}
              status="LIVE"
            />
          ))}
        </div>

        {!isLoading && eventList.length === 0 && (
          <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center">
            <h2 className="font-newsreader italic text-3xl md:text-[40px] text-secondary/30">
              No events found.
            </h2>
            <p className="font-inter text-[14px] text-secondary mt-4 max-w-sm">
              You haven't created any events yet. Start your next project with Evnety.
            </p>
            <Link href="/eventEditor">
              <button className="mt-8 border border-secondary/40 text-secondary hover:text-foreground font-inter text-[13px] px-8 py-3 rounded-sm hover:bg-foreground/5 transition-all cursor-pointer">
                Create First Event →
              </button>
            </Link>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-40 grayscale animate-pulse">
            <div className="h-80 bg-background-2 border border-secondary/10 rounded-sm" />
            <div className="h-80 bg-background-2 border border-secondary/10 rounded-sm" />
            <div className="h-80 bg-background-2 border border-secondary/10 rounded-sm" />
          </div>
        )}

        {/* Console Footer */}
        <footer className="mt-20 pt-8 border-t border-secondary/15 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <span className="font-cinzel text-xs tracking-widest text-foreground">EVNETY</span>
            <span className="font-inter text-[12px] text-secondary">© 2025</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 font-inter text-[12px] text-secondary font-medium">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Support</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

