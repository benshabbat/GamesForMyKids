import type { Point as Pt } from '@/lib/types';

// ─── Grid ─────────────────────────────────────────────────────────────────────

export const COLS = 20;
export const ROWS = 20;
export const CELL = 20;
export const W = COLS * CELL;
export const H = ROWS * CELL;

// ─── Gameplay ─────────────────────────────────────────────────────────────────

export const EMOJIS = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍑', '🥝'];
export const SPEEDS = [180, 160, 140, 120, 100, 85, 70];

// ─── Types ────────────────────────────────────────────────────────────────────

export type Dir = 'U' | 'D' | 'L' | 'R';

export interface SnakeRefs {
  phase: string;
  snake: Pt[];
  dir: Dir;
  nextDir: Dir;
  food: Pt;
  foodEmoji: string;
  score: number;
  level: number;
  startTime: number;
  timer: ReturnType<typeof setTimeout> | number;
  raf: number;
  animFrame: number;
}

// ─── Pure helpers ─────────────────────────────────────────────────────────────

export function rnd(max: number) { return Math.floor(Math.random() * max); }
export function ptEq(a: Pt, b: Pt) { return a.x === b.x && a.y === b.y; }

export function placeFood(snake: Pt[]): Pt {
  let pt: Pt;
  do { pt = { x: rnd(COLS), y: rnd(ROWS) }; }
  while (snake.some(s => ptEq(s, pt)));
  return pt;
}

export const OPPOSITE_DIR: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
