'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
  ctaText: string;
  isFeatured?: boolean;
  badge?: string;
}

export const PricingCard = ({
  plan,
  price,
  features,
  ctaText,
  isFeatured = false,
  badge,
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        'relative rounded-sm p-10 flex flex-col h-full transition-all duration-300',
        isFeatured
          ? 'bg-[#E8E4DC] text-[#0D0D0D]'
          : 'bg-[#131313] border border-[#6B6B6B]/25 text-[#E8E4DC]'
      )}
    >
      {badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D0D0D] text-[#E8E4DC] border border-[#6B6B6B]/40 px-3 py-1 rounded-full text-[10px] font-inter uppercase tracking-widest leading-none">
          {badge}
        </div>
      )}

      <div className="mb-auto">
        <span
          className={cn(
            'font-inter text-[11px] uppercase tracking-wider',
            isFeatured ? 'text-[#6B6B6B]' : 'text-[#6B6B6B]'
          )}
        >
          {plan}
        </span>
        <div className="mt-4 flex flex-col">
          <span className="font-newsreader text-[64px] leading-none">${price}</span>
          <span className="font-inter text-[13px] text-[#6B6B6B] mt-1">/month</span>
        </div>

        <div className={cn('h-px w-full my-8', isFeatured ? 'bg-[#0D0D0D]/10' : 'bg-[#6B6B6B]/20')} />

        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check
                size={12}
                className={cn('mt-1 shrink-0', isFeatured ? 'text-[#0D0D0D]' : 'text-[#E8E4DC]')}
              />
              <span
                className={cn(
                  'font-inter text-sm leading-relaxed',
                  isFeatured ? 'text-[#0D0D0D]' : 'text-[#6B6B6B]'
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={cn(
          'w-full mt-10 py-3 rounded-sm font-inter text-sm transition-colors',
          isFeatured
            ? 'bg-[#0D0D0D] text-[#E8E4DC] hover:bg-[#0D0D0D]/90'
            : 'border border-[#E8E4DC] text-[#E8E4DC] hover:bg-[#E8E4DC]/5'
        )}
      >
        {ctaText}
      </button>
    </div>
  );
};
