export type Phase = 'menu' | 'playing' | 'result';

export const GRID_SIZE = 7;
export const CANDIES = ['🍬', '🍭', '🍫', '🍩', '🍪', '🧁'] as const;
export const CANDY_COUNT = CANDIES.length;
export const START_MOVES = 20;
export const POP_MS = 260;
export const SETTLE_MS = 180;

export interface Cell {
  id: number;
  type: number;
}

export interface CandyMatchState {
  phase: Phase;
  grid: Cell[];
  selected: number | null;
  clearing: number[];
  invalidSwap: [number, number] | null;
  busy: boolean;
  score: number;
  best: number;
  movesLeft: number;
  combo: number;
}

export interface CandyMatchActions {
  startGame: () => void;
  selectCell: (index: number) => void;
}
