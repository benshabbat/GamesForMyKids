'use client';
import { create } from 'zustand';
import { WORD_SETS, type WordSet } from './data/wordSets';

export const GRID_SIZE = 9;
const HEBREW_FILL = 'אבגדהוזחטיכלמנסעפצקרשת';

type Dir = readonly [number, number];
const DIRECTIONS: Dir[] = [
  [0, 1], [0, -1], [1, 0], [-1, 0],
  [1, 1], [1, -1], [-1, 1], [-1, -1],
] as const;

export type PlacedWord = {
  word: string;
  cells: Array<[number, number]>;
};

export type Phase = 'menu' | 'playing' | 'result';

interface State {
  phase: Phase;
  theme: WordSet;
  grid: string[][];
  placed: PlacedWord[];
  found: Set<string>;
  score: number;
}

interface Actions {
  startGame: (themeIdx: number) => void;
  submitSelection: (cells: Array<[number, number]>) => boolean;
  resetGame: () => void;
}

function canPlace(grid: string[][], letters: string[], row: number, col: number, dir: Dir): boolean {
  const [dr, dc] = dir;
  for (let i = 0; i < letters.length; i++) {
    const r = row + i * dr;
    const c = col + i * dc;
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return false;
    const cell = grid[r]?.[c];
    if (cell !== '' && cell !== letters[i]) return false;
  }
  return true;
}

function buildGrid(words: string[]): { grid: string[][]; placed: PlacedWord[] } {
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(''));
  const placed: PlacedWord[] = [];

  for (const word of words) {
    const letters = word.split('');
    let success = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]!;
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      if (canPlace(grid, letters, row, col, dir)) {
        const cells: Array<[number, number]> = [];
        letters.forEach((ch, i) => {
          const r = row + i * dir[0];
          const c = col + i * dir[1];
          grid[r]![c] = ch;
          cells.push([r, c]);
        });
        placed.push({ word, cells });
        success = true;
        break;
      }
    }
    if (!success) {
      // fallback: place horizontally starting from row 0
      const r = placed.length % GRID_SIZE;
      letters.forEach((ch, i) => {
        if (i < GRID_SIZE) grid[r]![i] = ch;
      });
      placed.push({ word, cells: letters.map((_, i) => [r, i] as [number, number]).slice(0, GRID_SIZE) });
    }
  }

  // Fill empty cells with random Hebrew letters
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r]![c]) {
        grid[r]![c] = HEBREW_FILL[Math.floor(Math.random() * HEBREW_FILL.length)]!;
      }
    }
  }

  return { grid, placed };
}

function cellKey(r: number, c: number) { return `${r},${c}`; }

export const useWordSearchStore = create<State & Actions>((set, get) => ({
  phase: 'menu',
  theme: WORD_SETS[0]!,
  grid: [],
  placed: [],
  found: new Set(),
  score: 0,

  startGame: (themeIdx) => {
    const theme = WORD_SETS[themeIdx] ?? WORD_SETS[0]!;
    const { grid, placed } = buildGrid(theme.words);
    set({ phase: 'playing', theme, grid, placed, found: new Set(), score: 0 });
  },

  submitSelection: (cells) => {
    const { placed, found, score } = get();
    const selKeys = cells.map(([r, c]) => cellKey(r, c));
    const selStr = selKeys.join('|');
    const selStrRev = [...selKeys].reverse().join('|');

    for (const pw of placed) {
      if (found.has(pw.word)) continue;
      const pwKeys = pw.cells.map(([r, c]) => cellKey(r, c)).join('|');
      if (pwKeys === selStr || pwKeys === selStrRev) {
        const newFound = new Set(found);
        newFound.add(pw.word);
        const allFound = newFound.size >= placed.length;
        set({ found: newFound, score: score + 50, phase: allFound ? 'result' : 'playing' });
        return true;
      }
    }
    return false;
  },

  resetGame: () => {
    set({ phase: 'menu', found: new Set(), score: 0 });
  },
}));
