'use client';

import React, { useState } from 'react';
import { ChevronRight, ExternalLink, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppNavbar } from '@/components/nav/AppNavbar';
import { StatsBar } from '@/components/dashboard/StatsBar';
import { ResponsesTab } from '@/components/dashboard/tabs/ResponsesTab';
import { BroadcastTab } from '@/components/dashboard/tabs/BroadcastTab';
import { QRScannerTab } from '@/components/dashboard/tabs/QRScannerTab';
import { ShareTab } from '@/components/dashboard/tabs/ShareTab';
import Link from 'next/link';

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

type Tab = 'Responses' | 'Broadcast' | 'QR Scanner' | 'Share';

const tabs: Tab[] = ['Responses', 'Broadcast', 'QR Scanner', 'Share'];

export default function EventDashboard() {
  const params = useParams();
  const eventId = params.eventId as Id<"events">;
  const [activeTab, setActiveTab] = useState<Tab>('Responses');

  const event = useQuery(api.events.getEventById, { eventId });
  const stats = useQuery(api.events.getEventStats, { eventId });

  if (event === undefined || stats === undefined) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#E8E4DC]/20 border-t-[#E8E4DC] rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center gap-6 p-8 text-center">
        <h1 className="font-newsreader italic text-6xl text-[#E8E4DC]/20">404</h1>
        <p className="font-inter text-secondary uppercase tracking-[0.2em]">Project not found.</p>
        <Link href="/console" className="mt-8 px-8 py-3 bg-[#E8E4DC] text-[#0D0D0D] font-inter text-sm uppercase tracking-widest rounded-sm">Back to Console</Link>
      </div>
    );
  }

  const title = event.content?.heading || event.routeName;

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      <AppNavbar 
        eventName={event.content?.eventName} 
      />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 pt-32 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-inter text-[12px] text-[#6B6B6B]">
          <Link href="/console" className="hover:text-[#E8E4DC] transition-colors">Your Projects</Link>
          <ChevronRight size={12} className="text-[#6B6B6B]/50" />
          <span className="text-[#6B6B6B]/80 truncate max-w-[200px]">{title}</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8">
          <div className="space-y-3 flex-1">
            <span className="font-inter text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B]">Event Management</span>
            <h1 className="font-newsreader italic text-5xl md:text-7xl text-[#E8E4DC] leading-tight max-w-4xl">{title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-inter text-sm text-[#6B6B6B] mt-4">
              <span>{event.date}</span>
              <span className="text-[#6B6B6B]/20">/</span>
              <span>{event.location}</span>
              <span className="border border-[#E8E4DC]/30 text-[#E8E4DC]/70 font-inter text-[10px] uppercase tracking-widest px-3 py-1 ml-2 rounded-sm">
                Status: Live
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-8 md:mt-0">
            <Link href={`/e/${event.routeName}`} target="_blank">
              <button className="border border-[#E8E4DC] text-[#E8E4DC] hover:bg-[#E8E4DC] hover:text-[#0D0D0D] font-inter text-[13px] px-6 py-2.5 rounded-sm transition-all flex items-center gap-2 cursor-pointer">
                <ExternalLink size={14} />
                View Live
              </button>
            </Link>
            <Link href={`/eventEditor?id=${event._id}`}>
              <button className="bg-[#E8E4DC] text-[#0D0D0D] hover:bg-[#E8E4DC]/90 font-inter text-[13px] px-6 py-2.5 rounded-sm transition-all flex items-center gap-2 cursor-pointer">
                <Pencil size={14} />
                Edit Event
              </button>
            </Link>
          </div>
        </div>

        <div className="h-px bg-[#6B6B6B]/15 my-10" />

        {/* Stats Section */}
        <StatsBar stats={stats} />

        {/* Tab Navigation */}
        <div className="flex border-b border-[#6B6B6B]/15 mb-12 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-inter text-[13px] pb-4 px-2 mr-10 relative cursor-pointer shrink-0 transition-colors ${
                activeTab === tab ? 'text-[#E8E4DC]' : 'text-[#6B6B6B] hover:text-[#E8E4DC]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="dashboardTab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#E8E4DC]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Responses' && <ResponsesTab eventId={eventId} />}
              {activeTab === 'Broadcast' && <BroadcastTab eventId={eventId} />}
              {activeTab === 'QR Scanner' && <QRScannerTab eventId={eventId} />}
              {activeTab === 'Share' && <ShareTab eventId={eventId} routeName={event.routeName} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="mt-40 pt-8 border-t border-[#6B6B6B]/15 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="font-cinzel text-[10px] tracking-widest text-[#E8E4DC]">EVNETY</span>
            <span className="font-inter text-[11px] text-[#6B6B6B]">© 2025 Evnety — The Digital Curator</span>
          </div>
          <div className="flex items-center gap-6 font-inter text-[11px] text-[#6B6B6B]">
            <a href="#" className="hover:text-[#E8E4DC] transition-colors">Privacy Information</a>
            <a href="#" className="hover:text-[#E8E4DC] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#E8E4DC] transition-colors">Contact Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
