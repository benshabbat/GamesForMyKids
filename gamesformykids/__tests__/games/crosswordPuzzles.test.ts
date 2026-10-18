import { describe, expect, it } from 'vitest';
import { CROSSWORD_PUZZLES } from '@/app/games/crossword/data/puzzles';
import { buildGrid } from '@/app/games/crossword/crosswordLogic';

/** Every [row, col] an answer occupies, paired with the letter it puts there. */
function cellsOf(clue: (typeof CROSSWORD_PUZZLES)[number]['clues'][number]) {
  return [...clue.answer].map((letter, i) => ({
    row: clue.direction === 'down' ? clue.row + i : clue.row,
    col: clue.direction === 'across' ? clue.col + i : clue.col,
    letter,
  }));
}

describe.each(CROSSWORD_PUZZLES.map((p) => [p.title, p] as const))('crossword "%s"', (_title, puzzle) => {
  it('fits every answer inside the grid', () => {
    for (const clue of puzzle.clues) {
      for (const { row, col } of cellsOf(clue)) {
        expect(row, `${clue.answer} row`).toBeLessThan(puzzle.gridSize);
        expect(col, `${clue.answer} col`).toBeLessThan(puzzle.gridSize);
      }
    }
  });

  it('agrees on the letter wherever two answers cross', () => {
    const letters = new Map<string, { letter: string; answer: string }>();
    for (const clue of puzzle.clues) {
      for (const { row, col, letter } of cellsOf(clue)) {
        const key = `${row},${col}`;
        const prev = letters.get(key);
        if (prev) expect(letter, `${clue.answer} vs ${prev.answer} at ${key}`).toBe(prev.letter);
        else letters.set(key, { letter, answer: clue.answer });
      }
    }
  });

  it('has unique clue numbers and at most one clue starting per cell', () => {
    const numbers = puzzle.clues.map((c) => c.number);
    expect(new Set(numbers).size).toBe(numbers.length);
    const starts = puzzle.clues.map((c) => `${c.row},${c.col}`);
    expect(new Set(starts).size).toBe(starts.length);
  });

  it('can be completed: filling every answer leaves every open cell lettered consistently', () => {
    const grid = buildGrid(puzzle);
    for (const clue of puzzle.clues) {
      for (const { row, col, letter } of cellsOf(clue)) grid[row]![col]!.letter = letter;
    }
    for (const clue of puzzle.clues) {
      expect(cellsOf(clue).map(({ row, col }) => grid[row]![col]!.letter).join('')).toBe(clue.answer);
    }
  });
});
