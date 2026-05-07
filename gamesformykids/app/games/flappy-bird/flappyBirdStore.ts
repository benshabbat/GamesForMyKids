import { makePersistStore } from '@/lib/stores/createStore';
import type { PhaseDead } from '@/lib/types';

interface FlappyState {
  phase: PhaseDead;
  score: number;
  best: number;
}

interface FlappyActions {
  setPhase: (phase: PhaseDead) => void;
  setScore: (score: number) => void;
  endGame: (score: number) => void;
}

export const useFlappyBirdStore = makePersistStore<FlappyState & FlappyActions>(
  'FlappyBirdStore',
  'flappy-bird-best',
  (set, get) => ({
    phase: 'menu',
    score: 0,
    best: 0,
    setPhase: (phase) => set({ phase }, false, 'flappy/setPhase'),
    setScore: (score) => set({ score }, false, 'flappy/setScore'),
    endGame: (score) => {
      const best = Math.max(score, get().best);
      set({ phase: 'dead', score, best }, false, 'flappy/endGame');
    },
  }),
  { partialize: (s) => ({ best: s.best }) },
);
