'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { AppNavbar } from '@/components/nav/AppNavbar';
import { EventCard } from '@/components/cards/EventCard';
import { CreateEventCard } from '@/components/cards/CreateEventCard';

const MOCK_EVENTS = [
  {
    id: '1',
    title: "Nocturnal Vernissage '24",
    date: "October 14, 2024",
    location: "The Glass House, NYC",
    image: "/events/art-gallery.png",
    status: 'LIVE' as const,
  },
  {
    id: '2',
    title: "The Obsidian Gala",
    date: "November 02, 2024",
    location: "Brutalist Hall, London",
    image: "/events/black-tie.png",
    status: 'DRAFT' as const,
  },
  {
    id: '3',
    title: "Cinematic Textures Workshop",
    date: "December 12, 2024",
    location: "Studio 44, Berlin",
    image: "/events/workshop.png",
    status: 'LIVE' as const,
  },
];

export default function ConsolePage() {
  return (
    <div className="bg-background min-h-screen pb-20">
      <AppNavbar />

      <main className="max-w-7xl mx-auto px-6 pt-24 md:pt-32">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="flex flex-col">
            <span className="font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-secondary mb-2">
              YOUR EVENTS
            </span>
            <h1 className="font-newsreader italic text-4xl md:text-[56px] text-foreground leading-tight">
              Your Projects
            </h1>
            <p className="font-inter text-[14px] text-secondary mt-2">
              {MOCK_EVENTS.length} events · Free Plan · 2 credits remaining
            </p>
          </div>

          <Link href="/eventEditor" className="w-full md:w-auto">
            <button className="w-full bg-foreground text-background font-inter text-[13px] px-6 py-3 rounded-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Plus size={16} /> New Event
            </button>
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-secondary/15 my-10 md:my-14" />

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CreateEventCard />
          {MOCK_EVENTS.map((event) => (
            <Link key={event.id} href="/eventEditor">
              <EventCard {...event} />
            </Link>
          ))}
        </div>

        {MOCK_EVENTS.length === 0 && (
          <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center">
            <h2 className="font-newsreader italic text-3xl md:text-[40px] text-secondary/50">
              No events yet.
            </h2>
            <p className="font-inter text-[14px] text-secondary mt-4">
              Create your first event and bring it to life.
            </p>
            <Link href="/eventEditor">
              <button className="mt-8 border border-foreground text-foreground font-inter text-sm px-8 py-3 rounded-sm hover:bg-foreground/5 transition-colors cursor-pointer">
                Create Event →
              </button>
            </Link>
          </div>
        )}

        {/* Console Footer */}
        <footer className="mt-32 pt-8 border-t border-secondary/15 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
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

