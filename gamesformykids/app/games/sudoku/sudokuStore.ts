'use client';
import { create } from 'zustand';
import { SIZE_CONFIGS, type Size, type Difficulty, type SudokuGrid } from './sudokuLogic';

export type Phase = 'idle' | 'generating' | 'playing' | 'won';
export interface CellPos { row: number; col: number }

const MAX_HINTS = 3;

function isComplete(puzzle: SudokuGrid): boolean {
  return puzzle.every((row) => row.every((v) => v !== 0));
}

interface State {
  size: Size;
  boxRows: number;
  boxCols: number;
  difficulty: Difficulty;
  puzzle: SudokuGrid;
  solution: SudokuGrid;
  given: boolean[][];
  selected: CellPos | null;
  phase: Phase;
  mistakes: number;
  hintsLeft: number;
  errorCell: CellPos | null;
  lockedCell: CellPos | null;
}

interface Actions {
  chooseSetup: (size: Size, difficulty: Difficulty) => void;
  applyPuzzle: (puzzle: SudokuGrid, solution: SudokuGrid, given: boolean[][]) => void;
  selectCell: (row: number, col: number) => void;
  inputNumber: (n: number) => void;
  useHint: () => void;
  clearError: () => void;
  clearLocked: () => void;
  reset: () => void;
}

export const useSudokuStore = create<State & Actions>((set) => ({
  size: 9,
  boxRows: 3,
  boxCols: 3,
  difficulty: 'easy',
  puzzle: [],
  solution: [],
  given: [],
  selected: null,
  phase: 'idle',
  mistakes: 0,
  hintsLeft: MAX_HINTS,
  errorCell: null,
  lockedCell: null,

  chooseSetup: (size, difficulty) => {
    const { boxRows, boxCols } = SIZE_CONFIGS[size];
    set({ size, boxRows, boxCols, difficulty, phase: 'generating' });
  },

  applyPuzzle: (puzzle, solution, given) => set({
    puzzle, solution, given,
    phase: 'playing',
    selected: null,
    mistakes: 0,
    hintsLeft: MAX_HINTS,
    errorCell: null,
    lockedCell: null,
  }),

  selectCell: (row, col) => set({ selected: { row, col } }),

  inputNumber: (n) => set((state) => {
    if (state.phase !== 'playing' || !state.selected) return state;
    const { row, col } = state.selected;
    if (state.given[row]?.[col] || state.puzzle[row]?.[col] !== 0) {
      return { ...state, lockedCell: { row, col } };
    }

    if (state.solution[row]?.[col] === n) {
      const puzzle = state.puzzle.map((r) => [...r]);
      puzzle[row]![col] = n;
      return {
        ...state,
        puzzle,
        errorCell: null,
        lockedCell: null,
        phase: isComplete(puzzle) ? 'won' : state.phase,
      };
    }
    return { ...state, mistakes: state.mistakes + 1, errorCell: { row, col }, lockedCell: null };
  }),

  useHint: () => set((state) => {
    if (state.phase !== 'playing' || !state.selected || state.hintsLeft <= 0) return state;
    const { row, col } = state.selected;
    if (state.given[row]?.[col] || state.puzzle[row]?.[col] !== 0) return state;

    const puzzle = state.puzzle.map((r) => [...r]);
    puzzle[row]![col] = state.solution[row]![col]!;
    return {
      ...state,
      puzzle,
      hintsLeft: state.hintsLeft - 1,
      phase: isComplete(puzzle) ? 'won' : state.phase,
    };
  }),

  clearError: () => set({ errorCell: null }),
  clearLocked: () => set({ lockedCell: null }),

  reset: () => set({
    phase: 'idle',
    puzzle: [],
    solution: [],
    given: [],
    selected: null,
    mistakes: 0,
    hintsLeft: MAX_HINTS,
    errorCell: null,
    lockedCell: null,
  }),
}));
