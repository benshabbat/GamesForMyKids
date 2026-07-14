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
  fruits: {}, 'superheroes-team': {}, lion: {}, 'woodland-park': {}, 'superheroes-kids': {},
  'superheroes-team-2': {}, elephant: {}, 'jungle-animals': {}, 'jungle-animals-2': {}, giraffe: {},
  'princess-garden': {}, 'woodland-friends': {}, 'princess-library': {}, 'princess-picnic': {}, 'jungle-panda': {},
};

/** Max undo steps kept per image, for either picture kind. */
const MAX_HISTORY = 20;

// ── Store ─────────────────────────────────────────────────────────────────────

interface ColoringState {
  currentImage: ImageId;
  selectedColor: string;
  allFills: AllFills;
  doneImages: Record<ImageId, boolean>;
  /** region-mode undo stack: previous allFills[image] states, most recent last */
  fillHistory: Partial<Record<ImageId, Record<string, string>[]>>;
  /** dataURL snapshot per flood-fill image, so switching pictures doesn't lose progress */
  floodFillSnapshots: Partial<Record<ImageId, string>>;
  /** imperative reset/undo registered by the currently-mounted FloodFillCanvas */
  floodFillClear: () => void;
  floodFillUndo: () => void;
  /** reactive flag so the Undo button can disable itself in flood-fill mode */
  floodFillCanUndo: boolean;
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
  saveFloodFillSnapshot: (id: ImageId, dataUrl: string) => void;
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
        fruits: false, 'superheroes-team': false, lion: false, 'woodland-park': false, 'superheroes-kids': false,
        'superheroes-team-2': false, elephant: false, 'jungle-animals': false, 'jungle-animals-2': false, giraffe: false,
        'princess-garden': false, 'woodland-friends': false, 'princess-library': false, 'princess-picnic': false, 'jungle-panda': false,
      },
      fillHistory: {},
      floodFillSnapshots: {},
      floodFillClear: () => {},
      floodFillUndo: () => {},
      floodFillCanUndo: false,

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
        const { currentImage } = get();
        if (IMAGE_COMPONENTS[currentImage].kind === 'floodfill') {
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
