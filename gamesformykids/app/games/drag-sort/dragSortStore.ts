'use client';
import { create } from 'zustand';
import { DRAG_LEVELS, type DragLevel } from './dragSortData';

export interface ItemState {
  id: string;
  placed: boolean;
}

interface State {
  phase: 'menu' | 'playing' | 'result';
  levelIndex: number;
  currentLevel: DragLevel | null;
  itemStates: Record<string, ItemState>;
  score: number;
  errors: number;
}

interface Actions {
  startLevel: (index: number) => void;
  placeItem: (itemId: string, categoryId: string) => boolean;
  restart: () => void;
  goToMenu: () => void;
}

const INITIAL: State = {
  phase: 'menu',
  levelIndex: 0,
  currentLevel: null,
  itemStates: {},
  score: 0,
  errors: 0,
};

export const useDragSortStore = create<State & Actions>((set, get) => ({
  ...INITIAL,

  startLevel: (index) => {
    const level = DRAG_LEVELS[index];
    if (!level) return;
    const itemStates: Record<string, ItemState> = {};
    for (const item of level.items) {
      itemStates[item.id] = { id: item.id, placed: false };
    }
    set({ phase: 'playing', levelIndex: index, currentLevel: level, itemStates, score: 0, errors: 0 });
  },

  placeItem: (itemId, categoryId) => {
    const { currentLevel, itemStates } = get();
    const item = currentLevel?.items.find(i => i.id === itemId);
    if (!item) return false;
    const correct = item.categoryId === categoryId;
    if (correct) {
      const newStates = { ...itemStates, [itemId]: { id: itemId, placed: true } };
      const allPlaced = Object.values(newStates).every(s => s.placed);
      set(s => ({
        itemStates: newStates,
        score: s.score + 1,
        phase: allPlaced ? 'result' : 'playing',
      }));
    } else {
      set(s => ({ errors: s.errors + 1 }));
    }
    return correct;
  },

  restart: () => {
    const { levelIndex } = get();
    get().startLevel(levelIndex);
  },

  goToMenu: () => set({ ...INITIAL }),
}));
