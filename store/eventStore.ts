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

export interface NavLink {
  id: string;
  label: string;
  href: string;
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
    background: string;
    formBackground: string;
  };

  content: {
    eventName: string;
    heading: string;
    subheading: string;
    body: string;
    heroImage: string;
    featureImage: string;
    heroFile?: File;
    featureFile?: File;
    reserveButtonText: string;

    features: Feature[];
    navLinks: NavLink[];
  };
  form: {
    enabled: boolean;
    title: string;
    description: string;
    submitButtonText: string;
    questions: Question[];
  };
  isEditorSidebarOpen: boolean;
  setIsEditorSidebarOpen: (isOpen: boolean) => void;
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
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  addNavLink: () => void;
  removeNavLink: (id: string) => void;
  updateNavLink: (id: string, updates: Partial<NavLink>) => void;
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
    text: '#FFFFFF',
    background: '#0D0D0D',
    formBackground: '#131313',
  },

  content: {
    eventName: 'EVNETY',
    heading: 'Create & Share Your Event Website Effortlessly.',
    subheading: 'Build a custom event website, share it with anyone, and manage everything in one place.',
    body: 'This is a curated gathering of minds and spirits, held in the heart of the city under the soft glow of moonlight.',
    heroImage: '/hero-event.png',
    featureImage: '/events/art-gallery.png',
    reserveButtonText: 'Reserve your seat',
    features: [
      { id: '1', title: 'Curated Templates', description: 'Our templates are designed for modern ceremonies, producing experiences that lead with typography and architectural detail.' },
      { id: '2', title: 'Seamless RSVPs', description: 'Eliminate transactional flow that fragments your experience. Build RSVP forms that feel native to the event\'s identity.' },
      { id: '3', title: 'Visual Narratives', description: 'Showcase your event\'s story through atmospheric imagery and high-craft editorial sections.' },
    ],
    navLinks: [
      { id: '1', label: 'Details', href: '#details' },
      { id: '2', label: 'Features', href: '#features' },
      { id: '3', label: 'RSVP', href: '#rsvp' },
    ],
  },
  form: {
    enabled: true,
    title: 'Join the Celebration',
    description: 'Kindly respond by the end of the month.',
    submitButtonText: 'Submit RSVP',
    questions: [
      { id: 'email', text: 'Email Address', type: 'TEXT', optional: false },
    ],
  },
  isEditorSidebarOpen: true,
  setIsEditorSidebarOpen: (isOpen) => set({ isEditorSidebarOpen: isOpen }),
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
  addQuestion: (q) => set((state) => {
    const defaultOptions = q.type === 'CHOICE' && !q.options ? ['Option 1', 'Option 2'] : q.options;
    return {
      form: {
        ...state.form,
        questions: [...state.form.questions, { 
          id: Math.random().toString(36).substring(2, 9), 
          ...q, 
          options: defaultOptions,
          optional: true 
        }]
      }
    };
  }),

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

  addNavLink: () => set((state) => ({
    content: {
      ...state.content,
      navLinks: [...state.content.navLinks, { id: Math.random().toString(36).substring(2, 9), label: 'New Link', href: '#' }]
    }
  })),
  removeNavLink: (id) => set((state) => ({
    content: {
      ...state.content,
      navLinks: state.content.navLinks.filter((l) => l.id !== id)
    }
  })),
  updateNavLink: (id, updates) => set((state) => ({
    content: {
      ...state.content,
      navLinks: state.content.navLinks.map((l) => l.id === id ? { ...l, ...updates } : l)
    }
  })),
}));
