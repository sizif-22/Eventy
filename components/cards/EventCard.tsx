'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, BarChart3, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface EventCardProps {
  id: string;
  routeName: string;
  title: string;
  eventName?: string;
  date: string;
  location: string;
  heroImage?: string;
  featureImage?: string;
  status: 'LIVE' | 'DRAFT';
}

export const EventCard = ({ id, routeName, title, eventName, date, location, heroImage, featureImage, status }: EventCardProps) => {
  const [imgSrc, setImgSrc] = React.useState<string | undefined>(heroImage || featureImage);
  const [hasError, setHasError] = React.useState(false);

  // Sync state if props change (important for real-time updates)
  React.useEffect(() => {
    setImgSrc(heroImage || featureImage);
    setHasError(false);
  }, [heroImage, featureImage]);

  const handleError = () => {
    if (!hasError && heroImage && featureImage && imgSrc === heroImage) {
      setImgSrc(featureImage);
      setHasError(true);
    } else {
      setImgSrc(undefined);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-background-2 border border-secondary/25 rounded-md overflow-hidden flex flex-col h-full hover:border-secondary/60 transition-all shadow-sm hover:shadow-2xl"
    >
      <div className="aspect-video relative overflow-hidden bg-[#1a1a1a] border-b border-secondary/10">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={imgSrc.startsWith('blob:') || imgSrc.includes('/api/r2/')}
            onError={handleError}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-10 px-6 text-center">
            <span className="font-cinzel text-3xl tracking-widest uppercase">{title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <Link href={`/console/${id}`} className="p-2 bg-foreground text-background rounded-full hover:scale-110 transition-transform">
             <BarChart3 size={18} />
          </Link>
          <Link href={`/e/${routeName}`} target="_blank" className="p-2 border border-foreground text-foreground rounded-full hover:scale-110 transition-transform bg-background/40 backdrop-blur-sm">
             <ExternalLink size={18} />
          </Link>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span
            className={cn(
              'border px-2 py-0.5 rounded-sm font-inter text-[9px] uppercase tracking-widest leading-none',
              status === 'LIVE'
                ? 'border-foreground/30 text-foreground/60'
                : 'border-secondary/30 text-secondary/60'
            )}
          >
            {status}
          </span>
          <span className="font-inter text-[10px] text-secondary opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
            ID: {id.slice(0, 6)}
          </span>
        </div>

        {eventName && (
          <span className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary/60 mb-2 block">
            {eventName}
          </span>
        )}
        <h3 className="font-newsreader italic text-[24px] text-foreground leading-tight group-hover:text-white transition-colors">
          {title}
        </h3>

        <div className="mt-auto pt-6 flex flex-col gap-2">
          <div className="flex items-center gap-2.5 text-secondary font-inter text-[12px]">
            <Calendar size={13} className="shrink-0 opacity-40" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2.5 text-secondary font-inter text-[12px]">
            <MapPin size={13} className="shrink-0 opacity-40" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
