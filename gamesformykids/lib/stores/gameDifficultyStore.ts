import { makePersistStore } from '@/lib/stores/createStore';
import type { DifficultyLevel } from '@/lib/types/games/base';

interface GameDifficultyState {
  difficulty: DifficultyLevel;
  setDifficulty: (difficulty: DifficultyLevel) => void;
}

export const useGameDifficulty = makePersistStore<GameDifficultyState>(
  'GameDifficultyStore',
  'gfk-difficulty',
  (set) => ({
    difficulty: 'medium',
    setDifficulty: (difficulty) => set({ difficulty }, false, 'difficulty/set'),
  }),
);
