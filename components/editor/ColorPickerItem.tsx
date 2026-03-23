'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ColorPickerItemProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const ColorPickerItem = ({ label, value, onChange }: ColorPickerItemProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">
        {label}
      </span>
      <div className="flex items-center gap-3 bg-[#1A1A1A] border border-[#6B6B6B]/20 rounded-sm p-1.5 focus-within:border-[#E8E4DC] transition-colors">
        <label className="relative w-8 h-8 rounded-sm border border-[#6B6B6B]/40 cursor-pointer overflow-hidden shrink-0">
          <div className="absolute inset-0" style={{ backgroundColor: value }} />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-none text-[12px] font-inter text-[#E8E4DC] w-full focus:ring-0 uppercase p-0"
        />
      </div>
    </div>
  );
};
