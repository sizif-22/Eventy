'use client';

import React from 'react';
import { Plus } from 'lucide-react';

export const CreateEventCard = () => {
  return (
    <button className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-[#131313]/0 border border-dashed border-[#6B6B6B]/40 rounded-sm group hover:border-[#E8E4DC]/60 transition-all duration-300">
      <div className="w-12 h-12 rounded-full border border-[#6B6B6B]/20 flex items-center justify-center text-[#6B6B6B] group-hover:text-[#E8E4DC] group-hover:border-[#E8E4DC]/20 transition-colors mb-4">
        <Plus size={24} />
      </div>
      <span className="font-inter text-sm text-[#E8E4DC] group-hover:text-white transition-colors">
        New Event
      </span>
      <span className="font-inter text-[12px] text-[#6B6B6B] mt-1">
        Start from a template
      </span>
    </button>
  );
};
