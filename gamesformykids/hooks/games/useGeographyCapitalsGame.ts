'use client';

import { useGameTypeStore } from '@/lib/stores/gameTypeStore';
import { useBaseGame } from '@/hooks/shared/game-state/useBaseGame';
import type { BaseGameItem } from '@/lib/types/core/base';

/**
 * Hook for the geography-capitals game.
 * Reads items from the store (loaded server-side) and builds a pronunciation map
 * that speaks the country name (item.plural) instead of the capital answer (item.hebrew).
 */
export function useGeographyCapitalsGame(): ReturnType<typeof useBaseGame> {
  const items = useGameTypeStore((s) => s.gameItems) as BaseGameItem[];
  const pronunciations = (items ?? []).reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = item.plural ?? item.hebrew;
    return acc;
  }, {});
  return useBaseGame({
    gameType: 'geography-capitals',
    items: items ?? [],
    pronunciations,
    gameConstants: { BASE_COUNT: 4, INCREMENT: 0, LEVEL_THRESHOLD: 99 },
  });
}
