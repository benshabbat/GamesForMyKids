import { makePersistStore } from '@/lib/stores/createStore';
import type { PhaseResult } from '@/lib/types';

export interface CanvasGameState {
  phase: PhaseResult;
  score: number;
  best: number;
  lives: number;
  timeLeft: number;
}

export interface CanvasGameActions {
  startGame: () => void;
  setScore: (score: number) => void;
  setLives: (lives: number) => void;
  setTimeLeft: (timeLeft: number) => void;
  setGameResult: (score: number, lives: number, timeLeft: number) => void;
}

/**
 * Factory for canvas games that share the standard phase/score/best/lives/timeLeft shape.
 * Persists only `best` to localStorage so high scores survive page reloads.
 */
export function makeCanvasGameStore(
  name: string,
  persistKey: string,
  gameDuration: number,
) {
  return makePersistStore<CanvasGameState & CanvasGameActions>(
    name,
    persistKey,
    (set, get) => ({
      phase: 'menu',
      score: 0,
      best: 0,
      lives: 3,
      timeLeft: gameDuration,
      startGame: () => set({ phase: 'playing', score: 0, lives: 3, timeLeft: gameDuration }, false, 'startGame'),
      setScore: (score) => set({ score }, false, 'setScore'),
      setLives: (lives) => set({ lives }, false, 'setLives'),
      setTimeLeft: (timeLeft) => set({ timeLeft }, false, 'setTimeLeft'),
      setGameResult: (score, lives, timeLeft) => {
        const best = Math.max(score, get().best);
        set({ phase: 'result', score, best, lives, timeLeft }, false, 'gameResult');
      },
    }),
    { partialize: (s) => ({ best: s.best }) },
  );
}
