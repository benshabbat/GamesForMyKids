import { makePersistStore } from '@/lib/stores/createStore';
import type { PhaseWonDead } from '@/lib/types';

interface BrickBreakerState {
  phase: PhaseWonDead;
  score: number;
  best: number;
  lives: number;
  level: number;
}

interface BrickBreakerActions {
  startLevel: (opts: { score: number; lives: number; level: number }) => void;
  setScore: (score: number) => void;
  setLives: (lives: number) => void;
  setGameOver: (score: number, level: number) => void;
  setWon: (score: number, lives: number, level: number) => void;
}

export const useBrickBreakerStore = makePersistStore<BrickBreakerState & BrickBreakerActions>(
  'BrickBreakerStore',
  'brick-breaker-best',
  (set, get) => ({
    phase: 'menu',
    score: 0,
    best: 0,
    lives: 3,
    level: 1,
    startLevel: ({ score, lives, level }) =>
      set({ phase: 'playing', score, lives, level }, false, 'brickBreaker/startLevel'),
    setScore: (score) => set({ score }, false, 'brickBreaker/setScore'),
    setLives: (lives) => set({ lives }, false, 'brickBreaker/setLives'),
    setGameOver: (score, level) => {
      const best = Math.max(score, get().best);
      set({ phase: 'dead', score, best, lives: 0, level }, false, 'brickBreaker/gameOver');
    },
    setWon: (score, lives, level) => {
      const best = Math.max(score, get().best);
      set({ phase: 'won', score, best, lives, level }, false, 'brickBreaker/won');
    },
  }),
  { partialize: (s) => ({ best: s.best }) },
);
