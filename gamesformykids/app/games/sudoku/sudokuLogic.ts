import { shuffle } from '@/lib/utils';

export type Size = 6 | 9;
export type Difficulty = 'easy' | 'medium' | 'hard';
export type SudokuGrid = number[][];

interface SizeConfig {
  boxRows: number;
  boxCols: number;
  clues: Record<Difficulty, number>;
}

export const SIZE_CONFIGS: Record<Size, SizeConfig> = {
  6: { boxRows: 2, boxCols: 3, clues: { easy: 22, medium: 17, hard: 13 } },
  9: { boxRows: 3, boxCols: 3, clues: { easy: 40, medium: 32, hard: 26 } },
};

function emptyGrid(size: Size): SudokuGrid {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

function getCandidates(
  grid: SudokuGrid,
  row: number,
  col: number,
  size: Size,
  boxRows: number,
  boxCols: number,
): number[] {
  const used = new Set<number>();
  for (let c = 0; c < size; c++) {
    const v = grid[row]![c]!;
    if (v !== 0) used.add(v);
  }
  for (let r = 0; r < size; r++) {
    const v = grid[r]![col]!;
    if (v !== 0) used.add(v);
  }
  const boxStartRow = Math.floor(row / boxRows) * boxRows;
  const boxStartCol = Math.floor(col / boxCols) * boxCols;
  for (let r = boxStartRow; r < boxStartRow + boxRows; r++) {
    for (let c = boxStartCol; c < boxStartCol + boxCols; c++) {
      const v = grid[r]![c]!;
      if (v !== 0) used.add(v);
    }
  }
  const out: number[] = [];
  for (let n = 1; n <= size; n++) if (!used.has(n)) out.push(n);
  return out;
}

function findMRVCell(
  grid: SudokuGrid,
  size: Size,
  boxRows: number,
  boxCols: number,
): { row: number; col: number; candidates: number[] } | null {
  let best: { row: number; col: number; candidates: number[] } | null = null;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r]![c] !== 0) continue;
      const candidates = getCandidates(grid, r, c, size, boxRows, boxCols);
      if (!best || candidates.length < best.candidates.length) {
        best = { row: r, col: c, candidates };
        if (candidates.length <= 1) return best;
      }
    }
  }
  return best;
}

function fillGrid(grid: SudokuGrid, size: Size, boxRows: number, boxCols: number): boolean {
  const cell = findMRVCell(grid, size, boxRows, boxCols);
  if (!cell) return true; // no empty cells left — solved
  if (cell.candidates.length === 0) return false;

  for (const candidate of shuffle(cell.candidates)) {
    grid[cell.row]![cell.col] = candidate;
    if (fillGrid(grid, size, boxRows, boxCols)) return true;
    grid[cell.row]![cell.col] = 0;
  }
  return false;
}

function countSolutions(
  grid: SudokuGrid,
  size: Size,
  boxRows: number,
  boxCols: number,
  limit: number,
): number {
  const cell = findMRVCell(grid, size, boxRows, boxCols);
  if (!cell) return 1; // solved
  if (cell.candidates.length === 0) return 0;

  let count = 0;
  for (const candidate of cell.candidates) {
    grid[cell.row]![cell.col] = candidate;
    count += countSolutions(grid, size, boxRows, boxCols, limit - count);
    grid[cell.row]![cell.col] = 0;
    if (count >= limit) break;
  }
  return count;
}

export interface GeneratedPuzzle {
  puzzle: SudokuGrid;
  solution: SudokuGrid;
  given: boolean[][];
}

export function generatePuzzle(size: Size, difficulty: Difficulty): GeneratedPuzzle {
  const { boxRows, boxCols, clues } = SIZE_CONFIGS[size];

  const solution = emptyGrid(size);
  fillGrid(solution, size, boxRows, boxCols);

  const puzzle = solution.map((row) => [...row]);
  const positions = shuffle(
    Array.from({ length: size * size }, (_, i) => [Math.floor(i / size), i % size] as const),
  );

  const targetClues = clues[difficulty];
  let clueCount = size * size;

  // Uniqueness-checked removal gets expensive as clues get scarce. Bail out of
  // the search once the time budget is spent — whatever clue count has been
  // reached so far is still a valid, uniquely-solvable puzzle.
  const deadline = Date.now() + 1500;

  for (const [row, col] of positions) {
    if (clueCount <= targetClues || Date.now() > deadline) break;
    const backup = puzzle[row]![col]!;
    if (backup === 0) continue;
    puzzle[row]![col] = 0;

    const testGrid = puzzle.map((r) => [...r]);
    const solutions = countSolutions(testGrid, size, boxRows, boxCols, 2);

    if (solutions === 1) {
      clueCount--;
    } else {
      puzzle[row]![col] = backup;
    }
  }

  const given = puzzle.map((row) => row.map((v) => v !== 0));
  return { puzzle, solution, given };
}
