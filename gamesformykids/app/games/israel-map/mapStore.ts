'use client';
import { create } from 'zustand';
import { LOCATIONS, shuffleArray, type Location } from './data/locations';

export type Phase = 'menu' | 'playing' | 'result';

const QUESTIONS_PER_GAME = 10;

interface State {
  phase: Phase;
  level: 1 | 2;
  queue: Location[];
  current: Location | null;
  foundIds: string[];
  score: number;
  total: number;
  lastResult: 'correct' | 'wrong' | null;
}

interface Actions {
  startGame: (level: 1 | 2) => void;
  checkTap: (svgX: number, svgY: number) => boolean;
  nextLocation: () => void;
  resetGame: () => void;
}

function buildQueue(level: 1 | 2): Location[] {
  const pool = LOCATIONS.filter((l) => l.level === level);
  return shuffleArray(pool).slice(0, QUESTIONS_PER_GAME);
}

export const useMapStore = create<State & Actions>((set, get) => ({
  phase: 'menu',
  level: 1,
  queue: [],
  current: null,
  foundIds: [],
  score: 0,
  total: 0,
  lastResult: null,

  startGame: (level) => {
    const queue = buildQueue(level);
    set({
      phase: 'playing',
      level,
      queue: queue.slice(1),
      current: queue[0] ?? null,
      foundIds: [],
      score: 0,
      total: 0,
      lastResult: null,
    });
  },

  checkTap: (svgX, svgY) => {
    const { current } = get();
    if (!current) return false;
    const dx = svgX - current.x;
    const dy = svgY - current.y;
    return Math.sqrt(dx * dx + dy * dy) <= current.radius;
  },

  nextLocation: () => {
    const { queue, total } = get();
    if (total >= QUESTIONS_PER_GAME || queue.length === 0) {
      set({ phase: 'result', current: null });
      return;
    }
    const [next, ...rest] = queue;
    set({ current: next ?? null, queue: rest, lastResult: null });
  },

  resetGame: () =>
    set({
      phase: 'menu',
      queue: [],
      current: null,
      foundIds: [],
      score: 0,
      total: 0,
      lastResult: null,
    }),
}));
