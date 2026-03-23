'use client';

import React from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { PublicEventPage } from '@/components/editor/PublicEventPage';
import { useEventStore } from '@/store/eventStore';
import { useEffect } from 'react';

export default function EventPage({ params }: { params: Promise<{ routeName: string }> }) {
  const { routeName } = React.use(params);
  const event = useQuery(api.events.getEventByRoute, { routeName });
  const { setContent, setColors, setDate, setTime, setLocation, setForm } = useEventStore();

  const incrementViews = useMutation(api.events.incrementViews);
  const incrementedRef = React.useRef(false);

  useEffect(() => {
    if (event && !incrementedRef.current) {
      incrementViews({ eventId: event._id });
      incrementedRef.current = true;
    }
  }, [event, incrementViews]);

  useEffect(() => {
    if (event) {
      // Hydrate the store for this session
      setDate(event.date);
      setTime(event.time);
      setLocation(event.location);
      setColors(event.colors);
      setContent(event.content);
      setForm(event.form);
    }
  }, [event, setDate, setTime, setLocation, setColors, setContent, setForm]);

  if (event === undefined) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#E8E4DC]/20 border-t-[#E8E4DC] rounded-full animate-spin" />
      </div>
    );
  }

  if (event === null) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center gap-6 p-8 text-center">
        <h1 className="font-newsreader italic text-6xl text-[#E8E4DC]/20">404</h1>
        <p className="font-inter text-secondary uppercase tracking-[0.2em]">This event has faded into the moonlight.</p>
        <a href="/" className="mt-8 px-8 py-3 bg-[#E8E4DC] text-[#0D0D0D] font-inter text-sm uppercase tracking-widest rounded-sm">Back to Safety</a>
      </div>
    );
  }

  return <PublicEventPage isPreview={false} eventId={event._id} />;
}
