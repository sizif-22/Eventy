import { create } from 'zustand';

export interface Feature {
  id: string;
  title: string;
  description: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'TEXT' | 'CHOICE';
  optional: boolean;
  options?: string[];
}

interface EventState {
  routeName: string;
  date: string;
  time: string;
  location: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  content: {
    heading: string;
    subheading: string;
    body: string;
    features: Feature[];
  };
  form: {
    enabled: boolean;
    questions: Question[];
  };
  setRouteName: (name: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setLocation: (location: string) => void;
  setColors: (colors: Partial<EventState['colors']>) => void;
  setContent: (content: Partial<EventState['content']>) => void;
  setForm: (form: Partial<EventState['form']>) => void;
  addFeature: () => void;
  removeFeature: (id: string) => void;
  updateFeature: (id: string, updates: Partial<{ title: string; description: string }>) => void;
  addQuestion: (question: { text: string; type: 'TEXT' | 'CHOICE'; options?: string[] }) => void;
  removeQuestion: (id: string) => void;
  updateQuestion: (id: string, updates: Partial<{ text: string; optional: boolean }>) => void;
}

export const useEventStore = create<EventState>((set) => ({
  routeName: '',
  date: '',
  time: '',
  location: '',
  colors: {
    primary: '#E8E4DC',
    secondary: '#6B6B6B',
    accent: '#E8E4DC',
    text: '#0D0D0D',
  },
  content: {
    heading: 'Create & Share Your Event Website Effortlessly.',
    subheading: 'Build a custom event website, share it with anyone, and manage everything in one place.',
    body: '',
    features: [
      { id: '1', title: 'Curated Templates', description: 'Our templates are designed for modern ceremonies, producing experiences that lead with typography and architectural detail.' },
      { id: '2', title: 'Seamless RSVPs', description: 'Eliminate transactional flow that fragments your experience. Build RSVP forms that feel native to the event\'s identity.' },
      { id: '3', title: 'Visual Narratives', description: 'Showcase your event\'s story through atmospheric imagery and high-craft editorial sections.' },
    ],
  },
  form: {
    enabled: true,
    questions: [
      { id: 'email', text: 'Email Address', type: 'TEXT', optional: false },
    ],
  },
  setRouteName: (routeName) => set({ routeName }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setLocation: (location) => set({ location }),
  setColors: (colors) => set((state) => ({ colors: { ...state.colors, ...colors } })),
  setContent: (content) => set((state) => ({ content: { ...state.content, ...content } })),
  setForm: (form) => set((state) => ({ form: { ...state.form, ...form } })),
  addFeature: () => set((state) => ({
    content: {
      ...state.content,
      features: [...state.content.features, { id: Math.random().toString(36).substring(2, 9), title: '', description: '' }]
    }
  })),
  removeFeature: (id) => set((state) => ({
    content: {
      ...state.content,
      features: state.content.features.filter((f) => f.id !== id)
    }
  })),
  updateFeature: (id, updates) => set((state) => ({
    content: {
      ...state.content,
      features: state.content.features.map((f) => f.id === id ? { ...f, ...updates } : f)
    }
  })),
  addQuestion: (q) => set((state) => ({
    form: {
      ...state.form,
      questions: [...state.form.questions, { id: Math.random().toString(36).substring(2, 9), ...q, optional: true }]
    }
  })),
  removeQuestion: (id) => set((state) => ({
    form: {
      ...state.form,
      questions: state.form.questions.filter((q) => q.id !== id && q.id !== 'email')
    }
  })),
  updateQuestion: (id, updates) => set((state) => ({
    form: {
      ...state.form,
      questions: state.form.questions.map((q) => q.id === id ? { ...q, ...updates } : q)
    }
  })),
}));
