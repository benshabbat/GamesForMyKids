'use client';

import { useBaseGame } from "@/hooks/shared/game-state/useBaseGame";
import { BaseGameItem, GameType } from "@/lib/types/core/base";
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';

const DIFFICULTY_BASE_COUNT: Record<string, number> = { easy: 3, medium: 4, hard: 6 };

export function useGenericGame(items: BaseGameItem[], gameType: GameType) {
  const { difficulty } = useGameDifficulty();
  const pronunciations = items.reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = item.hebrew;
    return acc;
  }, {});

  return useBaseGame({
    gameType,
    items,
    pronunciations,
    gameConstants: {
      BASE_COUNT: DIFFICULTY_BASE_COUNT[difficulty] ?? 4,
      INCREMENT: 1,
      LEVEL_THRESHOLD: 3,
    },
  });
}
