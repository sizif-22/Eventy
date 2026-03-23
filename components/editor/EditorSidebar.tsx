'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEventStore } from '@/store/eventStore';
import { GeneralTab } from './tabs/GeneralTab';
import { DesignTab } from './tabs/DesignTab';
import { ContentTab } from './tabs/ContentTab';
import { FormTab } from './tabs/FormTab';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'design', label: 'Design' },
  { id: 'content', label: 'Content' },
  { id: 'form', label: 'Form' },
] as const;

export const EditorSidebar = () => {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('general');

  return (
    <div className="w-[380px] h-screen bg-background-2 border-r border-secondary/20 flex flex-col shrink-0 flex-nowrap overflow-hidden">
      {/* Sidebar Header */}
      <div className="h-14 border-b border-secondary/15 px-6 flex items-center justify-between shrink-0">
        <span className="font-cinzel text-[11px] tracking-[0.15em] text-foreground">EVNETY</span>
        <span className="font-inter text-[11px] text-secondary tracking-wider uppercase">/my-event</span>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-secondary/15 px-6 shrink-0 relative overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative py-4 pr-6 font-inter text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap',
              activeTab === tab.id ? 'text-foreground' : 'text-secondary hover:text-foreground/60'
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-6 h-px bg-foreground"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-thin scrollbar-thumb-[#6B6B6B]/20 scrollbar-track-transparent">
        <AnimatePresence mode="wait">
          {activeTab === 'general' && <GeneralTab key="general" />}
          {activeTab === 'design' && <DesignTab key="design" />}
          {activeTab === 'content' && <ContentTab key="content" />}
          {activeTab === 'form' && <FormTab key="form" />}
        </AnimatePresence>
      </div>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-secondary/15 shrink-0 bg-background-2">
        <button className="w-full bg-foreground text-background font-inter text-sm py-3 rounded-sm hover:bg-[#d4d0c8] transition-colors mb-4">
          Save Event
        </button>
        <p className="text-center font-inter text-[11px] text-secondary">
          Changes auto-saved as draft
        </p>
      </div>
    </div>
  );
};
