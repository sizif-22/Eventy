'use client';

import React, { useState } from 'react';
import { Send, Users, ChevronDown, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

const BroadcastHistoryItem = ({ subject, meta }: { subject: string, meta: string }) => (
  <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm p-5 flex justify-between items-center cursor-pointer hover:border-[#6B6B6B]/50 transition-colors group">
    <div>
      <h4 className="font-inter text-sm text-[#E8E4DC]">{subject}</h4>
      <p className="font-inter text-xs text-[#6B6B6B] mt-1">{meta}</p>
    </div>
    <ChevronRight size={16} className="text-[#6B6B6B] group-hover:text-[#E8E4DC] transition-colors" />
  </div>
);

import { useQuery, useAction } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';

export const BroadcastTab = ({ eventId }: { eventId: Id<"events"> }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const submissions = useQuery(api.events.getEventSubmissions, { eventId });
  const sendBroadcast = useAction(api.email.sendBroadcastEmail);

  const handleSend = async () => {
    if (!subject || !message) {
      toast.error("Please fill in both subject and message");
      return;
    }

    try {
      setIsSending(true);
      await sendBroadcast({
        eventId,
        subject,
        body: message
      });
      toast.success("Broadcast sent successfully to all attendees");
      setSubject('');
      setMessage('');
    } catch (err) {
      toast.error("Failed to send broadcast. Check logs for details.");
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const recipientCount = submissions?.length || 0;

  return (
    <div className="max-w-2xl">
      <div className="space-y-2">
        <h2 className="font-newsreader italic text-3xl text-[#E8E4DC]">Broadcast Message</h2>
        <p className="font-inter text-[13px] text-[#6B6B6B]">
          Send an email to all {recipientCount} registered attendees.
        </p>
      </div>

      <div className="bg-[#131313] border border-[#6B6B6B]/25 rounded-sm p-8 mt-8 space-y-6">
        <div className="space-y-1.5">
          <label className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Subject Line</label>
          <Input 
            className="bg-[#0D0D0D] border-[#6B6B6B]/40 text-[#E8E4DC] font-inter text-sm h-11 focus-visible:ring-0 focus-visible:border-[#E8E4DC] rounded-sm"
            placeholder="e.g. Important update about the event"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B]">Message Content</label>
          <div className="relative">
            <Textarea 
              className="bg-[#0D0D0D] border-[#6B6B6B]/40 text-[#E8E4DC] font-inter text-sm min-h-[240px] focus-visible:ring-0 focus-visible:border-[#E8E4DC] rounded-sm py-4 leading-relaxed"
              placeholder="All registered attendees will receive this email."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="absolute bottom-3 right-3 font-inter text-[10px] text-[#6B6B6B]">
              {message.length} / 2000
            </div>
          </div>
        </div>

        <div className="h-px bg-[#6B6B6B]/15 my-6" />

        {/* Preview Section */}
        <div className="space-y-3">
          <button 
            onClick={() => setIsPreviewOpen(!isPreviewOpen)}
            className="flex items-center gap-2 font-inter text-[10px] uppercase tracking-wider text-[#6B6B6B] hover:text-[#E8E4DC] transition-colors cursor-pointer"
          >
            Email Preview
            <motion.div
              animate={{ rotate: isPreviewOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={12} />
            </motion.div>
          </button>

          <AnimatePresence>
            {isPreviewOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#E8E4DC]/5 border border-[#6B6B6B]/20 rounded-sm p-6 mt-1 space-y-4">
                  <span className="font-cinzel text-[10px] tracking-widest text-[#6B6B6B]">EVENT NOTIFICATION</span>
                  <div>
                    <h5 className="font-inter text-sm font-medium text-[#E8E4DC]">{subject || 'Subject Line'}</h5>
                    <p className="font-inter text-[13px] text-[#6B6B6B]/80 mt-3 leading-relaxed whitespace-pre-wrap">
                      {message || 'Your message will appear here...'}
                    </p>
                  </div>
                  <div className="h-px bg-[#6B6B6B]/15" />
                  <p className="font-inter text-[11px] text-[#6B6B6B]/50 italic">
                    You're receiving this because you RSVP'd to this event.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center gap-2 text-[#6B6B6B]">
            <Users size={14} />
            <span className="font-inter text-[13px]">{recipientCount} recipients</span>
          </div>
          
          <Button 
            onClick={handleSend}
            disabled={isSending || recipientCount === 0}
            className="bg-[#E8E4DC] text-[#0D0D0D] hover:bg-[#E8E4DC]/90 font-inter text-[13px] px-8 h-11 rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            {isSending ? (
              <div className="w-4 h-4 border-2 border-[#0D0D0D]/20 border-t-[#0D0D0D] rounded-full animate-spin" />
            ) : (
              <Send size={14} />
            )}
            {isSending ? 'Sending...' : 'Send Broadcast'}
          </Button>
        </div>
      </div>
    </div>
  );
};
