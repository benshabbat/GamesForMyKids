/**
 * ===============================================
 * Balloon Pop Store — Zustand
 * ===============================================
 * Pure state + actions only.
 * Timer / rAF lifecycle is managed by useBalloonPopLoop.ts.
 */

import { makePersistStore } from '@/lib/stores/createStore';
import type { PhaseResult as Phase } from '@/lib/types';

// ── Constants ──────────────────────────────────────────────
export const GAME_DURATION = 40;
export const BALLOON_COLORS: [string, string][] = [
  ['#EF4444', '#B91C1C'],
  ['#F97316', '#C2410C'],
  ['#EAB308', '#A16207'],
  ['#22C55E', '#15803D'],
  ['#3B82F6', '#1D4ED8'],
  ['#EC4899', '#BE185D'],
  ['#8B5CF6', '#6D28D9'],
  ['#14B8A6', '#0F766E'],
];
export const BOMB_CHANCE = 0.12;

// ── Types ──────────────────────────────────────────────────
export interface Balloon {
  id: number;
  x: number;
  y: number;
  r: number;
  vy: number;
  color: [string, string];
  isBomb: boolean;
  popped: boolean;
  popAnim: number;
}

// ── State ──────────────────────────────────────────────────
export interface BalloonPopState {
  phase: Phase;
  score: number;
  best: number;
  lives: number;
  timeLeft: number;
  balloons: Balloon[];
  /** Canvas width — set by BalloonGameArea via setDimensions */
  W: number;
  /** Canvas height — set by BalloonGameArea via setDimensions */
  H: number;
}

// ── Actions ────────────────────────────────────────────────
export interface BalloonPopActions {
  /** Sets initial playing state. Loop lifecycle is handled by useBalloonPopLoop. */
  startGame: () => void;
  /** Called by the loop hook when time runs out or lives hit 0. */
  endGame: () => void;
  pop: (id: number) => void;
  setDimensions: (w: number, h: number) => void;
}

// ── Store ──────────────────────────────────────────────────
export const useBalloonPopStore = makePersistStore<BalloonPopState & BalloonPopActions>(
  'BalloonPopStore',
  'balloon-pop-best',
  (set, get) => ({
    phase: 'menu',
    score: 0,
    best: 0,
    lives: 5,
    timeLeft: GAME_DURATION,
    balloons: [],
    W: 350,
    H: 560,

    setDimensions: (W, H) => set({ W, H }, false, 'balloon/setDimensions'),

    startGame: () =>
      set(
        { phase: 'playing', score: 0, lives: 5, timeLeft: GAME_DURATION, balloons: [] },
        false,
        'balloon/startGame',
      ),

    endGame: () => {
      const { score, best } = get();
      set({ phase: 'result', best: Math.max(best, score) }, false, 'balloon/endGame');
    },

    pop: (id) => {
      const { phase, balloons, lives, score } = get();
      if (phase !== 'playing') return;
      const b = balloons.find(b => b.id === id);
      if (!b || b.popped) return;

      if (b.isBomb) {
        const newLives = Math.max(0, lives - 2);
        const newBalloons = balloons.map(x => x.id === id ? { ...x, popped: true } : x);
        set({ balloons: newBalloons, lives: newLives }, false, 'balloon/bomb');
        if (newLives <= 0) get().endGame();
      } else {
        set({
          balloons: balloons.map(x => x.id === id ? { ...x, popped: true } : x),
          score: score + 10,
        }, false, 'balloon/pop');
      }
    },
  }),
  { partialize: (s) => ({ best: s.best }) },
);
