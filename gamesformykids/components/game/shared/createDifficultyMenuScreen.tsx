'use client';

import GameMenuCard from './GameMenuCard';
import { DifficultyPicker } from './DifficultyPicker';
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';
import type { DifficultyLevel } from '@/lib/types/games/base';

export interface DifficultyMenuScreenConfig {
  emoji: string;
  title: string;
  description: string;
  gradientClass: string;
  buttonClass?: string;
  startLabel?: string;
  hintFn: (difficulty: DifficultyLevel) => string;
}

export function createDifficultyMenuScreen(
  config: DifficultyMenuScreenConfig,
  useGameHook: () => { startGame: () => void; best?: number },
) {
  function DifficultyMenuScreen() {
    const { startGame, best } = useGameHook();
    const { difficulty } = useGameDifficulty();
    return (
      <GameMenuCard
        {...config}
        hint={config.hintFn(difficulty)}
        onStart={startGame}
        {...(best !== undefined && { best })}
      >
        <DifficultyPicker />
      </GameMenuCard>
    );
  }
  DifficultyMenuScreen.displayName = `DifficultyMenuScreen(${config.title})`;
  return DifficultyMenuScreen;
}
