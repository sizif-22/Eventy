'use client';

import React from 'react';
import Image from 'next/image';
import { useEventStore } from '@/store/eventStore';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PublicEventPage = ({ isPreview = false }: { isPreview?: boolean }) => {
  const { content, colors, date, location, form } = useEventStore();

  return (
    <div
      className={cn(
        'min-h-full bg-[#0D0D0D] text-[#E8E4DC] selection:bg-[#E8E4DC]/20',
        isPreview && 'pb-20'
      )}
      style={{ color: colors.text }}
    >
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col p-8 md:p-20 overflow-hidden">
        <div className="absolute top-8 left-8 md:top-12 md:left-12 font-cinzel text-sm tracking-[0.2em] z-20">
          EVNETY
        </div>
        
        <div className="absolute top-12 right-12 hidden md:flex gap-8 font-inter text-[11px] uppercase tracking-widest text-[#6B6B6B] z-20">
          <span>Details</span>
          <span>Features</span>
          <span>RSVP</span>
        </div>

        <div className="relative z-10 mt-auto max-w-4xl space-y-12">
          <div className="space-y-4">
            <span className="font-inter text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B]">
              JOIN US ON {date || 'OCT 24'}
            </span>
            <h1 className="font-newsreader italic text-5xl md:text-8xl leading-[1.05] tracking-tight">
              {content.heading}
            </h1>
            <p className="font-inter text-lg md:text-xl text-[#6B6B6B] max-w-2xl leading-relaxed mt-6">
              {content.subheading}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <button
              style={{ backgroundColor: colors.accent, color: '#0D0D0D' }}
              className="px-8 py-4 rounded-sm font-inter text-[13px] uppercase tracking-widest hover:brightness-110 transition-all w-fit"
            >
              Reserve your seat
            </button>
          </div>
        </div>

        {/* Decorative Image (Optional placeholder for preview) */}
        {!isPreview && (
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#131313] hidden lg:block border-l border-[#6B6B6B]/15">
            <Image
              src="/hero-event.png"
              alt="Decoration"
              fill
              className="object-cover opacity-60"
            />
          </div>
        )}
      </section>

      {/* Details Section */}
      <section className="py-32 px-8 md:px-20 border-t border-[#6B6B6B]/10">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-8">
              <span className="font-inter text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B]">
                THE EXPERIENCE
              </span>
              <div className="space-y-12">
                {content.features.map((feature, i) => (
                  <div key={feature.id} className="space-y-4 group">
                    <span className="font-newsreader italic text-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 block underline underline-offset-8">
                      {String(i + 1).padStart(2, '0')}. {feature.title}
                    </span>
                    <p className="font-inter text-base text-[#6B6B6B] leading-relaxed max-w-md">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#131313] border border-[#6B6B6B]/15 aspect-[4/5] relative rounded-sm overflow-hidden">
               <Image
                 src="/events/art-gallery.png"
                 alt="Event detail"
                 fill
                 className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#0D0D0D] to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-inter text-[10px] uppercase tracking-widest">Live Experience Active</span>
                  </div>
               </div>
            </div>
          </div>

          {/* About Section */}
          <div className="max-w-3xl pt-24 space-y-8">
             <span className="font-inter text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B]">ABOUT</span>
             <p className="font-notoserif text-2xl md:text-3xl leading-relaxed text-[#D1CDD2]">
               {content.body || "This is a curated gathering of minds and spirits, held in the heart of the city under the soft glow of moonlight."}
             </p>
          </div>
        </div>
      </section>

      {/* RSVP Form Section (If enabled) */}
      {form.enabled && (
        <section className="py-32 px-8 md:px-20 bg-[#131313] border-t border-[#6B6B6B]/15">
          <div className="max-w-2xl mx-auto text-center space-y-12">
            <div className="space-y-4">
               <h2 className="font-newsreader italic text-4xl md:text-5xl">Join the Celebration</h2>
               <p className="font-inter text-[#6B6B6B]">Kindly respond by {date || 'the end of the month'}.</p>
            </div>
            
            <div className="space-y-6 text-left">
              {form.questions.map((q) => (
                <div key={q.id} className="space-y-2">
                  <label className="font-inter text-[11px] uppercase tracking-widest text-[#6B6B6B]">
                    {q.text} {q.optional && '(Optional)'}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#0D0D0D] border border-[#6B6B6B]/25 rounded-sm p-4 text-sm font-inter text-[#E8E4DC] focus:border-[#E8E4DC] outline-none transition-colors"
                    placeholder={`Enter your ${q.text.toLowerCase()}...`}
                  />
                </div>
              ))}
              <button
                style={{ backgroundColor: colors.accent, color: '#0D0D0D' }}
                className="w-full py-5 rounded-sm font-inter font-medium text-[13px] uppercase tracking-widest mt-8 hover:brightness-110 transition-all"
              >
                Submit RSVP
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-[#6B6B6B]/15 px-8 md:px-20 text-center">
        <span className="font-cinzel text-xs tracking-widest opacity-40">EVNETY</span>
      </footer>
    </div>
  );
};
