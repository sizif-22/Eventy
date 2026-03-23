import React from 'react';
import { useEventStore } from '@/store/eventStore';

export const GeneralTab = () => {
  const { routeName, date, time, location, content, setRouteName, setDate, setTime, setLocation, setContent } = useEventStore();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Event Name / Logo */}
      <div className="flex flex-col">
        <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary mb-4">
          EVENT NAME / LOGO
        </label>
        <input
          type="text"
          value={content.eventName}
          onChange={(e) => setContent({ eventName: e.target.value })}
          placeholder="e.g. THE ARCHIVE 2024"
          className="bg-background border border-secondary/30 rounded-sm py-3 px-4 text-[13px] font-inter text-foreground focus:border-foreground outline-none transition-colors placeholder-secondary/30 uppercase"
        />
        <p className="mt-2 font-inter text-[11px] text-secondary leading-relaxed">
          This appears in the top-left corner of your event page.
        </p>
      </div>

      {/* Route Name */}
      <div className="flex flex-col">
        <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary mb-4">
          ROUTE NAME
        </label>
        <div className="flex items-center bg-background border border-secondary/30 rounded-sm focus-within:border-foreground transition-colors overflow-hidden group">
          <span className="pl-4 pr-1 font-inter text-[13px] text-secondary select-none">evnety.com/</span>
          <input
            type="text"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            placeholder="my-event"
            className="flex-1 bg-transparent border-none py-3 text-[13px] font-inter text-foreground focus:ring-0 pl-0"
          />
        </div>
        <p className="mt-2 font-inter text-[11px] text-secondary">Lowercase, hyphens only.</p>
      </div>


      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary mb-4">
            EVENT DATE
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-background border border-secondary/30 rounded-sm py-3 px-4 text-[13px] font-inter text-foreground focus:border-foreground outline-none transition-colors [color-scheme:dark]"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary mb-4">
            EVENT TIME
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-background border border-secondary/30 rounded-sm py-3 px-4 text-[13px] font-inter text-foreground focus:border-foreground outline-none transition-colors [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col">
        <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary mb-4">
          LOCATION
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Venue name, City"
          className="bg-background border border-secondary/30 rounded-sm py-3 px-4 text-[13px] font-inter text-foreground focus:border-foreground outline-none transition-colors placeholder-secondary/30"
        />
      </div>
    </div>
  );
};
