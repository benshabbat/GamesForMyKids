/**
 * Coloring Game Store — Zustand
 * מנהל את כל מצב משחק הצביעה: תמונה נוכחית, צבע נבחר, מילויים.
 * לחיצה על אזור → מצבע מיד בצבע הנבחר.
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PALETTE_COLORS, IMAGES, type ImageId } from '../constants';

export type { ImageId };
export { PALETTE_COLORS, IMAGES };

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
}

interface ColoringActions {
  selectImage: (id: ImageId) => void;
  selectColor: (hex: string, hebrew: string) => void;
  /** מצבע אזור מיד בצבע הנבחר */
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

      selectImage: (id) =>
        set({ currentImage: id }, false, 'selectImage'),

      selectColor: (hex, hebrew) => {
        speakHebrew(hebrew);
        set({ selectedColor: hex }, false, 'selectColor');
      },

      selectRegion: (id, colorableIds) => {
        const { selectedColor, currentImage, allFills } = get();
        const updated = { ...allFills[currentImage], [id]: selectedColor };
        const isDone = colorableIds.every((rid) => updated[rid]);
        set(
          (state) => ({
            allFills: { ...state.allFills, [currentImage]: updated },
            doneImages: isDone
              ? { ...state.doneImages, [currentImage]: true }
              : state.doneImages,
          }),
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
          }),
          false,
          'clearImage',
        );
      },
    }),
    { name: 'ColoringStore' },
  ),
);
