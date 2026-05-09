import { makePersistStore } from '@/lib/stores/createStore';
import type { PhaseDead } from '@/lib/types';

interface DinoState {
  phase: PhaseDead;
  score: number;
  best: number;
}

interface DinoActions {
  startGame: () => void;
  setScore: (score: number) => void;
  setGameOver: (score: number) => void;
  resetToMenu: () => void;
}

export const useDinoRunnerStore = makePersistStore<DinoState & DinoActions>(
  'DinoRunnerStore',
  'dino-runner-best',
  (set, get) => ({
    phase: 'menu',
    score: 0,
    best: 0,
    startGame: () => set({ phase: 'playing', score: 0 }, false, 'dino/startGame'),
    setScore: (score) => set({ score }, false, 'dino/setScore'),
    setGameOver: (score) => {
      const best = Math.max(score, get().best);
      set({ phase: 'dead', score, best }, false, 'dino/gameOver');
    },
    resetToMenu: () => set({ phase: 'menu' }, false, 'dino/resetToMenu'),
  }),
  { partialize: (s) => ({ best: s.best }) },
);
