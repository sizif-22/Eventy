'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  status: 'LIVE' | 'DRAFT';
}

export const EventCard = ({ title, date, location, image, status }: EventCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group bg-background-2 border border-secondary/25 rounded-sm overflow-hidden cursor-pointer flex flex-col h-full hover:border-secondary/60 transition-colors"
    >
      <div className="aspect-[3/2] relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors flex items-center justify-center">
          <span className="font-inter text-[13px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
            Open Editor →
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-end mb-2">
          <span
            className={cn(
              'border px-2 py-0.5 rounded-full font-inter text-[10px] uppercase leading-none',
              status === 'LIVE'
                ? 'border-foreground/40 text-foreground/60'
                : 'border-secondary/40 text-secondary'
            )}
          >
            {status}
          </span>
        </div>

        <h3 className="font-newsreader text-[20px] text-foreground leading-snug mt-1 group-hover:text-white transition-colors">
          {title}
        </h3>

        <div className="mt-4 flex flex-col gap-1.5 font-medium">
          <div className="flex items-center gap-2 text-secondary font-inter text-[12px]">
            <Calendar size={12} className="shrink-0" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-secondary font-inter text-[12px]">
            <MapPin size={12} className="shrink-0" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </motion.div>

  );
};
