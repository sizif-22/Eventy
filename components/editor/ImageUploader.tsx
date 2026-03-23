'use client';

import React, { useState, useRef } from 'react';
import { Upload, ImageIcon, X, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImage } from '@/app/actions/upload';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {Alert, AlertDescription} from "@/components/ui/alert";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string, file?: File) => void;
  className?: string;
}

export const ImageUploader = ({ label, value, onChange, className }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate size (e.g. 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Create local preview URL
      const localUrl = URL.createObjectURL(file);
      
      // Update store with local URL and actual File object
      onChange(localUrl, file);
      
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
    setError(null);
  };


  return (
    <div className={cn("space-y-3", className)}>
      <label className="font-inter text-[10px] text-secondary uppercase tracking-widest block">
        {label}
      </label>

      <div className="relative group">
        <AnimatePresence mode="wait">
          {value ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative aspect-video rounded-sm overflow-hidden border border-secondary/20 group/preview bg-secondary/5"
            >
              <Image 
                src={value} 
                alt="Uploaded" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <button
                  onClick={handleRemove}
                  className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2 py-1 bg-background/80 backdrop-blur-md rounded-sm border border-secondary/20">
                 <Check size={10} className="text-green-500" />
                 <span className="text-[9px] uppercase tracking-widest text-[#E8E4DC]/60 font-inter">Live URL Active</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "relative aspect-video rounded-sm border border-dashed border-secondary/30 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-foreground/60 transition-all group/upload bg-background/50 overflow-hidden",
                isUploading && "pointer-events-none"
              )}
            >
              <div className="relative flex items-center justify-center">
                 {isUploading ? (
                   <Loader2 size={24} className="text-secondary animate-spin" />
                 ) : (
                   <>
                     <div className="absolute inset-0 bg-foreground/10 blur-xl opacity-0 group-hover/upload:opacity-100 transition-opacity" />
                     <Upload size={24} className="text-secondary group-hover:text-foreground transition-colors relative z-10" />
                   </>
                 )}
              </div>
              
              <div className="text-center space-y-1">
                <span className="font-inter text-[11px] text-secondary group-hover:text-foreground transition-colors uppercase tracking-widest">
                  {isUploading ? 'Uploading...' : 'Click to upload'}
                </span>
                {!isUploading && (
                  <p className="text-[9px] text-secondary/40 font-inter tracking-wider">JPG, PNG, WEBP (Max 5MB)</p>
                )}
              </div>

              {/* Progress bar simulation for UX */}
              {isUploading && (
                <div className="absolute bottom-0 left-0 h-[2px] bg-foreground transition-all duration-[3s] w-[90%]" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 py-2">
          <AlertDescription className="text-[10px] font-inter uppercase tracking-wider flex items-center justify-between">
            {error}
            <button onClick={() => setError(null)} className="opacity-50 hover:opacity-100 transition-opacity">
              <X size={12} />
            </button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

