import React, { useState } from 'react';
import { Plus, CheckSquare, Type, X } from 'lucide-react';
import { useEventStore } from '@/store/eventStore';
import { QuestionItem } from '../QuestionItem';
import { cn } from '@/lib/utils';

export const FormTab = () => {
  const { form, setForm, addQuestion, removeQuestion, updateQuestion } = useEventStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestion, setNewQuestion] = useState<{ text: string; type: 'TEXT' | 'CHOICE'; options?: string[] }>({
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
      <div className="flex items-center justify-between p-4 bg-secondary/5 border border-secondary/15 rounded-sm">
        <label className="font-inter text-[12px] text-secondary uppercase tracking-wider">
          RSVP FORM
        </label>
        <label className="relative inline-flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => setForm({ enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-background border border-secondary/40 rounded-full peer peer-checked:bg-foreground grow-0 shrink-0 transition-all peer-checked:border-foreground"></div>
          <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-secondary rounded-full transition-all peer-checked:translate-x-full peer-checked:bg-background"></div>
        </label>
      </div>

      {/* RSVP Content */}
      <div className={cn('space-y-6 transition-opacity duration-300', !form.enabled && 'opacity-40 pointer-events-none')}>
        <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary block">
          FORM CONTENT
        </label>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="font-inter text-[10px] text-secondary uppercase tracking-wider">Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ title: e.target.value })}
              className="bg-background border border-secondary/30 rounded-sm p-3 text-[13px] font-inter text-foreground focus:border-foreground outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-inter text-[10px] text-secondary uppercase tracking-wider">Description</span>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ description: e.target.value })}
              className="bg-background border border-secondary/30 rounded-sm p-3 text-[13px] font-inter text-foreground focus:border-foreground outline-none transition-colors min-h-[60px] resize-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-inter text-[10px] text-secondary uppercase tracking-wider">Submit Button Text</span>
            <input
              type="text"
              value={form.submitButtonText}
              onChange={(e) => setForm({ submitButtonText: e.target.value })}
              className="bg-background border border-secondary/30 rounded-sm p-3 text-[13px] font-inter text-foreground focus:border-foreground outline-none transition-colors"
            />
          </div>
        </div>
      </div>


      <div className={cn('space-y-8 transition-opacity duration-300', !form.enabled && 'opacity-40 pointer-events-none')}>
        {/* Questions List */}
        <div className="space-y-4">
          <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary block">
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
            className="w-full border border-dashed border-secondary/40 rounded-sm py-8 flex flex-col items-center justify-center gap-2 group hover:border-foreground/60 transition-colors cursor-pointer"
          >
            <Plus size={20} className="text-secondary group-hover:text-foreground transition-colors" />
            <span className="font-inter text-[12px] text-secondary group-hover:text-foreground transition-colors uppercase tracking-wider">
              Add Question
            </span>
          </button>
        ) : (
          <div className="p-6 bg-background-2 border border-secondary/30 rounded-sm space-y-6 animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <span className="font-inter text-[10px] text-secondary uppercase tracking-wider block">Question Text</span>
              <input
                type="text"
                autoFocus
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                placeholder="e.g. Do you have any dietary requirements?"
                className="w-full bg-transparent border-none p-0 font-inter text-sm text-foreground focus:ring-0 placeholder-secondary/30"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setNewQuestion({ ...newQuestion, type: 'TEXT', options: undefined })}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 rounded-sm border font-inter text-[11px] uppercase tracking-wider transition-all cursor-pointer',
                  newQuestion.type === 'TEXT' ? 'bg-foreground text-background border-foreground' : 'border-secondary/30 text-secondary hover:border-secondary/60'
                )}
              >
                <Type size={14} /> Text
              </button>
              <button
                onClick={() => setNewQuestion({ ...newQuestion, type: 'CHOICE', options: ['', ''] })}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 rounded-sm border font-inter text-[11px] uppercase tracking-wider transition-all cursor-pointer',
                  newQuestion.type === 'CHOICE' ? 'bg-foreground text-background border-foreground' : 'border-secondary/30 text-secondary hover:border-secondary/60'
                )}
              >
                <CheckSquare size={14} /> Choice
              </button>
            </div>

            {newQuestion.type === 'CHOICE' && (
              <div className="space-y-3 pl-2 border-l border-secondary/15">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-[10px] uppercase tracking-wider text-secondary">Initial Options</span>
                  <button
                    onClick={() => setNewQuestion({ ...newQuestion, options: [...(newQuestion.options || []), ''] })}
                    className="text-foreground hover:text-white transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <div className="space-y-2">
                  {newQuestion.options?.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2 group/opt">
                       <input
                         type="text"
                         value={opt}
                         onChange={(e) => {
                           const updated = [...(newQuestion.options || [])];
                           updated[idx] = e.target.value;
                           setNewQuestion({ ...newQuestion, options: updated });
                         }}
                         placeholder={`Option ${idx + 1}`}
                         className="flex-1 bg-transparent border-none p-0 text-[12px] font-inter text-secondary focus:text-foreground focus:outline-none transition-colors"
                       />
                       {newQuestion.options!.length > 1 && (
                         <button
                           onClick={() => {
                             const updated = newQuestion.options!.filter((_, i) => i !== idx);
                             setNewQuestion({ ...newQuestion, options: updated });
                           }}
                           className="text-secondary opacity-0 group-hover/opt:opacity-100 hover:text-red-400 transition-all p-1"
                         >
                           <X size={12} />
                         </button>
                       )}
                    </div>
                  ))}
                </div>
              </div>
            )}


            <div className="flex gap-2 pt-2 border-t border-secondary/15">
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 py-3 font-inter text-[11px] uppercase tracking-wider text-secondary hover:text-foreground transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubmit}
                disabled={!newQuestion.text.trim()}
                className="flex-1 py-3 bg-foreground text-background rounded-sm font-inter text-[11px] uppercase tracking-wider disabled:opacity-50 cursor-pointer"
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
