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
  star: {}, balloon: {}, robot: {}, dog: {}, boat: {}, forest: {}, 'forest-friends': {},
};

/** Max undo steps kept per image, for either picture kind. */
const MAX_HISTORY = 20;

/** A Gemini-generated (or otherwise custom) flood-fill picture, layered on top of the static IMAGE_COMPONENTS set. */
export interface CustomImage {
  id: string;
  src: string;
  width: number;
  height: number;
}

// ── Store ─────────────────────────────────────────────────────────────────────

interface ColoringState {
  currentImage: ImageId;
  selectedColor: string;
  allFills: AllFills;
  doneImages: Record<ImageId, boolean>;
  /** region-mode undo stack: previous allFills[image] states, most recent last */
  fillHistory: Partial<Record<ImageId, Record<string, string>[]>>;
  /** dataURL snapshot per flood-fill image (static or custom), so switching pictures doesn't lose progress */
  floodFillSnapshots: Partial<Record<string, string>>;
  /** imperative reset/undo registered by the currently-mounted FloodFillCanvas */
  floodFillClear: () => void;
  floodFillUndo: () => void;
  /** reactive flag so the Undo button can disable itself in flood-fill mode */
  floodFillCanUndo: boolean;
  /** non-null when viewing a Gemini-generated picture instead of a static one */
  customImage: CustomImage | null;
}

interface ColoringActions {
  selectImage: (id: ImageId) => void;
  selectColor: (hex: string) => void;
  /** מצבע אזור מיד בצבע הנבחר */
  selectRegion: (id: string, colorableIds: string[]) => void;  /** מצבע קבוצת אזורים בצבע הנבחר */
  fillGroup: (memberIds: string[], colorableIds: string[]) => void;  clearImage: () => void;
  /** מבטל את הפעולה האחרונה (מילוי אזור/דלי צבע/ניקוי) */
  undo: () => void;
  registerFloodFillClear: (fn: () => void) => void;
  registerFloodFillUndo: (fn: () => void) => void;
  setFloodFillCanUndo: (can: boolean) => void;
  saveFloodFillSnapshot: (id: string, dataUrl: string) => void;
  setCustomImage: (img: CustomImage | null) => void;
}

export const useColoringStore = makeStore<ColoringState & ColoringActions>(
  'ColoringStore',
  (set, get) => {
    /** מעדכן allFills+doneImages עבור התמונה הנוכחית ובודק אם הושלמה, ושומר את המצב הקודם לביטול */
    const applyFill = (updated: Record<string, string>, colorableIds: string[], actionName: string) => {
      const { currentImage } = get();
      const isDone = colorableIds.every((rid) => updated[rid]);
      set(
        (state) => {
          const previous = state.allFills[currentImage];
          const history = [...(state.fillHistory[currentImage] ?? []), previous].slice(-MAX_HISTORY);
          return {
            allFills: { ...state.allFills, [currentImage]: updated },
            fillHistory: { ...state.fillHistory, [currentImage]: history },
            doneImages: isDone
              ? { ...state.doneImages, [currentImage]: true }
              : state.doneImages,
          };
        },
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
        star: false, balloon: false, robot: false, dog: false, boat: false, forest: false, 'forest-friends': false,
      },
      fillHistory: {},
      floodFillSnapshots: {},
      floodFillClear: () => {},
      floodFillUndo: () => {},
      floodFillCanUndo: false,
      customImage: null,

      selectImage: (id) =>
        set({ currentImage: id, customImage: null }, false, 'selectImage'),

      setCustomImage: (img) => set({ customImage: img }, false, 'setCustomImage'),

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
        const { currentImage, customImage } = get();
        if (customImage || IMAGE_COMPONENTS[currentImage].kind === 'floodfill') {
          const key = customImage?.id ?? currentImage;
          get().floodFillClear();
          set(
            (state) => {
              const next = { ...state.floodFillSnapshots };
              delete next[key];
              return { floodFillSnapshots: next };
            },
            false,
            'clearImage/floodfill',
          );
          return;
        }
        set(
          (state) => {
            const previous = state.allFills[currentImage];
            const history = [...(state.fillHistory[currentImage] ?? []), previous].slice(-MAX_HISTORY);
            return {
              allFills: { ...state.allFills, [currentImage]: {} },
              fillHistory: { ...state.fillHistory, [currentImage]: history },
              doneImages: { ...state.doneImages, [currentImage]: false },
            };
          },
          false,
          'clearImage/regions',
        );
      },

      undo: () => {
        const { currentImage, customImage } = get();
        if (customImage || IMAGE_COMPONENTS[currentImage].kind === 'floodfill') {
          get().floodFillUndo();
          return;
        }
        set(
          (state) => {
            const history = state.fillHistory[currentImage] ?? [];
            if (history.length === 0) return state;
            const previous = history[history.length - 1]!;
            return {
              allFills: { ...state.allFills, [currentImage]: previous },
              fillHistory: { ...state.fillHistory, [currentImage]: history.slice(0, -1) },
              doneImages: { ...state.doneImages, [currentImage]: false },
            };
          },
          false,
          'undo/regions',
        );
      },

      registerFloodFillClear: (fn) => set({ floodFillClear: fn }, false, 'registerFloodFillClear'),
      registerFloodFillUndo: (fn) => set({ floodFillUndo: fn }, false, 'registerFloodFillUndo'),
      setFloodFillCanUndo: (can) => set({ floodFillCanUndo: can }, false, 'setFloodFillCanUndo'),

      saveFloodFillSnapshot: (id, dataUrl) =>
        set(
          (state) => ({ floodFillSnapshots: { ...state.floodFillSnapshots, [id]: dataUrl } }),
          false,
          'saveFloodFillSnapshot',
        ),
    };
  },
);
