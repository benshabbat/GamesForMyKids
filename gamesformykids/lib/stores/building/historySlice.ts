import type { StateCreator } from 'zustand';
import type { BuildingStore } from '../buildingStore';

export type HistorySlice = {
  history: import('@/app/games/building/types').Block[][];
  historyIndex: number;
  addToHistory: (blocks: import('@/app/games/building/types').Block[]) => void;
  undo: () => void;
  redo: () => void;
};

export const createHistorySlice: StateCreator<BuildingStore, [], [], HistorySlice> = (
  set,
  get,
) => ({
  history: [[]],
  historyIndex: 0,

  addToHistory: (newBlocks) => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newBlocks]);
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({ historyIndex: newIndex, blocks: [...history[newIndex]!] });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({ historyIndex: newIndex, blocks: [...history[newIndex]!] });
    }
  },
});
