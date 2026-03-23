import React from 'react';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useEventStore } from '@/store/eventStore';
import { ImageUploader } from '../ImageUploader';

export const ContentTab = () => {

  const { content, setContent, addFeature, removeFeature, updateFeature, addNavLink, removeNavLink, updateNavLink } = useEventStore();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Visuals */}
      <div className="space-y-6">
        <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary block">
          VISUALS
        </label>
        <div className="grid grid-cols-1 gap-8">
          <ImageUploader
            label="Hero Image"
            value={content.heroImage}
            onChange={(url, file) => setContent({ heroImage: url, heroFile: file })}
          />
          <ImageUploader
            label="Feature Section Image"
            value={content.featureImage}
            onChange={(url, file) => setContent({ featureImage: url, featureFile: file })}
          />

        </div>
      </div>


      {/* Navigation */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary">
            NAVIGATION LINKS
          </label>
          <button
            onClick={addNavLink}
            className="text-foreground font-inter text-[10px] uppercase tracking-wider flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <Plus size={12} /> Add Link
          </button>
        </div>
        <div className="space-y-4">
          {content.navLinks.map((link) => (
            <div key={link.id} className="flex gap-4 items-center bg-background border border-secondary/15 p-3 rounded-sm group">
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateNavLink(link.id, { label: e.target.value })}
                placeholder="Label"
                className="flex-1 bg-transparent border-none p-0 text-[13px] font-inter text-foreground focus:ring-0"
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => updateNavLink(link.id, { href: e.target.value })}
                placeholder="#href"
                className="flex-1 bg-transparent border-none p-0 text-[13px] font-inter text-secondary focus:ring-0"
              />
              <button
                onClick={() => removeNavLink(link.id)}
                className="text-secondary hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary block">
          CALL TO ACTION
        </label>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-[10px] text-secondary uppercase tracking-wider">Button Text</span>
          <input
            type="text"
            value={content.reserveButtonText}
            onChange={(e) => setContent({ reserveButtonText: e.target.value })}
            className="bg-background border border-secondary/30 rounded-sm p-3 text-[13px] font-inter text-foreground focus:border-foreground outline-none transition-colors"
          />
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-6">
        <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary block">
          STORYTELLING
        </label>
        
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="font-inter text-[10px] text-secondary uppercase tracking-wider">Main Heading</span>
            <textarea
              value={content.heading}
              onChange={(e) => setContent({ heading: e.target.value })}
              className="bg-background border border-secondary/30 rounded-sm p-4 text-[13px] font-inter text-foreground focus:border-foreground outline-none transition-colors min-h-[80px] resize-none placeholder-secondary/30"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-inter text-[10px] text-secondary uppercase tracking-wider">Subheading</span>
            <textarea
              value={content.subheading}
              onChange={(e) => setContent({ subheading: e.target.value })}
              className="bg-background border border-secondary/30 rounded-sm p-4 text-[13px] font-inter text-foreground focus:border-foreground outline-none transition-colors min-h-[60px] resize-none placeholder-secondary/30"
            />
          </div>
        </div>
      </div>

      {/* Body Text */}
      <div className="space-y-4">
        <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary block">
          BODY TEXT
        </label>
        <textarea
          value={content.body}
          onChange={(e) => setContent({ body: e.target.value })}
          placeholder="Describe your event..."
          className="bg-background border border-secondary/30 rounded-sm p-4 text-[13px] font-inter text-foreground focus:border-foreground outline-none transition-colors min-h-[160px] w-full placeholder-secondary/30"
        />
      </div>

      {/* Highlights */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="font-inter text-[10px] uppercase tracking-[0.15em] text-secondary">
            HIGHLIGHTS
          </label>
          <button
            onClick={addFeature}
            className="text-foreground font-inter text-[10px] uppercase tracking-wider flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <Plus size={12} /> Add Feature
          </button>
        </div>

        <div className="space-y-4">
          {content.features.map((feature) => (
            <div key={feature.id} className="p-4 bg-background border border-secondary/15 rounded-sm group hover:border-secondary/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="mt-2 text-secondary/40 cursor-grab active:cursor-grabbing">
                  <GripVertical size={16} />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => updateFeature(feature.id, { title: e.target.value })}
                      placeholder="Feature Title"
                      className="bg-transparent border-none p-0 font-newsreader text-[18px] text-foreground w-full focus:ring-0 placeholder-secondary/30"
                    />
                    <button
                      onClick={() => removeFeature(feature.id)}
                      className="text-secondary hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                    placeholder="Short description..."
                    className="bg-transparent border-none p-0 text-[13px] font-inter text-secondary w-full focus:ring-0 resize-none min-h-[40px] placeholder-secondary/30"
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

