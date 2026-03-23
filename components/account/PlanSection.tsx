'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const PlanSection = () => {
  const creditsUsed = 1;
  const totalCredits = 2;
  const progress = (creditsUsed / totalCredits) * 100;

  return (
    <section className="space-y-4">
      <h3 className="font-inter text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B]">Plan & Credits</h3>
      
      <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm p-8">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block border border-[#6B6B6B]/40 px-2 py-0.5 font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B] rounded-sm">
              Free Plan
            </span>
            <h2 className="font-newsreader italic text-4xl text-[#E8E4DC] mt-3">Free Plan</h2>
          </div>
          <Button 
            variant="outline" 
            className="border-[#E8E4DC] text-[#E8E4DC] hover:bg-[#E8E4DC] hover:text-[#0D0D0D] font-inter text-xs px-6 h-10 rounded-sm transition-all"
          >
            Upgrade Plan →
          </Button>
        </div>

        <div className="h-px bg-[#6B6B6B]/15 my-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-1">
            <span className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Events Created</span>
            <p className="font-newsreader text-5xl text-[#E8E4DC]">3</p>
            <span className="font-inter text-xs text-[#6B6B6B]">of 2 included</span>
          </div>
          <div className="space-y-1">
            <span className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Credits Used</span>
            <p className="font-newsreader text-5xl text-[#E8E4DC]">1</p>
            <span className="font-inter text-xs text-[#6B6B6B]">2 total</span>
          </div>
          <div className="space-y-1">
            <span className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Max Capacity</span>
            <p className="font-newsreader text-5xl text-[#E8E4DC]">100</p>
            <span className="font-inter text-xs text-[#6B6B6B]">attendees per event</span>
          </div>
        </div>

        <div className="mt-12 space-y-3">
          <div className="h-[2px] w-full bg-[#0D0D0D] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              className="h-full bg-[#E8E4DC]" 
            />
          </div>
          <p className="font-inter text-[11px] text-[#6B6B6B]">{creditsUsed} of {totalCredits} credits used</p>
        </div>
      </div>
    </section>
  );
};
