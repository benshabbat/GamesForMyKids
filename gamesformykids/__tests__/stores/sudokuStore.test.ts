import { beforeEach, describe, expect, it } from 'vitest';
import { useSudokuStore } from '@/app/games/sudoku/sudokuStore';
import type { SudokuGrid } from '@/app/games/sudoku/sudokuLogic';

const store = useSudokuStore;
const MAX_HINTS = 3;

/** A valid 6x6 solution (2x3 boxes) — the smaller of the two sizes the game offers. */
const SOLUTION: SudokuGrid = [
  [1, 2, 3, 4, 5, 6],
  [4, 5, 6, 1, 2, 3],
  [2, 3, 1, 5, 6, 4],
  [5, 6, 4, 2, 3, 1],
  [3, 1, 2, 6, 4, 5],
  [6, 4, 5, 3, 1, 2],
];

interface Setup {
  puzzle: SudokuGrid;
  solution: SudokuGrid;
  given: boolean[][];
}

/** Builds a board where exactly `blanks` cells are empty; everything else is a given. */
function boardWithBlanks(blanks: Array<[number, number]>): Setup {
  const puzzle = SOLUTION.map((row) => [...row]);
  const given = SOLUTION.map((row) => row.map(() => true));

  for (const [row, col] of blanks) {
    puzzle[row]![col] = 0;
    given[row]![col] = false;
  }

  return { puzzle, solution: SOLUTION.map((row) => [...row]), given };
}

/** One move from done: only (0,0) is blank, and its answer is 1. */
const almostSolved = (): Setup => boardWithBlanks([[0, 0]]);

/** Two blanks — (0,0) answer 1 and (1,1) answer 5 — so completion needs both. */
const twoBlanks = (): Setup => boardWithBlanks([[0, 0], [1, 1]]);

function startWith(setup: Setup) {
  store.getState().chooseSetup(6, 'easy');
  store.getState().applyPuzzle(setup.puzzle, setup.solution, setup.given);
}

beforeEach(() => {
  store.getState().reset();
});

describe('sudokuStore', () => {
  describe('chooseSetup', () => {
    it('moves to generating and adopts the size box dimensions', () => {
      store.getState().chooseSetup(6, 'medium');
      const { phase, size, difficulty, boxRows, boxCols } = store.getState();

      expect(phase).toBe('generating');
      expect(size).toBe(6);
      expect(difficulty).toBe('medium');
      expect(boxRows * boxCols).toBe(6);
    });
  });

  describe('applyPuzzle', () => {
    it('starts play with a full hint allowance and no mistakes', () => {
      startWith(almostSolved());
      const state = store.getState();

      expect(state.phase).toBe('playing');
      expect(state.mistakes).toBe(0);
      expect(state.hintsLeft).toBe(MAX_HINTS);
      expect(state.selected).toBeNull();
    });

    it('clears mistakes carried over from a previous puzzle', () => {
      startWith(almostSolved());
      store.getState().selectCell(0, 0);
      store.getState().inputNumber(6);
      expect(store.getState().mistakes).toBe(1);

      startWith(almostSolved());
      expect(store.getState().mistakes).toBe(0);
    });
  });

  describe('inputNumber', () => {
    it('does nothing when no cell is selected', () => {
      startWith(almostSolved());
      store.getState().inputNumber(1);

      expect(store.getState().puzzle[0]![0]).toBe(0);
    });

    it('does nothing outside the playing phase', () => {
      startWith(almostSolved());
      store.getState().selectCell(0, 0);
      store.setState({ phase: 'idle' });
      store.getState().inputNumber(1);

      expect(store.getState().puzzle[0]![0]).toBe(0);
    });

    it('fills the cell on a correct entry', () => {
      startWith(almostSolved());
      store.getState().selectCell(0, 0);
      store.getState().inputNumber(1);

      expect(store.getState().puzzle[0]![0]).toBe(1);
      expect(store.getState().errorCell).toBeNull();
    });

    it('counts a mistake and flags the cell on a wrong entry, without filling it', () => {
      startWith(almostSolved());
      store.getState().selectCell(0, 0);
      store.getState().inputNumber(3);

      expect(store.getState().puzzle[0]![0]).toBe(0);
      expect(store.getState().mistakes).toBe(1);
      expect(store.getState().errorCell).toEqual({ row: 0, col: 0 });
    });

    it('accumulates mistakes across attempts', () => {
      startWith(almostSolved());
      store.getState().selectCell(0, 0);
      store.getState().inputNumber(2);
      store.getState().inputNumber(3);

      expect(store.getState().mistakes).toBe(2);
    });

    it('refuses to overwrite a given cell and reports it as locked', () => {
      startWith(almostSolved());
      store.getState().selectCell(1, 1);
      store.getState().inputNumber(6);

      expect(store.getState().puzzle[1]![1]).toBe(5);
      expect(store.getState().lockedCell).toEqual({ row: 1, col: 1 });
      // A locked cell is not the player's error, so it must not cost a mistake.
      expect(store.getState().mistakes).toBe(0);
    });

    it('wins once the last blank is filled', () => {
      startWith(almostSolved());
      store.getState().selectCell(0, 0);
      store.getState().inputNumber(1);

      expect(store.getState().phase).toBe('won');
    });

    it('does not win while a blank remains', () => {
      startWith(twoBlanks());
      store.getState().selectCell(0, 0);
      store.getState().inputNumber(1);

      expect(store.getState().phase).toBe('playing');

      store.getState().selectCell(1, 1);
      store.getState().inputNumber(5);

      expect(store.getState().phase).toBe('won');
    });
  });

  describe('useHint', () => {
    it('fills the selected cell from the solution and spends a hint', () => {
      startWith(twoBlanks());
      store.getState().selectCell(0, 0);
      store.getState().useHint();

      expect(store.getState().puzzle[0]![0]).toBe(1);
      expect(store.getState().hintsLeft).toBe(MAX_HINTS - 1);
    });

    it('can finish the puzzle', () => {
      startWith(almostSolved());
      store.getState().selectCell(0, 0);
      store.getState().useHint();

      expect(store.getState().phase).toBe('won');
    });

    it('stops once the allowance runs out', () => {
      startWith(twoBlanks());
      store.setState({ hintsLeft: 0 });
      store.getState().selectCell(0, 0);
      store.getState().useHint();

      expect(store.getState().puzzle[0]![0]).toBe(0);
      expect(store.getState().hintsLeft).toBe(0);
    });

    it('does not spend a hint on an already-filled cell', () => {
      startWith(twoBlanks());
      // (2, 2) is a given, so there is nothing for a hint to reveal.
      store.getState().selectCell(2, 2);
      store.getState().useHint();

      expect(store.getState().hintsLeft).toBe(MAX_HINTS);
    });

    it('does nothing with no cell selected', () => {
      startWith(twoBlanks());
      store.getState().useHint();

      expect(store.getState().hintsLeft).toBe(MAX_HINTS);
    });
  });

  describe('clearError / clearLocked', () => {
    it('dismisses the error flag', () => {
      startWith(almostSolved());
      store.getState().selectCell(0, 0);
      store.getState().inputNumber(3);
      store.getState().clearError();

      expect(store.getState().errorCell).toBeNull();
    });

    it('dismisses the locked flag', () => {
      startWith(almostSolved());
      store.getState().selectCell(1, 1);
      store.getState().inputNumber(6);
      store.getState().clearLocked();

      expect(store.getState().lockedCell).toBeNull();
    });
  });

  describe('reset', () => {
    it('returns to idle and clears the board and counters', () => {
      startWith(almostSolved());
      store.getState().selectCell(0, 0);
      store.getState().inputNumber(3);

      store.getState().reset();
      const state = store.getState();

      expect(state.phase).toBe('idle');
      expect(state.puzzle).toEqual([]);
      expect(state.mistakes).toBe(0);
      expect(state.hintsLeft).toBe(MAX_HINTS);
      expect(state.selected).toBeNull();
    });
  });
});
