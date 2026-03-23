'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layout, CheckSquare, Play, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/nav/Navbar';
import { Footer } from '@/components/nav/Footer';
import { FeatureCard } from '@/components/cards/FeatureCard';
import { PricingCard } from '@/components/cards/PricingCard';
import { useAuth } from '@workos-inc/authkit-nextjs/components';
import Link from 'next/link';

export default function LandingPage() {
  const { user } = useAuth();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <Image
            src="/hero-event.png"
            alt="Atmospheric Event Venue"
            fill
            className="object-cover brightness-75"
            priority
          />
          {/* Hero Overlays */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(to top, #0D0D0D 0%, #0D0D0D 15%, transparent 60%, rgba(13, 13, 13, 0.5) 100%)',
            }}
          />
        </motion.div>

        <div className="relative z-20 text-center max-w-4xl px-6">

          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 1 }}
            className="block font-inter text-[11px] text-secondary uppercase tracking-[0.2em] mb-8"
          >
            EVENT PLATFORM
          </motion.span>

          <motion.h1
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="font-newsreader italic font-light text-[#E8E4DC] text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight"
          >
            {['Create & Share Your', 'Event Website', 'Effortlessly.'].map((line, i) => (
              <motion.span
                key={i}
                variants={fadeInUp}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <p className="font-inter text-base text-secondary max-w-md leading-relaxed">
              Build a custom event website, share it with anyone, and manage everything in one place.
            </p>
            <div className="mt-4 flex flex-col items-center gap-3">
              {user ? (
                <Link
                  href="/console"
                  className="bg-[#E8E4DC] text-background font-inter text-sm px-8 py-3.5 rounded-sm hover:bg-[#d4d0c8] transition-all flex items-center gap-2 group"
                >
                  Go to Console <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <a
                  href="/sign-up"
                  className="bg-[#E8E4DC] text-background font-inter text-sm px-8 py-3.5 rounded-sm hover:bg-[#d4d0c8] transition-all flex items-center gap-2 group"
                >
                  Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              )}
              <span className="font-inter text-[11px] text-secondary">
                {user ? `Welcome back, ${user.firstName}` : 'No credit card required'}
              </span>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-background">

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8 mb-4">
            <div className="h-px flex-1 bg-secondary/20" />
            <span className="font-inter text-[11px] uppercase tracking-[0.2em] text-secondary shrink-0">
              WHAT YOU GET
            </span>
            <div className="h-px flex-1 bg-secondary/20" />
          </div>

          <h2 className="font-newsreader italic text-[#E8E4DC] text-4xl md:text-5xl text-center mb-16 font-normal">
            Everything you need to make your event unforgettable.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Layout}
              title="Curated Templates"
              description="Our templates are designed for modern ceremonies, producing experiences that lead with typography and architectural detail."
            />
            <FeatureCard
              icon={CheckSquare}
              title="Seamless RSVPs"
              description="Eliminate transactional flow that fragments your experience. Build RSVP forms that feel native to the event's identity."
            />
            <FeatureCard
              icon={Play}
              title="Visual Narratives"
              description="Showcase your event's story through atmospheric imagery and high-craft editorial sections."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-newsreader italic text-[#E8E4DC] text-4xl md:text-5xl font-normal">
              Simple, Transparent Investment
            </h2>
            <p className="font-inter text-secondary mt-3">Choose the plan that best scales with your vision.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-8">
            <PricingCard
              plan="STARTER"
              price="29"
              features={['2 Event Pages', 'Basic Templates', 'Email Support']}
              ctaText="Select Starter"
            />
            <PricingCard
              plan="EDITORIAL"
              price="79"
              isFeatured
              badge="MOST POPULAR"
              features={['Unlimited Event Pages', 'Custom Branding & Printing', 'Priority Support', 'Analytics Dashboard']}
              ctaText="Upgrade Now"
            />
            <PricingCard
              plan="LEGACY"
              price="199"
              features={['White-Label License', 'Dedicated Support', 'Custom Integrations']}
              ctaText="Select Legacy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
