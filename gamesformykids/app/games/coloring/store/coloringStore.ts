/**
 * Coloring Game Store — Zustand
 * מנהל את כל מצב משחק הצביעה: תמונה נוכחית, צבע נבחר, מילויים.
 * לחיצה על אזור → מצבע מיד בצבע הנבחר.
 */
import { makeStore } from '@/lib/stores/createStore';
import { PALETTE_COLORS, IMAGES, type ImageId } from '../constants';
import { IMAGE_COMPONENTS } from '../components/imageComponents';

export type { ImageId };
export { PALETTE_COLORS, IMAGES };

// ── Helpers ───────────────────────────────────────────────────────────────────

type AllFills = Record<ImageId, Record<string, string>>;

const EMPTY_FILLS: AllFills = {
  cat: {}, house: {}, sun: {}, butterfly: {}, flower: {}, fish: {}, tree: {}, car: {},
  star: {}, balloon: {}, robot: {}, dog: {}, boat: {}, forest: {},
};

// ── Store ─────────────────────────────────────────────────────────────────────

interface ColoringState {
  currentImage: ImageId;
  selectedColor: string;
  allFills: AllFills;
  doneImages: Record<ImageId, boolean>;
  /** dataURL snapshot per flood-fill image, so switching pictures doesn't lose progress */
  floodFillSnapshots: Partial<Record<ImageId, string>>;
  /** imperative reset registered by the currently-mounted FloodFillCanvas */
  floodFillClear: () => void;
}

interface ColoringActions {
  selectImage: (id: ImageId) => void;
  selectColor: (hex: string) => void;
  /** מצבע אזור מיד בצבע הנבחר */
  selectRegion: (id: string, colorableIds: string[]) => void;  /** מצבע קבוצת אזורים בצבע הנבחר */
  fillGroup: (memberIds: string[], colorableIds: string[]) => void;  clearImage: () => void;
  registerFloodFillClear: (fn: () => void) => void;
  saveFloodFillSnapshot: (id: ImageId, dataUrl: string) => void;
}

export const useColoringStore = makeStore<ColoringState & ColoringActions>(
  'ColoringStore',
  (set, get) => {
    /** מעדכן allFills+doneImages עבור התמונה הנוכחית ובודק אם הושלמה */
    const applyFill = (updated: Record<string, string>, colorableIds: string[], actionName: string) => {
      const { currentImage } = get();
      const isDone = colorableIds.every((rid) => updated[rid]);
      set(
        (state) => ({
          allFills: { ...state.allFills, [currentImage]: updated },
          doneImages: isDone
            ? { ...state.doneImages, [currentImage]: true }
            : state.doneImages,
        }),
        false,
        actionName,
      );
    };

    return {
      currentImage: 'cat',
      selectedColor: PALETTE_COLORS[0].hex,
      allFills: EMPTY_FILLS,
      doneImages: {
        cat: false, house: false, sun: false, butterfly: false, flower: false, fish: false, tree: false, car: false,
        star: false, balloon: false, robot: false, dog: false, boat: false, forest: false,
      },
      floodFillSnapshots: {},
      floodFillClear: () => {},

      selectImage: (id) =>
        set({ currentImage: id }, false, 'selectImage'),

      selectColor: (hex) => set({ selectedColor: hex }, false, 'selectColor'),

      selectRegion: (id, colorableIds) => {
        const { selectedColor, currentImage, allFills } = get();
        const updated = { ...allFills[currentImage], [id]: selectedColor };
        applyFill(updated, colorableIds, 'selectRegion');
      },

      fillGroup: (memberIds, colorableIds) => {
        const { selectedColor, currentImage, allFills } = get();
        const updates = Object.fromEntries(memberIds.map((id) => [id, selectedColor]));
        const updated = { ...allFills[currentImage], ...updates };
        applyFill(updated, colorableIds, 'fillGroup');
      },

      clearImage: () => {
        const { currentImage } = get();
        if (IMAGE_COMPONENTS[currentImage].kind === 'floodfill') {
          get().floodFillClear();
          set(
            (state) => {
              const next = { ...state.floodFillSnapshots };
              delete next[currentImage];
              return { floodFillSnapshots: next };
            },
            false,
            'clearImage/floodfill',
          );
          return;
        }
        set(
          (state) => ({
            allFills: { ...state.allFills, [currentImage]: {} },
            doneImages: { ...state.doneImages, [currentImage]: false },
          }),
          false,
          'clearImage/regions',
        );
      },

      registerFloodFillClear: (fn) => set({ floodFillClear: fn }, false, 'registerFloodFillClear'),

      saveFloodFillSnapshot: (id, dataUrl) =>
        set(
          (state) => ({ floodFillSnapshots: { ...state.floodFillSnapshots, [id]: dataUrl } }),
          false,
          'saveFloodFillSnapshot',
        ),
    };
  },
);
