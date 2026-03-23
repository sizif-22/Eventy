'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown, User } from 'lucide-react';

export const AppNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#131313] border-b border-[#6B6B6B]/15 px-6">
      <div className="h-full flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="font-cinzel text-sm tracking-[0.15em] text-[#E8E4DC]">
          EVNETY
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'Docs'].map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-inter text-[13px] text-[#6B6B6B] hover:text-[#E8E4DC] transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Right: User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#6B6B6B]/20 flex items-center justify-center overflow-hidden">
            <User size={16} className="text-[#6B6B6B]" />
          </div>
          <ChevronDown size={14} className="text-[#6B6B6B]" />
        </div>
      </div>
    </nav>
  );
};
