'use client';
import { makePersistStore } from '@/lib/stores/createStore';

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

export const useSpinnerStore = makePersistStore<SpinnerState & SpinnerActions>(
  'SpinnerStore',
  'spinner-segments',
  (set, get) => ({
    segments: PRESETS.letters,
    result: null,
    isEditing: false,

    setSegments: (segments) => set({ segments }, false, 'spinner/setSegments'),
    addSegment: (text) => {
      const segments = [...get().segments, text.trim()].filter(Boolean);
      set({ segments }, false, 'spinner/addSegment');
    },
    removeSegment: (index) => {
      const segments = get().segments.filter((_, i) => i !== index);
      set({ segments }, false, 'spinner/removeSegment');
    },
    editSegment: (index, text) => {
      const segments = get().segments.map((s, i) => (i === index ? text : s));
      set({ segments }, false, 'spinner/editSegment');
    },
    applyPreset: (preset) => set({ segments: PRESETS[preset], result: null }, false, 'spinner/applyPreset'),
    setResult: (result) => set({ result }, false, 'spinner/setResult'),
    toggleEditing: () => set((s) => ({ isEditing: !s.isEditing }), false, 'spinner/toggleEditing'),
  }),
  { partialize: (s) => ({ segments: s.segments }) },
);
