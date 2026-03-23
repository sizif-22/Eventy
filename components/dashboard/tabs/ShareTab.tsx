'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, ExternalLink, Link as LinkIcon, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import { Id } from '@/convex/_generated/dataModel';

export const ShareTab = ({ eventId, routeName }: { eventId: Id<"events">, routeName: string }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://evnety.com';
  const eventUrl = `${baseUrl}/e/${routeName}`;
  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" + encodeURIComponent(eventUrl);

  const handleCopy = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <div className="space-y-2">
        <h2 className="font-newsreader italic text-3xl text-[#E8E4DC]">Share Your Event</h2>
        <p className="font-inter text-[13px] text-[#6B6B6B]">Share the link or let attendees scan the QR code to RSVP.</p>
      </div>

      <div className="space-y-6 mt-8">
        {/* Share Link Card */}
        <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm p-8 space-y-6">
          <div className="space-y-1.5">
            <label className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Event URL</label>
            <div className="flex gap-3">
              <Input 
                readOnly
                className="bg-[#0D0D0D] border-[#6B6B6B]/40 text-[#6B6B6B] font-inter text-sm h-11 focus-visible:ring-0 rounded-sm flex-1"
                value={eventUrl}
              />
              <Button 
                variant="outline"
                onClick={handleCopy}
                className="border-[#6B6B6B]/40 text-[#E8E4DC] hover:border-[#E8E4DC] font-inter text-xs px-6 h-11 rounded-sm transition-all min-w-[100px] bg-transparent"
              >
                <AnimatePresence mode="wait">
                  {copiedLink ? (
                    <motion.div key="check" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Check size={14} />
                      Copied
                    </motion.div>
                  ) : (
                    <motion.div key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Copy size={14} />
                      Copy
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { label: 'Share on X', icon: Share2 },
              { label: 'Share on WhatsApp', icon: Share2 },
              { label: 'Share via Email', icon: ExternalLink }
            ].map((social, i) => (
              <Button 
                key={i}
                variant="outline"
                className="border-[#6B6B6B]/20 text-[#6B6B6B] hover:text-[#E8E4DC] hover:border-[#6B6B6B]/40 font-inter text-[11px] px-4 h-9 rounded-sm transition-all bg-transparent"
              >
                {social.label}
              </Button>
            ))}
          </div>
        </div>

        {/* QR Code Card */}
        <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm p-8">
           <div className="flex flex-col md:flex-row gap-12">
              <div className="space-y-4 flex-1">
                <div>
                  <label className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Quick RSVP QR</label>
                  <p className="font-inter text-xs text-[#6B6B6B] mt-2 leading-relaxed">
                    Attendees can scan this code to visit the event page and submit their RSVP immediately.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button variant="outline" className="border-[#6B6B6B]/40 text-[#E8E4DC] hover:border-[#E8E4DC] font-inter text-xs px-6 h-10 rounded-sm transition-all bg-transparent flex items-center gap-2">
                    <Download size={14} /> PNG
                  </Button>
                  <Button variant="outline" className="border-[#6B6B6B]/40 text-[#E8E4DC] hover:border-[#E8E4DC] font-inter text-xs px-6 h-10 rounded-sm transition-all bg-transparent flex items-center gap-2">
                    <Download size={14} /> SVG
                  </Button>
                </div>

                <p className="font-inter text-[11px] text-[#6B6B6B]/60 italic pt-4 leading-relaxed">
                  Individual entry QR codes are automatically emailed to each attendee upon RSVP confirmation.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-[#E8E4DC] p-5 rounded-sm shadow-xl">
                   <div className="relative w-48 h-48">
                      <Image 
                        src={qrUrl}
                        alt="Event RSVP QR Code"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                   </div>
                   <div className="mt-3 text-center border-t border-[#0D0D0D]/10 pt-3">
                      <span className="font-cinzel text-[10px] tracking-[0.2em] text-[#0D0D0D] opacity-40">EVNETY</span>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
