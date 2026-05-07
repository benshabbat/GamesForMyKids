'use client';

import { useBaseGame } from "@/hooks/shared/game-state/useBaseGame";
import { BaseGameItem, GameType } from "@/lib/types/core/base";

export function useGenericGame(items: BaseGameItem[], gameType: GameType) {
  const pronunciations = items.reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = item.hebrew;
    return acc;
  }, {});

  return useBaseGame({
    gameType,
    items,
    pronunciations,
    gameConstants: {
      BASE_COUNT: 4,
      INCREMENT: 1,
      LEVEL_THRESHOLD: 3,
    },
  });
}
