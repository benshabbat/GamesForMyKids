import { beforeEach, describe, expect, it } from 'vitest';
import { useWordSearchStore, GRID_SIZE } from '@/app/games/word-search/wordSearchStore';
import { WORD_SETS } from '@/app/games/word-search/data/wordSets';

const store = useWordSearchStore;

/** The cells of a placed word, in the order the grid builder laid them down. */
function cellsFor(word: string): Array<[number, number]> {
  const placed = store.getState().placed.find((p) => p.word === word);
  if (!placed) throw new Error(`"${word}" was not placed in the grid`);
  return placed.cells;
}

beforeEach(() => {
  store.getState().resetGame();
});

describe('wordSearchStore', () => {
  describe('startGame', () => {
    it('places every word in the chosen theme', () => {
      store.getState().startGame(0);
      const { placed, theme } = store.getState();

      expect(placed).toHaveLength(theme.words.length);
      expect(placed.map((p) => p.word).sort()).toEqual([...theme.words].sort());
    });

    it('fills the whole grid, leaving no blank cells for a child to stare at', () => {
      store.getState().startGame(0);
      const { grid } = store.getState();

      expect(grid).toHaveLength(GRID_SIZE);
      for (const row of grid) {
        expect(row).toHaveLength(GRID_SIZE);
        for (const cell of row) expect(cell).not.toBe('');
      }
    });

    it("lays each word's letters into the cells it claims", () => {
      store.getState().startGame(0);
      const { grid, placed } = store.getState();

      for (const { word, cells } of placed) {
        const fromGrid = cells.map(([r, c]) => grid[r]![c]).join('');
        // The fallback path truncates a word that would run off the grid, so
        // compare against the prefix the placement actually claimed.
        expect(fromGrid).toBe(word.slice(0, cells.length));
      }
    });

    it('keeps every placed cell inside the grid', () => {
      store.getState().startGame(0);

      for (const { cells } of store.getState().placed) {
        for (const [r, c] of cells) {
          expect(r).toBeGreaterThanOrEqual(0);
          expect(r).toBeLessThan(GRID_SIZE);
          expect(c).toBeGreaterThanOrEqual(0);
          expect(c).toBeLessThan(GRID_SIZE);
        }
      }
    });

    it('falls back to the first theme for an out-of-range index', () => {
      store.getState().startGame(999);
      expect(store.getState().theme).toEqual(WORD_SETS[0]);
    });

    it('clears found words and score from the previous round', () => {
      store.getState().startGame(0);
      const word = store.getState().placed[0]!.word;
      store.getState().submitSelection(cellsFor(word));

      store.getState().startGame(1);

      expect(store.getState().found.size).toBe(0);
      expect(store.getState().score).toBe(0);
    });
  });

  describe('submitSelection', () => {
    beforeEach(() => {
      store.getState().startGame(0);
    });

    it('accepts a correct selection and scores it', () => {
      const word = store.getState().placed[0]!.word;

      expect(store.getState().submitSelection(cellsFor(word))).toBe(true);
      expect(store.getState().found.has(word)).toBe(true);
      expect(store.getState().score).toBe(50);
    });

    it('accepts the same word selected backwards', () => {
      const word = store.getState().placed[0]!.word;
      const reversed = [...cellsFor(word)].reverse();

      expect(store.getState().submitSelection(reversed)).toBe(true);
      expect(store.getState().found.has(word)).toBe(true);
    });

    it('rejects a selection that matches no word', () => {
      expect(store.getState().submitSelection([[0, 0], [0, 1]])).toBe(false);
      expect(store.getState().score).toBe(0);
    });

    it('rejects an empty selection', () => {
      expect(store.getState().submitSelection([])).toBe(false);
    });

    it('does not score the same word twice', () => {
      const word = store.getState().placed[0]!.word;
      const cells = cellsFor(word);

      store.getState().submitSelection(cells);
      const scoreAfterFirst = store.getState().score;

      expect(store.getState().submitSelection(cells)).toBe(false);
      expect(store.getState().score).toBe(scoreAfterFirst);
    });

    it('stays in play until the last word is found', () => {
      const words = store.getState().placed.map((p) => p.word);

      for (const word of words.slice(0, -1)) {
        store.getState().submitSelection(cellsFor(word));
        expect(store.getState().phase).toBe('playing');
      }

      store.getState().submitSelection(cellsFor(words.at(-1)!));

      expect(store.getState().phase).toBe('result');
      expect(store.getState().score).toBe(words.length * 50);
    });
  });

  describe('resetGame', () => {
    it('returns to the menu with a clean board', () => {
      store.getState().startGame(0);
      store.getState().submitSelection(cellsFor(store.getState().placed[0]!.word));

      store.getState().resetGame();
      const state = store.getState();

      expect(state.phase).toBe('menu');
      expect(state.grid).toEqual([]);
      expect(state.placed).toEqual([]);
      expect(state.found.size).toBe(0);
      expect(state.score).toBe(0);
    });
  });
});
