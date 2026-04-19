/**
 * Coloring Game Store — Zustand
 * מנהל את כל מצב משחק הצביעה: תמונה נוכחית, צבע נבחר, מילויים, אזור נבחר.
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// ── Constants ────────────────────────────────────────────────────────────────

export const PALETTE_COLORS = [
  { hex: '#FF4136', hebrew: 'אדום' },
  { hex: '#FF851B', hebrew: 'כתום' },
  { hex: '#FFDC00', hebrew: 'צהוב' },
  { hex: '#2ECC40', hebrew: 'ירוק' },
  { hex: '#0074D9', hebrew: 'כחול' },
  { hex: '#B10DC9', hebrew: 'סגול' },
  { hex: '#FF69B4', hebrew: 'ורוד' },
  { hex: '#8B4513', hebrew: 'חום' },
  { hex: '#AAAAAA', hebrew: 'אפור' },
  { hex: '#111111', hebrew: 'שחור' },
  { hex: '#7FDBFF', hebrew: 'תכלת' },
  { hex: '#01FF70', hebrew: 'ירוק בהיר' },
] as const;

export type ImageId = 'cat' | 'house' | 'sun' | 'butterfly' | 'flower';

export const IMAGES: { id: ImageId; title: string; emoji: string }[] = [
  { id: 'cat', title: 'חתול', emoji: '🐱' },
  { id: 'house', title: 'בית', emoji: '🏠' },
  { id: 'sun', title: 'שמש', emoji: '☀️' },
  { id: 'butterfly', title: 'פרפר', emoji: '🦋' },
  { id: 'flower', title: 'פרח', emoji: '🌸' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

type AllFills = Record<ImageId, Record<string, string>>;

const EMPTY_FILLS: AllFills = {
  cat: {}, house: {}, sun: {}, butterfly: {}, flower: {},
};

function speakHebrew(text: string) {
  if (typeof window === 'undefined') return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'he-IL';
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// ── Store ─────────────────────────────────────────────────────────────────────

interface ColoringState {
  currentImage: ImageId;
  selectedColor: string;
  allFills: AllFills;
  doneImages: Record<ImageId, boolean>;
  selectedRegion: string | null;
  selectedRegionColorableIds: string[];
}

interface ColoringActions {
  selectImage: (id: ImageId) => void;
  selectColor: (hex: string, hebrew: string) => void;
  selectRegion: (id: string, colorableIds: string[]) => void;
  clearImage: () => void;
}

export const useColoringStore = create<ColoringState & ColoringActions>()(
  devtools(
    (set, get) => ({
      currentImage: 'cat',
      selectedColor: PALETTE_COLORS[0].hex,
      allFills: EMPTY_FILLS,
      doneImages: { cat: false, house: false, sun: false, butterfly: false, flower: false },
      selectedRegion: null,
      selectedRegionColorableIds: [],

      selectImage: (id) =>
        set({ currentImage: id, selectedRegion: null }, false, 'selectImage'),

      selectColor: (hex, hebrew) => {
        const { selectedRegion, selectedRegionColorableIds, currentImage, allFills } = get();
        speakHebrew(hebrew);
        if (selectedRegion) {
          const updated = { ...allFills[currentImage], [selectedRegion]: hex };
          const isDone = selectedRegionColorableIds.every((rid) => updated[rid]);
          set(
            (state) => ({
              selectedColor: hex,
              selectedRegion: null,
              allFills: { ...state.allFills, [currentImage]: updated },
              doneImages: isDone
                ? { ...state.doneImages, [currentImage]: true }
                : state.doneImages,
            }),
            false,
            'selectColor',
          );
        } else {
          set({ selectedColor: hex }, false, 'selectColor');
        }
      },

      selectRegion: (id, colorableIds) => {
        const { selectedRegion } = get();
        set(
          {
            selectedRegion: selectedRegion === id ? null : id,
            selectedRegionColorableIds: colorableIds,
          },
          false,
          'selectRegion',
        );
      },

      clearImage: () => {
        const { currentImage } = get();
        set(
          (state) => ({
            allFills: { ...state.allFills, [currentImage]: {} },
            doneImages: { ...state.doneImages, [currentImage]: false },
            selectedRegion: null,
          }),
          false,
          'clearImage',
        );
      },
    }),
    { name: 'ColoringStore' },
  ),
);
