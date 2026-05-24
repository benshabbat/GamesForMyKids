'use client';

import { useGameTypeStore } from '@/lib/stores/gameTypeStore';
import { useBaseGame } from '@/hooks/shared/game-state/useBaseGame';
import type { BaseGameItem } from '@/lib/types/core/base';

/**
 * Hook for the geography-continents game.
 * Same as useGeographyCapitalsGame but adds uniqueByField: 'color' so that the
 * 4 wrong-answer options always come from different continents (color field = continent).
 */
export function useGeographyContinentsGame(): ReturnType<typeof useBaseGame> {
  const items = useGameTypeStore((s) => s.gameItems) as BaseGameItem[];
  const pronunciations = (items ?? []).reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = item.plural ?? item.hebrew;
    return acc;
  }, {});
  return useBaseGame({
    gameType: 'geography-continents',
    items: items ?? [],
    pronunciations,
    gameConstants: { BASE_COUNT: 4, INCREMENT: 0, LEVEL_THRESHOLD: 99 },
    uniqueByField: 'color',
  });
}
