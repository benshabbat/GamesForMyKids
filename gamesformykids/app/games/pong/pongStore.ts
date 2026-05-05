import { makeStore } from '@/lib/stores/createStore';
import type { PhaseResult } from '@/lib/types';

export const WIN_SCORE = 7;

interface PongState {
  phase: PhaseResult;
  playerScore: number;
  aiScore: number;
}

interface PongActions {
  startGame: () => void;
  playerScores: (score: number) => boolean;
  aiScores: (score: number) => boolean;
}

export const usePongStore = makeStore<PongState & PongActions>(
  'PongStore',
  (set) => ({
    phase: 'menu',
    playerScore: 0,
    aiScore: 0,
    startGame: () => set({ phase: 'playing', playerScore: 0, aiScore: 0 }, false, 'pong/startGame'),
    playerScores: (score) => {
      if (score >= WIN_SCORE) {
        set({ playerScore: score, phase: 'result' }, false, 'pong/playerWins');
        return true;
      }
      set({ playerScore: score }, false, 'pong/playerScores');
      return false;
    },
    aiScores: (score) => {
      if (score >= WIN_SCORE) {
        set({ aiScore: score, phase: 'result' }, false, 'pong/aiWins');
        return true;
      }
      set({ aiScore: score }, false, 'pong/aiScores');
      return false;
    },
  }),
);
