import { makePersistStore } from '@/lib/stores/createStore';
import type { PhaseDead } from '@/lib/types';

interface FroggerState {
  phase: PhaseDead;
  score: number;
  best: number;
  lives: number;
}

interface FroggerActions {
  startPlaying: () => void;
  setScore: (score: number) => void;
  endGame: (score: number) => void;
}

export const useFroggerStore = makePersistStore<FroggerState & FroggerActions>(
  'FroggerStore',
  'frogger-best',
  (set, get) => ({
    phase: 'menu',
    score: 0,
    best: 0,
    lives: 3,
    startPlaying: () => set({ phase: 'playing', score: 0, lives: 3 }, false, 'frogger/startPlaying'),
    setScore: (score) => set({ score }, false, 'frogger/setScore'),
    endGame: (score) => {
      const best = Math.max(score, get().best);
      set({ phase: 'dead', lives: 0, score, best }, false, 'frogger/endGame');
    },
  }),
  { partialize: (s) => ({ best: s.best }) },
);
