import type { CrosswordClue, CrosswordPuzzle } from './data/puzzles';

export interface CellState {
  letter: string;
  correct: boolean | null;
  blocked: boolean;
  clueNumbers: number[];
}

export type Phase = 'menu' | 'playing' | 'result';

export interface CrosswordState {
  phase: Phase;
  puzzle: CrosswordPuzzle | null;
  puzzleIndex: number;
  grid: CellState[][];
  selectedClue: CrosswordClue | null;
  selectedCell: { row: number; col: number } | null;
  score: number;
  completedClues: Set<number>;
}

export interface CrosswordActions {
  startGame: (puzzleIndex?: number) => void;
  selectClue: (clue: CrosswordClue) => void;
  selectCell: (row: number, col: number) => void;
  typeLetter: (letter: string) => void;
  deleteLastLetter: () => void;
  checkWord: () => void;
  nextPuzzle: () => void;
  restart: () => void;
}
