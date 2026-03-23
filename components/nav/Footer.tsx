import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#6B6B6B]/15 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
        {/* Left: Logo & Tagline */}
        <div className="flex flex-col gap-2">
          <span className="font-cinzel text-sm tracking-[0.15em] text-[#E8E4DC]">EVNETY</span>
          <span className="font-inter text-[13px] text-[#6B6B6B]">
            Premium event website platform for refined ceremonies.
          </span>
        </div>

        {/* Center: Links */}
        <div className="flex justify-center gap-8">
          {['Home', 'Features', 'Pricing', 'Sign In'].map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-inter text-[13px] text-[#6B6B6B] hover:text-[#E8E4DC] transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Right: Copyright */}
        <div className="md:text-right">
          <span className="font-inter text-[12px] text-[#6B6B6B]">
            © 2025 Evnety. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
