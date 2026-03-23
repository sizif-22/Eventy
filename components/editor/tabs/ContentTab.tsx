import React from 'react';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useEventStore } from '@/store/eventStore';

export const ContentTab = () => {
  const { content, setContent, addFeature, removeFeature, updateFeature } = useEventStore();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Event Details */}
      <div className="space-y-6">
        <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B] block">
          EVENT DETAILS
        </label>
        
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="font-inter text-[10px] text-[#6B6B6B] uppercase tracking-wider">Main Heading</span>
            <textarea
              value={content.heading}
              onChange={(e) => setContent({ heading: e.target.value })}
              className="bg-[#1A1A1A] border border-[#6B6B6B]/30 rounded-sm p-4 text-[13px] font-inter text-[#E8E4DC] focus:border-[#E8E4DC] outline-none transition-colors min-h-[80px] resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-inter text-[10px] text-[#6B6B6B] uppercase tracking-wider">Subheading</span>
            <textarea
              value={content.subheading}
              onChange={(e) => setContent({ subheading: e.target.value })}
              className="bg-[#1A1A1A] border border-[#6B6B6B]/30 rounded-sm p-4 text-[13px] font-inter text-[#E8E4DC] focus:border-[#E8E4DC] outline-none transition-colors min-h-[60px] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Body Text */}
      <div className="space-y-4">
        <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B] block">
          BODY TEXT
        </label>
        <textarea
          value={content.body}
          onChange={(e) => setContent({ body: e.target.value })}
          placeholder="Describe your event..."
          className="bg-[#1A1A1A] border border-[#6B6B6B]/30 rounded-sm p-4 text-[13px] font-inter text-[#E8E4DC] focus:border-[#E8E4DC] outline-none transition-colors min-h-[160px] w-full"
        />
      </div>

      {/* Highlights */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B]">
            HIGHLIGHTS
          </label>
          <button
            onClick={addFeature}
            className="text-[#E8E4DC] font-inter text-[10px] uppercase tracking-wider flex items-center gap-1 hover:text-white transition-colors"
          >
            <Plus size={12} /> Add Feature
          </button>
        </div>

        <div className="space-y-4">
          {content.features.map((feature) => (
            <div key={feature.id} className="p-4 bg-[#1A1A1A] border border-[#6B6B6B]/15 rounded-sm group">
              <div className="flex items-start gap-3">
                <div className="mt-2 text-[#6B6B6B]/40">
                  <GripVertical size={16} />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => updateFeature(feature.id, { title: e.target.value })}
                      placeholder="Feature Title"
                      className="bg-transparent border-none p-0 font-newsreader text-[18px] text-[#E8E4DC] w-full focus:ring-0"
                    />
                    <button
                      onClick={() => removeFeature(feature.id)}
                      className="text-[#6B6B6B] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                    placeholder="Short description..."
                    className="bg-transparent border-none p-0 text-[13px] font-inter text-[#6B6B6B] w-full focus:ring-0 resize-none min-h-[40px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
