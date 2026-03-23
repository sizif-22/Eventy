'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEventStore } from '@/store/eventStore';
import { GeneralTab } from './tabs/GeneralTab';
import { DesignTab } from './tabs/DesignTab';
import { ContentTab } from './tabs/ContentTab';
import { FormTab } from './tabs/FormTab';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'design', label: 'Design' },
  { id: 'content', label: 'Content' },
  { id: 'form', label: 'Form' },
] as const;

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { uploadImage } from '@/app/actions/upload';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const EditorSidebar = () => {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('general');
  const [isCreating, setIsCreating] = useState(false);
  const { content, colors, date, time, location, form, routeName, setContent, setIsEditorSidebarOpen } = useEventStore();
  const createEvent = useMutation(api.events.createEvent);
  const router = useRouter();

  const handleCreateEvent = async () => {
    if (!routeName) {
      toast.error("Missing Route Name", {
        description: "Please set a route name in the General tab first."
      });
      return;
    }

    try {
      setIsCreating(true);
      
      let finalHeroUrl = content.heroImage;
      let finalFeatureUrl = content.featureImage;

      // 1. Upload Hero Image if pending
      if (content.heroFile) {
        const formData = new FormData();
        formData.append('file', content.heroFile);
        const res = await uploadImage(formData);
        if (res.success && res.url) {
          finalHeroUrl = res.url;
          URL.revokeObjectURL(content.heroImage);
        } else {
          throw new Error('Hero image upload failed: ' + res.error);
        }
      }

      // 2. Upload Feature Image if pending
      if (content.featureFile) {
        const formData = new FormData();
        formData.append('file', content.featureFile);
        const res = await uploadImage(formData);
        if (res.success && res.url) {
          finalFeatureUrl = res.url;
          URL.revokeObjectURL(content.featureImage);
        } else {
          throw new Error('Feature image upload failed: ' + res.error);
        }
      }

      // 3. Save to Convex
      await createEvent({
        routeName,
        date,
        time,
        location,
        colors,
        form,
        content: {
          ...content,
          heroImage: finalHeroUrl,
          featureImage: finalFeatureUrl,
          heroFile: undefined,
          featureFile: undefined,
        },
      });

      // 4. Update store
      setContent({
        heroImage: finalHeroUrl,
        featureImage: finalFeatureUrl,
        heroFile: undefined,
        featureFile: undefined,
      });

      toast.success("Event Published!", {
        description: `Your event is live at /e/${routeName}`,
        action: {
          label: "View Page",
          onClick: () => window.open(`/e/${routeName}`, '_blank')
        }
      });

    } catch (error: any) {
      console.error('Create Event Error:', error);
      toast.error("Publication Failed", {
        description: error.message || 'Failed to create event'
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full md:w-[380px] h-screen bg-background-2 border-r border-secondary/20 flex flex-col shrink-0 flex-nowrap overflow-hidden shadow-2xl md:shadow-none relative">
      {/* Sidebar Header */}
      <div className="h-14 border-b border-secondary/15 px-6 flex items-center justify-between shrink-0">

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsEditorSidebarOpen(false)}
            className="md:hidden p-1 -ml-1 text-secondary hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
          <span className="font-cinzel text-[11px] tracking-[0.15em] text-foreground uppercase">EVNETY</span>
          <span className="font-inter text-[11px] text-secondary tracking-wider uppercase hidden sm:inline">
            /{routeName || 'my-event'}
          </span>
        </div>
      </div>



      {/* Tabs Navigation */}
      <div className="flex border-b border-secondary/15 px-6 shrink-0 relative overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative py-4 pr-6 font-inter text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap',
              activeTab === tab.id ? 'text-foreground' : 'text-secondary hover:text-foreground/60'
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-6 h-px bg-foreground"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-thin scrollbar-thumb-secondary/20 scrollbar-track-transparent">
        <AnimatePresence mode="wait">
          {activeTab === 'general' && <GeneralTab key="general" />}
          {activeTab === 'design' && <DesignTab key="design" />}
          {activeTab === 'content' && <ContentTab key="content" />}
          {activeTab === 'form' && <FormTab key="form" />}
        </AnimatePresence>
      </div>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-secondary/15 shrink-0 bg-background-2">
        <button 
          onClick={handleCreateEvent}
          disabled={isCreating}
          className="w-full bg-foreground text-background font-inter font-bold text-[11px] uppercase tracking-widest py-4 rounded-sm hover:bg-foreground/90 disabled:opacity-50 transition-all mb-4 cursor-pointer flex items-center justify-center gap-3"
        >
          {isCreating ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Publishing...
            </>
          ) : (
            'Create Event'
          )}
        </button>

        <p className="text-center font-inter text-[11px] text-secondary">
          Changes auto-saved as draft
        </p>
      </div>

    </div>
  );
};
