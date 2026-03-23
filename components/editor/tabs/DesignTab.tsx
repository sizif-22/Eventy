import React from 'react';
import { useEventStore } from '@/store/eventStore';
import { ColorPickerItem } from '../ColorPickerItem';

export const DesignTab = () => {
  const { colors, setColors } = useEventStore();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary mb-6 block">
          THEME COLORS
        </label>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
          <ColorPickerItem
            label="Primary"
            value={colors.primary}
            onChange={(val) => setColors({ primary: val })}
          />
          <ColorPickerItem
            label="Secondary"
            value={colors.secondary}
            onChange={(val) => setColors({ secondary: val })}
          />
          <ColorPickerItem
            label="Accent"
            value={colors.accent}
            onChange={(val) => setColors({ accent: val })}
          />
          <ColorPickerItem
            label="Text"
            value={colors.text}
            onChange={(val) => setColors({ text: val })}
          />
          <ColorPickerItem
            label="Background"
            value={colors.background}
            onChange={(val) => setColors({ background: val })}
          />
          <ColorPickerItem
            label="Form BG"
            value={colors.formBackground}
            onChange={(val) => setColors({ formBackground: val })}
          />
        </div>

      </div>

      <div className="p-4 bg-secondary/5 border border-secondary/15 rounded-sm">
        <p className="font-inter text-[11px] text-secondary leading-relaxed">
          Tip: Use high-contrast colors for primary and text to maintain readability on dark backgrounds.
        </p>
      </div>
    </div>
  );
};
