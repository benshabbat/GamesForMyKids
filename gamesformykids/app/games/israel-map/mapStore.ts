'use client';
import { create } from 'zustand';
import { LOCATIONS, type Location } from './data/locations';
import { shuffleArray } from '@/lib/utils/game/cardUtils';

export type Phase = 'menu' | 'playing' | 'result';

const QUESTIONS_PER_GAME = 10;

interface State {
  phase: Phase;
  level: 1 | 2;
  queue: Location[];
  current: Location | null;
  foundIds: string[];
  score: number;
  /** Locations completed so far (progress) — wrong taps do not count, they only retry. */
  total: number;
  /** True once the current location has had a wrong tap, so it no longer scores. */
  missedCurrent: boolean;
  lastResult: 'correct' | 'wrong' | null;
}

interface Actions {
  startGame: (level: 1 | 2) => void;
  checkTap: (svgX: number, svgY: number) => boolean;
  /** The current location was tapped correctly: score it (first try only) and mark it done. */
  markFound: () => void;
  /** The current location was tapped wrongly: the child retries the same location. */
  markMissed: () => void;
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
  missedCurrent: false,
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
      missedCurrent: false,
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

  markFound: () =>
    set((s) => {
      if (!s.current) return s;
      return {
        score: s.missedCurrent ? s.score : s.score + 1,
        total: s.total + 1,
        foundIds: [...s.foundIds, s.current.id],
        lastResult: 'correct',
      };
    }),

  markMissed: () => set({ missedCurrent: true, lastResult: 'wrong' }),

  nextLocation: () => {
    const { queue, total } = get();
    if (total >= QUESTIONS_PER_GAME || queue.length === 0) {
      set({ phase: 'result', current: null });
      return;
    }
    const [next, ...rest] = queue;
    set({ current: next ?? null, queue: rest, missedCurrent: false, lastResult: null });
  },

  resetGame: () =>
    set({
      phase: 'menu',
      level: 1,
      queue: [],
      current: null,
      foundIds: [],
      score: 0,
      total: 0,
      missedCurrent: false,
      lastResult: null,
    }),
}));
