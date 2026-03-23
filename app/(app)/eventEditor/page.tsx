'use client';

import React from 'react';
import { EditorSidebar } from '@/components/editor/EditorSidebar';
import { PreviewCanvas } from '@/components/editor/PreviewCanvas';

export default function EventEditorPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0D0D0D]">
      <EditorSidebar />
      <PreviewCanvas />
    </div>
  );
}
