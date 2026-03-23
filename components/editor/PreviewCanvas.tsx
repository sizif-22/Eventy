"use client";
import React, { useState } from 'react';
import { Monitor, Smartphone, Maximize2, Minimize2, PanelLeft } from 'lucide-react';
import { useEventStore } from '@/store/eventStore';
import { PublicEventPage } from './PublicEventPage';
import { cn } from '@/lib/utils';

export const PreviewCanvas = () => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isMaximized, setIsMaximized] = useState(false);
  const { content, isEditorSidebarOpen, setIsEditorSidebarOpen } = useEventStore();

  const isEmpty = !content.heading && !content.subheading && content.features.length === 0;

  return (
    <div className={cn(
      "flex-1 h-screen bg-[#0D0D0D] flex flex-col overflow-hidden transition-all duration-500",
      isMaximized && "fixed inset-0 z-100 w-screen h-screen"
    )}>
      {/* Canvas Header */}
      <div className="h-14 border-b border-[#6B6B6B]/15 px-6 flex items-center justify-between shrink-0 bg-[#0D0D0D]">
        <div className="flex items-center gap-4">
          {!isMaximized && (
            <button
              onClick={() => setIsEditorSidebarOpen(!isEditorSidebarOpen)}
              className={cn(
                "p-2 rounded-sm transition-colors hover:bg-white/5",
                isEditorSidebarOpen ? "text-[#E8E4DC]" : "text-[#6B6B6B]"
              )}
              title={isEditorSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            >
              <PanelLeft size={18} />
            </button>
          )}
          <span className="font-inter text-[11px] uppercase tracking-wider text-[#6B6B6B]">
            {isMaximized ? "FULL PREVIEW" : "LIVE PREVIEW"}
          </span>
        </div>


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

        <button
          onClick={() => setIsMaximized(!isMaximized)}
          className="p-2 rounded-sm text-[#6B6B6B] hover:text-[#E8E4DC] hover:bg-white/5 transition-all"
          title={isMaximized ? "Exit Fullscreen" : "Maximize Preview"}
        >
          {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Canvas Content */}
      <div className={cn(
        `flex-1 overflow-y-auto pt-12 flex justify-center bg-[#080808] relative ${device === 'desktop' && "pb-12"}`,
        isMaximized && "p-0 bg-[#0D0D0D]"
      )}>
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
              device === 'desktop' ? 'w-full max-w-[1200px]' : 'w-[390px] h-[844px] rounded-[48px] border-12 border-[#1A1A1A] overflow-hidden',
              isMaximized && device === 'desktop' && "max-w-none w-full"
            )}
          >
            <div className={cn('h-full overflow-y-auto hide-scrollbar', device === 'mobile' && 'px-0 pt-12')}>
              <PublicEventPage isPreview isMobile={device === 'mobile'} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

