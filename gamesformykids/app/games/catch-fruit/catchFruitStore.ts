import { makeStore } from '@/lib/stores/createStore';
import type { PhaseResult } from '@/lib/types';

export const GAME_DURATION = 45;

interface CatchFruitState {
  phase: PhaseResult;
  score: number;
  best: number;
  lives: number;
  timeLeft: number;
}

interface CatchFruitActions {
  startGame: () => void;
  setScore: (score: number) => void;
  setLives: (lives: number) => void;
  setTimeLeft: (timeLeft: number) => void;
  setGameResult: (score: number, lives: number, timeLeft: number) => void;
}

export const useCatchFruitStore = makeStore<CatchFruitState & CatchFruitActions>(
  'CatchFruitStore',
  (set, get) => ({
    phase: 'menu',
    score: 0,
    best: 0,
    lives: 3,
    timeLeft: GAME_DURATION,
    startGame: () => set({ phase: 'playing', score: 0, lives: 3, timeLeft: GAME_DURATION }, false, 'catchFruit/startGame'),
    setScore: (score) => set({ score }, false, 'catchFruit/setScore'),
    setLives: (lives) => set({ lives }, false, 'catchFruit/setLives'),
    setTimeLeft: (timeLeft) => set({ timeLeft }, false, 'catchFruit/setTimeLeft'),
    setGameResult: (score, lives, timeLeft) => {
      const best = Math.max(score, get().best);
      set({ phase: 'result', score, best, lives, timeLeft }, false, 'catchFruit/gameResult');
    },
  }),
);
