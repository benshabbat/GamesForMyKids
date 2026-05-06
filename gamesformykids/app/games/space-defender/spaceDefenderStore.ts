import { makeStore } from '@/lib/stores/createStore';
import type { PhaseResult } from '@/lib/types';

export const GAME_DURATION = 60;

interface SpaceDefenderState {
  phase: PhaseResult;
  score: number;
  best: number;
  lives: number;
  timeLeft: number;
}

interface SpaceDefenderActions {
  startGame: () => void;
  setScore: (score: number) => void;
  setLives: (lives: number) => void;
  setTimeLeft: (timeLeft: number) => void;
  setGameResult: (score: number, lives: number, timeLeft: number) => void;
}

export const useSpaceDefenderStore = makeStore<SpaceDefenderState & SpaceDefenderActions>(
  'SpaceDefenderStore',
  (set, get) => ({
    phase: 'menu',
    score: 0,
    best: 0,
    lives: 3,
    timeLeft: GAME_DURATION,
    startGame: () => set({ phase: 'playing', score: 0, lives: 3, timeLeft: GAME_DURATION }, false, 'spaceDefender/startGame'),
    setScore: (score) => set({ score }, false, 'spaceDefender/setScore'),
    setLives: (lives) => set({ lives }, false, 'spaceDefender/setLives'),
    setTimeLeft: (timeLeft) => set({ timeLeft }, false, 'spaceDefender/setTimeLeft'),
    setGameResult: (score, lives, timeLeft) => {
      const best = Math.max(score, get().best);
      set({ phase: 'result', score, best, lives, timeLeft }, false, 'spaceDefender/gameResult');
    },
  }),
);
