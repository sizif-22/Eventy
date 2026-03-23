'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled
          ? 'backdrop-blur-md bg-background/80'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="font-cinzel text-sm tracking-[0.15em] text-foreground">
          EVNETY
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Features', 'Pricing'].map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-inter text-sm text-secondary hover:text-foreground transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Right: Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="border border-foreground text-foreground font-inter text-[13px] px-5 py-2 rounded-sm hover:bg-foreground/5 transition-colors">
            Sign In
          </button>
          <button className="bg-foreground text-background font-inter text-[13px] px-5 py-2 rounded-sm hover:bg-[#d4d0c8] transition-colors">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#E8E4DC]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-background z-50 flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-cinzel text-sm tracking-[0.15em] text-[#E8E4DC]">EVNETY</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#E8E4DC]">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {['Home', 'Features', 'Pricing'].map((link) => (
                <Link
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-inter text-2xl text-[#E8E4DC]"
                >
                  {link}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-8">
                <button className="w-full border border-[#E8E4DC] text-[#E8E4DC] font-inter py-4 rounded-sm">
                  Sign In
                </button>
                <button className="w-full bg-[#E8E4DC] text-background font-inter py-4 rounded-sm">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
