import type { CrosswordPuzzle } from './data/puzzles';
import type { CellState } from './crosswordTypes';

export function buildGrid(puzzle: CrosswordPuzzle): CellState[][] {
  const size = puzzle.gridSize;
  const grid: CellState[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      letter: '',
      correct: null,
      blocked: true,
      clueNumbers: [],
    }))
  );

  for (const clue of puzzle.clues) {
    for (let i = 0; i < clue.answer.length; i++) {
      const row = clue.direction === 'down' ? clue.row + i : clue.row;
      const col = clue.direction === 'across' ? clue.col + i : clue.col;
      if (row < size && col < size) {
        const cell = grid[row]?.[col];
        if (cell) {
          cell.blocked = false;
          if (i === 0) {
            cell.clueNumbers = [...cell.clueNumbers, clue.number];
          }
        }
      }
    }
  }

  return grid;
}

export function getCell(grid: CellState[][], row: number, col: number): CellState | null {
  return grid[row]?.[col] ?? null;
}
