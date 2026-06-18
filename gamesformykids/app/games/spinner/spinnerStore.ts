'use client';
import { create } from 'zustand';

export type SegmentPreset = 'letters' | 'numbers' | 'colors' | 'animals';

export const PRESETS: Record<SegmentPreset, string[]> = {
  letters: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'],
  numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  colors: ['אדום', 'כחול', 'ירוק', 'צהוב', 'כתום', 'סגול', 'ורוד', 'שחור', 'לבן', 'חום'],
  animals: ['כלב', 'חתול', 'פרה', 'סוס', 'ארנב', 'תרנגולת', 'פיל', 'אריה', 'נחש', 'ינשוף'],
};

export const PRESET_LABELS: Record<SegmentPreset, string> = {
  letters: '🔤 אותיות',
  numbers: '🔢 מספרים',
  colors: '🎨 צבעים',
  animals: '🐾 חיות',
};

const STORAGE_KEY = 'spinner-segments';

interface SpinnerState {
  segments: string[];
  result: string | null;
  isEditing: boolean;
}

interface SpinnerActions {
  setSegments: (segs: string[]) => void;
  addSegment: (text: string) => void;
  removeSegment: (index: number) => void;
  editSegment: (index: number, text: string) => void;
  applyPreset: (preset: SegmentPreset) => void;
  setResult: (result: string | null) => void;
  toggleEditing: () => void;
}

export const useSpinnerStore = create<SpinnerState & SpinnerActions>((set, get) => ({
  segments: PRESETS.letters,
  result: null,
  isEditing: false,

  setSegments: (segments) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(segments));
    }
    set({ segments });
  },
  addSegment: (text) => {
    const segments = [...get().segments, text.trim()].filter(Boolean);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(segments));
    set({ segments });
  },
  removeSegment: (index) => {
    const segments = get().segments.filter((_, i) => i !== index);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(segments));
    set({ segments });
  },
  editSegment: (index, text) => {
    const segments = get().segments.map((s, i) => (i === index ? text : s));
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(segments));
    set({ segments });
  },
  applyPreset: (preset) => {
    const segments = PRESETS[preset];
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(segments));
    set({ segments, result: null });
  },
  setResult: (result) => set({ result }),
  toggleEditing: () => set((s) => ({ isEditing: !s.isEditing })),
}));
