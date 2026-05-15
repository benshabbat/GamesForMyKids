'use client';

import { createDifficultyMenuScreen } from '@/components/game/shared/createDifficultyMenuScreen';
import { useMemoryStore } from '../stores/useMemoryStore';
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';
import { MEMORY_GAME_CONSTANTS } from '@/lib/constants';
import type { DifficultyLevel } from '@/lib/types/games/base';

function useMemoryStartGame() {
  const { initializeGame } = useMemoryStore();
  const { difficulty } = useGameDifficulty();
  return {
    startGame: () => initializeGame(difficulty),
  };
}

export default createDifficultyMenuScreen(
  {
    emoji: '🧠',
    title: 'משחק הזיכרון',
    description: 'מצאו את הזוגות הזהים על הלוח!',
    gradientClass: 'from-pink-100 via-purple-100 to-indigo-200',
    hintFn: (d: DifficultyLevel) => `${MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[d].pairs} זוגות`,
  },
  useMemoryStartGame,
);
