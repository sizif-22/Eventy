'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-background-2 border border-secondary/25 rounded-sm p-8 group hover:border-secondary/60 transition-colors"
    >
      <div className="text-secondary">
        <Icon size={20} />
      </div>
      <h3 className="font-newsreader text-[22px] text-[#E8E4DC] mt-6 leading-tight">
        {title}
      </h3>
      <p className="font-inter text-sm text-secondary mt-3 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};
