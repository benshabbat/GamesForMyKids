'use client';
import { create } from 'zustand';
import { generateMaze, placeStars, type Wall } from './lib/mazeGenerator';

const LEVELS = [
  { rows: 5,  cols: 5,  stars: 3 },
  { rows: 7,  cols: 7,  stars: 3 },
  { rows: 9,  cols: 9,  stars: 4 },
  { rows: 11, cols: 11, stars: 5 },
  { rows: 13, cols: 13, stars: 5 },
];

export type MazePhase = 'idle' | 'playing' | 'levelComplete' | 'gameComplete';

interface MazeState {
  phase: MazePhase;
  level: number;
  grid: Wall[][];
  rows: number;
  cols: number;
  playerPos: [number, number];
  exitPos: [number, number];
  stars: Array<[number, number]>;
  collected: boolean[];
  starsCollectedThisLevel: number;
  totalStarsCollected: number;
}

interface MazeActions {
  startGame: () => void;
  move: (dir: 'N' | 'E' | 'S' | 'W') => void;
  nextLevel: () => void;
  reset: () => void;
}

function buildLevel(levelIdx: number): Partial<MazeState> {
  const cfg = LEVELS[levelIdx]!;
  const grid = generateMaze(cfg.rows, cfg.cols);
  const stars = placeStars(cfg.rows, cfg.cols, cfg.stars);
  return {
    grid,
    rows: cfg.rows,
    cols: cfg.cols,
    playerPos: [0, 0],
    exitPos: [cfg.rows - 1, cfg.cols - 1],
    stars,
    collected: Array(stars.length).fill(false),
    starsCollectedThisLevel: 0,
  };
}

export const useMazeStore = create<MazeState & MazeActions>((set, get) => ({
  phase: 'idle',
  level: 0,
  grid: [],
  rows: 5,
  cols: 5,
  playerPos: [0, 0],
  exitPos: [4, 4],
  stars: [],
  collected: [],
  starsCollectedThisLevel: 0,
  totalStarsCollected: 0,

  startGame: () => {
    set({ phase: 'playing', level: 0, totalStarsCollected: 0, ...buildLevel(0) });
  },

  move: (dir) => {
    const { phase, grid, rows, cols, playerPos, exitPos, stars, collected } = get();
    if (phase !== 'playing') return;

    const [pr, pc] = playerPos;
    const cell = grid[pr]?.[pc];
    if (!cell) return;
    if (cell[dir]) return; // wall blocks

    const deltas: Record<'N'|'E'|'S'|'W', [number, number]> = {
      N: [-1, 0], E: [0, 1], S: [1, 0], W: [0, -1],
    };
    const [dr, dc] = deltas[dir];
    const nr = pr + dr, nc = pc + dc;
    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return;

    const newPos: [number, number] = [nr, nc];

    // Check star collection
    const newCollected = [...collected];
    let newStarsThisLevel = get().starsCollectedThisLevel;
    let newTotalStars = get().totalStarsCollected;
    stars.forEach(([sr, sc], i) => {
      if (!newCollected[i] && sr === nr && sc === nc) {
        newCollected[i] = true;
        newStarsThisLevel++;
        newTotalStars++;
      }
    });

    // Check exit
    const atExit = nr === exitPos[0] && nc === exitPos[1];
    const { level } = get();
    const isLastLevel = level >= LEVELS.length - 1;

    set({
      playerPos: newPos,
      collected: newCollected,
      starsCollectedThisLevel: newStarsThisLevel,
      totalStarsCollected: newTotalStars,
      phase: atExit ? (isLastLevel ? 'gameComplete' : 'levelComplete') : 'playing',
    });
  },

  nextLevel: () => {
    const { level } = get();
    const next = level + 1;
    if (next >= LEVELS.length) {
      set({ phase: 'gameComplete' });
    } else {
      set({ phase: 'playing', level: next, ...buildLevel(next) });
    }
  },

  reset: () => {
    set({ phase: 'idle', level: 0, totalStarsCollected: 0 });
  },
}));
