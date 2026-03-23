'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const StatCard = ({ label, value, subtext }: { label: string; value: number; subtext: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const animation = animate(count, value, { duration: 2, ease: "easeOut" });
    return animation.stop;
  }, [value, count]);

  return (
    <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm p-6">
      <span className="font-inter text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B]">{label}</span>
      <div className="mt-2 flex items-baseline gap-1">
        <motion.span className="font-newsreader text-5xl text-[#E8E4DC]">{rounded}</motion.span>
      </div>
      <p className="font-inter text-xs text-[#6B6B6B] mt-1">{subtext}</p>
    </div>
  );
};

export const StatsBar = ({ stats }: { 
  stats: { 
    views: number; 
    rsvps: number; 
    checkIns: number; 
    capacity: number; 
  } 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
      <StatCard 
        label="Total Views" 
        value={stats.views} 
        subtext="since published" 
      />
      <StatCard 
        label="RSVP Submissions" 
        value={stats.rsvps} 
        subtext="responses collected" 
      />
      <StatCard 
        label="Checked In" 
        value={stats.checkIns} 
        subtext="via QR scan" 
      />
      <StatCard 
        label="Capacity Filled" 
        value={stats.rsvps} 
        subtext={`${stats.rsvps} of ${stats.capacity} spots`} 
      />
    </div>
  );
};
