'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const CreateEventCard = () => {
  return (
    <Link 
      href="/eventEditor"
      className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-background-2/50 border border-dashed border-secondary/40 rounded-sm group hover:border-foreground/60 transition-all duration-300 cursor-pointer"
    >
      <div className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center text-secondary group-hover:text-foreground group-hover:border-foreground/20 transition-colors mb-4">
        <Plus size={24} />
      </div>
      <span className="font-inter text-sm text-foreground group-hover:text-white transition-colors">
        New Event
      </span>
      <span className="font-inter text-[12px] text-secondary mt-1">
        Start from a template
      </span>
    </Link>


  );
};
