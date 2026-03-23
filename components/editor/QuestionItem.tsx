'use client';

import React from 'react';
import { GripVertical, Trash2, Lock } from 'lucide-react';
import { Question } from '@/store/eventStore';
import { cn } from '@/lib/utils';

interface QuestionItemProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
  onRemove: () => void;
  isLocked?: boolean;
}

export const QuestionItem = ({ question, onUpdate, onRemove, isLocked = false }: QuestionItemProps) => {
  return (
    <div className="flex items-start gap-4 p-4 bg-[#1A1A1A] border border-[#6B6B6B]/15 rounded-sm group hover:border-[#6B6B6B]/30 transition-colors">
      <div className="mt-1 text-[#6B6B6B]/40 cursor-grab active:cursor-grabbing">
        <GripVertical size={16} />
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            value={question.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            className="bg-transparent border-none p-0 font-inter text-[13px] text-[#E8E4DC] w-full focus:ring-0 placeholder-[#6B6B6B]"
            disabled={isLocked}
          />
          <div className="flex items-center gap-3">
            <span className="shrink-0 border border-[#6B6B6B]/30 px-2 py-0.5 rounded-full font-inter text-[9px] text-[#6B6B6B] uppercase tracking-wider">
              {question.type}
            </span>
            {isLocked ? (
              <Lock size={14} className="text-[#6B6B6B]/30" />
            ) : (
              <button
                onClick={onRemove}
                className="text-[#6B6B6B] hover:text-red-400 transition-colors"
                aria-label="Delete question"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer group/toggle">
            <input
              type="checkbox"
              checked={question.optional}
              onChange={(e) => onUpdate({ optional: e.target.checked })}
              className="sr-only peer"
              disabled={isLocked}
            />
            <div className="w-7 h-4 bg-[#0D0D0D] border border-[#6B6B6B]/40 rounded-full peer-checked:bg-[#E8E4DC] peer-checked:border-[#E8E4DC] transition-all relative">
              <div className="absolute top-1 left-1 w-2 h-2 bg-[#6B6B6B] rounded-full transition-all peer-checked:left-4 peer-checked:bg-[#0D0D0D]" />
            </div>
            <span className="font-inter text-[10px] text-[#6B6B6B] group-hover/toggle:text-[#E8E4DC] transition-colors">
              Optional
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
