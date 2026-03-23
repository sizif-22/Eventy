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
    <div className="bg-[#0D0D0D] min-h-screen pb-20">
      <AppNavbar />

      <main className="max-w-7xl mx-auto px-6 pt-24">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col">
            <span className="font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B6B6B] mb-2">
              YOUR EVENTS
            </span>
            <h1 className="font-newsreader italic text-[48px] text-[#E8E4DC] leading-tight">
              Your Projects
            </h1>
            <p className="font-inter text-[14px] text-[#6B6B6B] mt-2">
              3 events · Free Plan · 2 credits remaining
            </p>
          </div>

          <button className="bg-[#E8E4DC] text-[#0D0D0D] font-inter text-[13px] px-6 py-2.5 rounded-sm hover:bg-[#d4d0c8] transition-colors flex items-center gap-2">
            <Plus size={16} /> New Event
          </button>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#6B6B6B]/15 my-10" />

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
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <h2 className="font-newsreader italic text-[32px] text-[#6B6B6B]/50">
              No events yet.
            </h2>
            <p className="font-inter text-[14px] text-[#6B6B6B] mt-4">
              Create your first event and bring it to life.
            </p>
            <button className="mt-8 border border-[#E8E4DC] text-[#E8E4DC] font-inter text-sm px-8 py-3 rounded-sm hover:bg-[#E8E4DC]/5 transition-colors">
              Create Event →
            </button>
          </div>
        )}

        {/* Console Footer */}
        <footer className="mt-32 pt-8 border-t border-[#6B6B6B]/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="font-cinzel text-xs tracking-widest text-[#E8E4DC]">EVNETY</span>
            <span className="font-inter text-[12px] text-[#6B6B6B]">© 2025</span>
          </div>
          <div className="flex items-center gap-8 font-inter text-[12px] text-[#6B6B6B]">
            <Link href="#" className="hover:text-[#E8E4DC] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#E8E4DC] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#E8E4DC] transition-colors">Contact</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
