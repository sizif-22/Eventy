'use client'; // Fixed missing imports

import React, { useState } from 'react';
import Image from 'next/image';
import { useEventStore } from '@/store/eventStore';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Menu, MapPin, Calendar } from 'lucide-react';

export const PublicEventPage = ({ 
  isPreview = false, 
  isMobile = false,
  eventId 
}: { 
  isPreview?: boolean; 
  isMobile?: boolean;
  eventId?: Id<"events">;
}) => {
  const { content, colors, date, time, location, form } = useEventStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitRsvp = useMutation(api.events.submitRsvp);

  const handleRsvpSubmit = async () => {
    if (isPreview || !eventId) {
      toast.info("Preview Mode", { description: "Form submission is disabled in the editor." });
      return;
    }

    try {
      setIsSubmitting(true);
      await submitRsvp({
        eventId,
        answers
      });
      
      toast.success("Congratulations!", {
        description: "Your RSVP is confirmed. Your unique access QR code will be sent to your email shortly.",
        duration: 6000
      });
      
      // Reset form
      setAnswers({});
    } catch (err) {
      toast.error("Error", { description: "Failed to submit RSVP. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        'min-h-full selection:bg-[#E8E4DC]/20 transition-all duration-300 relative',
        isPreview && 'pb-20',
        isMobile ? 'text-sm' : 'text-base'
      )}
      style={{ color: colors.text, backgroundColor: colors.background }}
    >
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl p-8 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: colors.background }}
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-secondary hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>
            {content.navLinks.map((link) => (
              <a 
                key={link.id} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="font-newsreader italic text-4xl hover:text-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className={cn(
        "relative flex flex-col overflow-hidden",
        isMobile ? "p-6 min-h-[60vh]" : "p-8 md:p-20 md:min-h-screen"
      )}>
        <div className={cn(
          "absolute font-cinzel text-sm tracking-[0.2em] z-20 uppercase",
          isMobile ? "top-8 left-6" : "top-8 left-8 md:top-12 md:left-12"
        )}>
          {content.eventName}
        </div>
        
        {isMobile ? (
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="absolute top-8 right-6 z-20 text-secondary hover:text-foreground transition-colors"
          >
            <Menu size={20} />
          </button>
        ) : (
          <div className="absolute top-8 right-8 md:top-12 md:right-12 hidden md:flex gap-8 font-inter text-[11px] uppercase tracking-widest z-20 bg-background/20 backdrop-blur-md px-6 py-3 rounded-full border border-secondary/10">
            {content.navLinks.map((link) => (
              <a key={link.id} href={link.href} className="text-secondary hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        )}


        <div className={cn(
          "relative z-10 mt-auto space-y-8",
          isMobile ? "max-w-full" : "max-w-4xl space-y-12"
        )}>
          <div className="space-y-4">
            <span className="font-inter text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-secondary">
              {date || 'OCT 24'} {time && `• ${time}`}
            </span>
            <h1 className={cn(
              "font-newsreader italic leading-[1.05] tracking-tight",
              isMobile ? "text-4xl" : "text-5xl md:text-8xl"
            )}>
              {content.heading}
            </h1>
            <p className={cn(
              "font-inter text-secondary leading-relaxed mt-6",
              isMobile ? "text-base" : "text-lg md:text-xl max-w-2xl"
            )}>
              {content.subheading}
            </p>
          </div>

          <div className={cn(
            "flex flex-col gap-8",
            !isMobile && "md:flex-row"
          )}>
            {form.enabled && (
              <button
                onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ backgroundColor: colors.accent, color: colors.background }}
                className={cn(
                  "px-8 py-4 rounded-sm font-inter text-[13px] uppercase tracking-widest hover:brightness-110 transition-all w-fit",
                  isMobile && "w-full"
                )}
              >
                {content.reserveButtonText}
              </button>
            )}

            
            {location && (
              <div className="flex items-center gap-3 text-secondary font-inter text-[11px] uppercase tracking-widest">
                <MapPin size={14} className="text-secondary/50" />
                {location}
              </div>
            )}
          </div>
        </div>

        {/* Hero Background/Decorative Image */}
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none transition-all duration-1000",
            isMobile ? "opacity-20" : "w-1/3 left-auto right-0 border-l border-secondary/15 opacity-60"
          )}
        >
          <Image
            src={content.heroImage}
            alt="Hero Background"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            priority
            unoptimized={content.heroImage.startsWith('blob:') || content.heroImage.includes('/api/r2/')}
          />

          {isMobile && (
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/80 to-background" />
          )}
        </div>
      </section>


      {/* Details Section */}
      <section id="details" className={cn(
        "border-t border-secondary/10",
        isMobile ? "py-16 px-6" : "py-32 px-8 md:px-20"
      )}>
        <div className={cn(
          "mx-auto",
          isMobile ? "space-y-12" : "max-w-7xl space-y-24"
        )}>
          <div className={cn(
            "grid grid-cols-1 gap-12",
            !isMobile && "lg:grid-cols-2 gap-20"
          )}>
            <div className="space-y-8">
              <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-secondary">
                THE EXPERIENCE
              </span>
              <div className={cn(
                "space-y-10",
                !isMobile && "md:space-y-12"
              )}>
                {content.features.map((feature, i) => (
                  <div key={feature.id} className="space-y-3 group">
                    <span className={cn(
                      "font-newsreader italic opacity-40 group-hover:opacity-100 transition-opacity duration-500 block underline underline-offset-8",
                      isMobile ? "text-2xl" : "text-3xl"
                    )}>
                      {String(i + 1).padStart(2, '0')}. {feature.title}
                    </span>
                    <p className={cn(
                      "font-inter text-secondary/70 leading-relaxed",
                      isMobile ? "text-sm" : "text-base max-w-md"
                    )}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={cn(
              "bg-secondary/5 border border-secondary/15 relative rounded-sm overflow-hidden",
              isMobile ? "aspect-3/2 w-full" : "aspect-4/5"
            )}>
               <Image
                 src={content.featureImage}
                 alt="Event detail"
                 fill
                 className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                 unoptimized={content.featureImage.startsWith('blob:') || content.featureImage.includes('/api/r2/')}
               />
               <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-linear-to-t from-background to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-inter text-[10px] uppercase tracking-widest text-[#E8E4DC]/60">Live Experience Active</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Location Detail if provided */}
          {location && (
            <div className="flex flex-col gap-4 border-t border-secondary/10 pt-12">
               <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-secondary">LOCATION</span>
               <div className="flex flex-col md:flex-row md:items-center gap-6">
                 <h3 className="font-newsreader italic text-3xl md:text-5xl">{location}</h3>
                 <div className="flex items-center gap-2 text-secondary font-inter text-[11px] uppercase tracking-[0.2em]">
                    <Calendar size={14} />
                    {date} {time && `at ${time}`}
                 </div>
               </div>
            </div>
          )}

          {/* About Section */}
          <div className={cn(
            "pt-12 md:pt-24 space-y-8",
            !isMobile && "max-w-3xl"
          )}>
             <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-secondary">ABOUT</span>
             <p className={cn(
               "font-notoserif leading-relaxed text-[#D1CDD2]",
               isMobile ? "text-xl" : "text-2xl md:text-3xl"
             )}>
               {content.body}
             </p>
          </div>
        </div>
      </section>

      {/* RSVP Form Section */}
      {form.enabled && (
        <section
          id="rsvp"
          style={{ backgroundColor: colors.formBackground }}
          className={cn(
            "border-t border-secondary/15",
            isMobile ? "py-16 px-6" : "py-32 px-8 md:px-20"
          )}
        >

          <div className="max-w-2xl mx-auto text-center space-y-10 md:space-y-12">
            <div className="space-y-3 md:space-y-4">
               <h2 className={cn(
                 "font-newsreader italic",
                 isMobile ? "text-3xl" : "text-4xl md:text-5xl"
               )}>{form.title}</h2>
               <p className="font-inter text-[12px] md:text-sm text-secondary">{form.description}</p>
            </div>
            
            <div className="space-y-5 md:space-y-6 text-left">
              {form.questions.map((q) => (
                <div key={q.id} className="space-y-3">
                  <label className="font-inter text-[10px] md:text-[11px] uppercase tracking-widest text-secondary">
                    {q.text} {q.optional && '(Optional)'}
                  </label>
                  
                  {q.type === 'CHOICE' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options?.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                          style={{ 
                            backgroundColor: answers[q.id] === opt ? colors.accent : `${colors.background}80`,
                            color: answers[q.id] === opt ? colors.background : colors.text
                          }}
                          className="w-full text-left p-4 rounded-sm border border-secondary/15 hover:border-secondary/30 transition-colors text-sm font-inter text-secondary hover:text-foreground"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      style={{ backgroundColor: colors.background }}
                      className="w-full border border-secondary/25 rounded-sm p-3 md:p-4 text-sm font-inter text-foreground focus:border-foreground outline-none transition-colors"
                      placeholder={`Enter your ${q.text.toLowerCase()}...`}
                    />
                  )}

                </div>
              ))}
              <button
                onClick={handleRsvpSubmit}
                disabled={isSubmitting}
                style={{ backgroundColor: colors.accent, color: colors.background }}
                className="w-full py-4 md:py-5 rounded-sm font-inter font-medium text-[12px] md:text-[13px] uppercase tracking-widest mt-6 md:mt-8 hover:brightness-110 transition-all shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : form.submitButtonText}
              </button>

            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={cn(
        "border-t border-secondary/15 text-center px-4",
        isMobile ? "py-8" : "py-12 px-8 md:px-20"
      )}>
        <span className="font-cinzel text-xs tracking-widest opacity-40 uppercase flex items-center justify-center gap-2 italic">
          EVNETY <span className="not-italic text-[10px] opacity-60">by</span> WebbingStone
        </span>

      </footer>
    </div>
  );
};


