'use client';
import { create } from 'zustand';

export type Grid = number[][];
export type Direction = 'left' | 'right' | 'up' | 'down';

export const TARGET = 64;

function makeEmptyGrid(): Grid {
  return Array.from({ length: 4 }, () => [0, 0, 0, 0]);
}

function getEmpties(grid: Grid): [number, number][] {
  const result: [number, number][] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (grid[r]![c] === 0) result.push([r, c]);
  return result;
}

function spawnTile(grid: Grid): Grid {
  const empties = getEmpties(grid);
  if (empties.length === 0) return grid;
  const pick = empties[Math.floor(Math.random() * empties.length)]!;
  const value = Math.random() < 0.8 ? 1 : 2;
  const newGrid = grid.map(r => [...r]);
  newGrid[pick[0]]![pick[1]] = value;
  return newGrid;
}

function slideRow(row: number[]): { row: number[]; merges: number[] } {
  const merges: number[] = [];
  const nonZero = row.filter(c => c !== 0);
  const out: number[] = [];
  let i = 0;
  while (i < nonZero.length) {
    if (i + 1 < nonZero.length && nonZero[i] === nonZero[i + 1]) {
      const sum = nonZero[i]! + nonZero[i + 1]!;
      out.push(sum);
      merges.push(sum);
      i += 2;
    } else {
      out.push(nonZero[i]!);
      i++;
    }
  }
  while (out.length < 4) out.push(0);
  return { row: out, merges };
}

function transpose(g: Grid): Grid {
  return [0, 1, 2, 3].map(c => [0, 1, 2, 3].map(r => g[r]![c]!));
}

function flipRows(g: Grid): Grid {
  return g.map(r => [...r].reverse());
}

export function applySlide(
  grid: Grid,
  direction: Direction,
): { grid: Grid; merges: number[]; moved: boolean } {
  let g = grid;
  if (direction === 'right') g = flipRows(g);
  if (direction === 'up')    g = transpose(g);
  if (direction === 'down')  g = flipRows(transpose(g));

  const allMerges: number[] = [];
  let moved = false;
  g = g.map((row) => {
    const { row: newRow, merges } = slideRow(row);
    allMerges.push(...merges);
    if (newRow.some((v, ci) => v !== row[ci])) moved = true;
    return newRow;
  });

  if (direction === 'right') g = flipRows(g);
  if (direction === 'up')    g = transpose(g);
  if (direction === 'down')  g = transpose(flipRows(g));

  return { grid: g, merges: allMerges, moved };
}

function hasWon(grid: Grid): boolean {
  return grid.some(row => row.some(v => v >= TARGET));
}

function canMove(grid: Grid): boolean {
  if (getEmpties(grid).length > 0) return true;
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 3; c++)
      if (grid[r]![c] === grid[r]![c + 1]) return true;
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 4; c++)
      if (grid[r]![c] === grid[r + 1]![c]) return true;
  return false;
}

interface State {
  grid: Grid;
  score: number;
  phase: 'idle' | 'playing' | 'won' | 'gameOver';
  lastMerges: number[];
}
interface Actions {
  startGame: () => void;
  slide: (direction: Direction) => void;
  reset: () => void;
}

export const useNumberSlideStore = create<State & Actions>((set) => ({
  grid: makeEmptyGrid(),
  score: 0,
  phase: 'idle',
  lastMerges: [],

  startGame: () => {
    let g = makeEmptyGrid();
    g = spawnTile(g);
    g = spawnTile(g);
    set({ grid: g, score: 0, phase: 'playing', lastMerges: [] });
  },

  slide: (direction) => set((state) => {
    if (state.phase !== 'playing') return state;
    const { grid, merges, moved } = applySlide(state.grid, direction);
    if (!moved) return { ...state, lastMerges: [] };
    const spawned = spawnTile(grid);
    const score = state.score + merges.reduce((a, b) => a + b, 0);
    const phase = hasWon(spawned) ? 'won'
      : !canMove(spawned)         ? 'gameOver'
      : 'playing';
    return { grid: spawned, score, phase, lastMerges: merges };
  }),

  reset: () => set({ grid: makeEmptyGrid(), score: 0, phase: 'idle', lastMerges: [] }),
}));
