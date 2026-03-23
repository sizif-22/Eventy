'use client';

import React, { useState } from 'react';
import { Monitor, Smartphone, Maximize2 } from 'lucide-react';
import { useEventStore } from '@/store/eventStore';
import { PublicEventPage } from './PublicEventPage';
import { cn } from '@/lib/utils';

export const PreviewCanvas = () => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const { content } = useEventStore();

  const isEmpty = !content.heading && !content.subheading && content.features.length === 0;

  return (
    <div className="flex-1 h-screen bg-[#0D0D0D] flex flex-col overflow-hidden">
      {/* Canvas Header */}
      <div className="h-14 border-b border-[#6B6B6B]/15 px-6 flex items-center justify-between shrink-0 bg-[#0D0D0D]">
        <span className="font-inter text-[11px] uppercase tracking-wider text-[#6B6B6B]">
          LIVE PREVIEW
        </span>

        <div className="flex items-center gap-1 bg-[#1A1A1A] p-1 rounded-sm border border-[#6B6B6B]/20">
          <button
            onClick={() => setDevice('desktop')}
            className={cn(
              'p-1.5 rounded-sm transition-colors',
              device === 'desktop' ? 'bg-[#E8E4DC] text-[#0D0D0D]' : 'text-[#6B6B6B] hover:text-[#E8E4DC]'
            )}
          >
            <Monitor size={14} />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={cn(
              'p-1.5 rounded-sm transition-colors',
              device === 'mobile' ? 'bg-[#E8E4DC] text-[#0D0D0D]' : 'text-[#6B6B6B] hover:text-[#E8E4DC]'
            )}
          >
            <Smartphone size={14} />
          </button>
        </div>

        <button className="text-[#6B6B6B] hover:text-[#E8E4DC] transition-colors">
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Canvas Content */}
      <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-[#080808] relative">
        {isEmpty ? (
          <div className="flex items-center justify-center h-full">
            <h2 className="font-newsreader italic text-[#6B6B6B]/40 text-4xl">
              Your event preview will appear here.
            </h2>
          </div>
        ) : (
          <div
            className={cn(
              'transition-all duration-500 ease-in-out bg-[#0D0D0D] shadow-2xl origin-top',
              device === 'desktop' ? 'w-full max-w-[1200px]' : 'w-[390px] h-[844px] rounded-[48px] border-[12px] border-[#1A1A1A] overflow-hidden'
            )}
          >
            <div className={cn('h-full overflow-y-auto hide-scrollbar', device === 'mobile' && 'px-0 pt-12')}>
              <PublicEventPage isPreview />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
