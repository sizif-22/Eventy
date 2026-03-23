"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditorSidebar } from '@/components/editor/EditorSidebar';
import { PreviewCanvas } from '@/components/editor/PreviewCanvas';
import { useEventStore } from '@/store/eventStore';

export default function EventEditorPage() {
  const { isEditorSidebarOpen } = useEventStore();

  return (
    <div className="flex h-screen overflow-hidden bg-[#0D0D0D] relative">
      <AnimatePresence mode="popLayout">
        {isEditorSidebarOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 md:relative md:z-auto"
          >
            <EditorSidebar />
          </motion.div>
        )}
      </AnimatePresence>
      <PreviewCanvas />
    </div>
  );
}

