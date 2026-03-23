'use client';

import React from 'react';
import { GripVertical, Trash2, Lock, Plus, X } from 'lucide-react';
import { Question } from '@/store/eventStore';
import { cn } from '@/lib/utils';

interface QuestionItemProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
  onRemove: () => void;
  isLocked?: boolean;
}

export const QuestionItem = ({ question, onUpdate, onRemove, isLocked = false }: QuestionItemProps) => {
  const addOption = () => {
    const currentOptions = question.options || [];
    onUpdate({ options: [...currentOptions, 'New Option'] });
  };

  const removeOption = (index: number) => {
    const currentOptions = question.options || [];
    onUpdate({ options: currentOptions.filter((_, i) => i !== index) });
  };

  const updateOption = (index: number, value: string) => {
    const currentOptions = question.options || [];
    const nextOptions = [...currentOptions];
    nextOptions[index] = value;
    onUpdate({ options: nextOptions });
  };

  return (
    <div className="flex items-start gap-4 p-4 bg-background-2/50 border border-secondary/15 rounded-sm group hover:border-secondary/30 transition-colors">
      <div className="mt-1 text-secondary/40 cursor-grab active:cursor-grabbing">
        <GripVertical size={16} />
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            value={question.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            className="bg-transparent border-none p-0 font-inter text-[13px] text-foreground w-full focus:ring-0 placeholder-secondary/50"
            disabled={isLocked}
          />
          <div className="flex items-center gap-3">
            <span className="shrink-0 border border-secondary/30 px-2 py-0.5 rounded-full font-inter text-[9px] text-secondary uppercase tracking-wider">
              {question.type}
            </span>
            {isLocked ? (
              <Lock size={14} className="text-secondary/30" />
            ) : (
              <button
                onClick={onRemove}
                className="text-secondary hover:text-red-400 transition-colors"
                aria-label="Delete question"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Choice Options */}
        {question.type === 'CHOICE' && (
          <div className="space-y-2 pl-2 border-l border-secondary/10">
            <div className="flex items-center justify-between">
              <span className="font-inter text-[10px] uppercase tracking-wider text-secondary">Options</span>
              <button
                onClick={addOption}
                className="text-foreground hover:text-white transition-colors"
                title="Add Option"
              >
                <Plus size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {(question.options || []).map((option, idx) => (
                <div key={idx} className="flex items-center gap-2 group/option">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/30" />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(idx, e.target.value)}
                    className="flex-1 bg-transparent border-none p-0 font-inter text-[12px] text-secondary hover:text-foreground focus:text-foreground focus:outline-none transition-colors"
                    placeholder="Option text..."
                  />
                  <button
                    onClick={() => removeOption(idx)}
                    className="opacity-0 group-hover/option:opacity-100 p-1 text-secondary hover:text-red-400 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {(!question.options || question.options.length === 0) && (
                <p className="text-[11px] text-secondary/40 italic">No options added yet.</p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 pt-1">
          <label className="flex items-center gap-2 cursor-pointer group/toggle">
            <input
              type="checkbox"
              checked={question.optional}
              onChange={(e) => onUpdate({ optional: e.target.checked })}
              className="sr-only peer"
              disabled={isLocked}
            />
            <div className="w-7 h-4 bg-background border border-secondary/40 rounded-full peer-checked:bg-foreground peer-checked:border-foreground transition-all relative">
              <div className="absolute top-1 left-1 w-2 h-2 bg-secondary rounded-full transition-all peer-checked:left-4 peer-checked:bg-background" />
            </div>
            <span className="font-inter text-[10px] text-secondary group-hover/toggle:text-foreground transition-colors">
              Optional
            </span>
          </label>
        </div>
      </div>
    </div>

  );
};
