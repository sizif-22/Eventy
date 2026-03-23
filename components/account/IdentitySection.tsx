'use client';

import React, { useState, useRef } from 'react';
import { Camera, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

export const IdentitySection = () => {
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="space-y-4">
      <h3 className="font-inter text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B]">Identity</h3>
      
      <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm p-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left - Avatar block */}
          <div className="flex flex-col items-center gap-4 group">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-[#6B6B6B]/20 bg-linear-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
              <Avatar className="w-full h-full rounded-none">
                <AvatarImage src="" />
                <AvatarFallback className="bg-transparent text-[#E8E4DC] font-newsreader italic text-3xl">
                  JV
                </AvatarFallback>
              </Avatar>
              <div 
                onClick={triggerFileInput}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <Camera className="text-[#E8E4DC]/70 w-6 h-6" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <button 
                onClick={triggerFileInput}
                className="font-inter text-xs text-[#6B6B6B] hover:text-[#E8E4DC] underline underline-offset-4 transition-colors block"
              >
                Change Photo
              </button>
              <span className="font-inter text-[10px] text-[#6B6B6B]/50 block">JPG or PNG · Max 2MB</span>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg,image/png" />
            </div>
          </div>

          {/* Right - Fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1.5">
              <label className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">First Name</label>
              <Input 
                className="bg-[#0D0D0D] border-[#6B6B6B]/40 text-[#E8E4DC] font-inter text-sm h-11 focus-visible:ring-0 focus-visible:border-[#E8E4DC] rounded-sm"
                defaultValue="Julian" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Last Name</label>
              <Input 
                className="bg-[#0D0D0D] border-[#6B6B6B]/40 text-[#E8E4DC] font-inter text-sm h-11 focus-visible:ring-0 focus-visible:border-[#E8E4DC] rounded-sm"
                defaultValue="Vandervilt" 
              />
            </div>
            <div className="space-y-1.5 overflow-hidden">
              <div className="flex items-center gap-2">
                <label className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Username</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger render={<Lock className="w-3 h-3 text-[#6B6B6B] cursor-help" />} />
                    <TooltipContent className="bg-[#1a1a1a] border-[#6B6B6B]/30 text-[#E8E4DC] text-[10px] uppercase tracking-wider">
                      Must be unique
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input 
                className="bg-[#0D0D0D] border-[#6B6B6B]/40 text-[#E8E4DC] font-inter text-sm h-11 focus-visible:ring-0 focus-visible:border-[#E8E4DC] rounded-sm"
                defaultValue="j.vandervilt" 
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Email Address</label>
              <Input 
                className="bg-[#0D0D0D] border-[#6B6B6B]/40 text-[#E8E4DC] font-inter text-sm h-11 focus-visible:ring-0 focus-visible:border-[#E8E4DC] rounded-sm"
                defaultValue="julian@evnety.curator" 
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Company Name</label>
              <Input 
                className="bg-[#0D0D0D] border-[#6B6B6B]/40 text-[#E8E4DC] font-inter text-sm h-11 focus-visible:ring-0 focus-visible:border-[#E8E4DC] rounded-sm"
                placeholder="Optional"
                defaultValue="Vandervilt Editorial Group" 
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#6B6B6B]/15 flex items-center justify-end gap-4">
          <AnimatePresence>
            {isSaved && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2 text-[#E8E4DC] font-inter text-xs"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Saved</span>
              </motion.div>
            )}
          </AnimatePresence>
          <Button 
            onClick={handleSave}
            className="bg-[#E8E4DC] text-[#0D0D0D] hover:bg-[#E8E4DC]/90 font-inter text-[13px] px-8 h-11 rounded-sm transition-all"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </section>
  );
};
