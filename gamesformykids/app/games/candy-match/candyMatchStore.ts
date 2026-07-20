import { makePersistStore } from '@/lib/stores/createStore';
import { GRID_SIZE, CANDIES, START_MOVES, type Cell, type CandyMatchState, type CandyMatchActions } from './candyMatchTypes';
import { isAdjacent, swapCells, findMatches, makeInitialGrid, resolveCascades } from './candyMatchLogic';

export { GRID_SIZE, CANDIES };
export type { Cell };

export const useCandyMatchStore = makePersistStore<CandyMatchState & CandyMatchActions>(
  'CandyMatchStore',
  'candy-match-best',
  (set, get) => ({
    phase: 'menu',
    grid: makeInitialGrid(),
    selected: null,
    clearing: [],
    invalidSwap: null,
    busy: false,
    score: 0,
    best: 0,
    movesLeft: START_MOVES,
    combo: 0,

    startGame: () => {
      set({
        phase: 'playing',
        grid: makeInitialGrid(),
        selected: null,
        clearing: [],
        invalidSwap: null,
        busy: false,
        score: 0,
        movesLeft: START_MOVES,
        combo: 0,
      });
    },

    selectCell: (index) => {
      const { phase, busy, selected, grid } = get();
      if (phase !== 'playing' || busy) return;

      if (selected === null) {
        set({ selected: index });
        return;
      }
      if (selected === index) {
        set({ selected: null });
        return;
      }
      if (!isAdjacent(selected, index)) {
        set({ selected: index });
        return;
      }

      const swapped = swapCells(grid, selected, index);
      const matches = findMatches(swapped);
      set({ selected: null });

      if (matches.size === 0) {
        set({ invalidSwap: [selected, index] });
        setTimeout(() => set({ invalidSwap: null }), 400);
        return;
      }

      set({ grid: swapped, busy: true, movesLeft: get().movesLeft - 1 });
      void resolveCascades(get, set);
    },
  }),
  { partialize: (s) => ({ best: s.best }) },
);
