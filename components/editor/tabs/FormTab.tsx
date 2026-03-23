import React, { useState } from 'react';
import { Plus, CheckSquare, Type } from 'lucide-react';
import { useEventStore } from '@/store/eventStore';
import { QuestionItem } from '../QuestionItem';
import { cn } from '@/lib/utils';

export const FormTab = () => {
  const { form, setForm, addQuestion, removeQuestion, updateQuestion } = useEventStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestion, setNewQuestion] = useState<{ text: string; type: 'TEXT' | 'CHOICE' }>({
    text: '',
    type: 'TEXT',
  });


  const handleAddSubmit = () => {
    if (newQuestion.text.trim()) {
      addQuestion(newQuestion);
      setNewQuestion({ text: '', type: 'TEXT' });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* RSVP Toggle */}
      <div className="flex items-center justify-between p-4 bg-[#6B6B6B]/5 border border-[#6B6B6B]/15 rounded-sm">
        <label className="font-inter text-[12px] text-[#6B6B6B] uppercase tracking-wider">
          RSVP FORM
        </label>
        <label className="relative inline-flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => setForm({ enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[#0D0D0D] border border-[#6B6B6B]/40 rounded-full peer peer-checked:bg-[#E8E4DC] grow-0 shrink-0 transition-all peer-checked:border-[#E8E4DC]"></div>
          <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-[#6B6B6B] rounded-full transition-all peer-checked:translate-x-full peer-checked:bg-[#0D0D0D]"></div>
        </label>
      </div>

      <div className={cn('space-y-8 transition-opacity duration-300', !form.enabled && 'opacity-40 pointer-events-none')}>
        {/* Questions List */}
        <div className="space-y-4">
          <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B] block">
            QUESTIONS
          </label>
          <div className="space-y-3">
            {form.questions.map((q) => (
              <QuestionItem
                key={q.id}
                question={q}
                onUpdate={(updates) => updateQuestion(q.id, updates)}
                onRemove={() => removeQuestion(q.id)}
                isLocked={q.id === 'email'}
              />
            ))}
          </div>
        </div>

        {/* Add Question */}
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full border border-dashed border-[#6B6B6B]/40 rounded-sm py-8 flex flex-col items-center justify-center gap-2 group hover:border-[#E8E4DC]/60 transition-colors"
          >
            <Plus size={20} className="text-[#6B6B6B] group-hover:text-[#E8E4DC] transition-colors" />
            <span className="font-inter text-[12px] text-[#6B6B6B] group-hover:text-[#E8E4DC] transition-colors uppercase tracking-wider">
              Add Question
            </span>
          </button>
        ) : (
          <div className="p-6 bg-[#1A1A1A] border border-[#E8E4DC]/30 rounded-sm space-y-6">
            <div className="space-y-2">
              <span className="font-inter text-[10px] text-[#6B6B6B] uppercase tracking-wider block">Question Text</span>
              <input
                type="text"
                autoFocus
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                placeholder="e.g. Do you have any dietary requirements?"
                className="w-full bg-transparent border-none p-0 font-inter text-sm text-[#E8E4DC] focus:ring-0"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setNewQuestion({ ...newQuestion, type: 'TEXT' })}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 rounded-sm border font-inter text-[11px] uppercase tracking-wider transition-all',
                  newQuestion.type === 'TEXT' ? 'bg-[#E8E4DC] text-[#0D0D0D] border-[#E8E4DC]' : 'border-[#6B6B6B]/30 text-[#6B6B6B] hover:border-[#6B6B6B]/60'
                )}
              >
                <Type size={14} /> Text
              </button>
              <button
                onClick={() => setNewQuestion({ ...newQuestion, type: 'CHOICE' })}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 rounded-sm border font-inter text-[11px] uppercase tracking-wider transition-all',
                  newQuestion.type === 'CHOICE' ? 'bg-[#E8E4DC] text-[#0D0D0D] border-[#E8E4DC]' : 'border-[#6B6B6B]/30 text-[#6B6B6B] hover:border-[#6B6B6B]/60'
                )}
              >
                <CheckSquare size={14} /> Choice
              </button>
            </div>

            <div className="flex gap-2 pt-2 border-t border-[#6B6B6B]/15">
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 py-3 font-inter text-[11px] uppercase tracking-wider text-[#6B6B6B] hover:text-[#E8E4DC] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubmit}
                disabled={!newQuestion.text.trim()}
                className="flex-1 py-3 bg-[#E8E4DC] text-[#0D0D0D] rounded-sm font-inter text-[11px] uppercase tracking-wider disabled:opacity-50"
              >
                Add Field
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
