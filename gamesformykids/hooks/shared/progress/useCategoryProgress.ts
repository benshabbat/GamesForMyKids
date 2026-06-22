'use client';
import { useMemo } from 'react';
import { useProgressTrackingStore } from '@/lib/stores/progressTrackingStore';
import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';

/** Returns a map of categoryKey → number of unique games played in that category */
export function useCategoryProgress(): Record<string, number> {
  const allSessions = useProgressTrackingStore(s => s.allSessions);

  return useMemo(() => {
    const playedByGame = new Set(allSessions.map(s => s.gameType as string));
    const result: Record<string, number> = {};
    for (const [key, cat] of Object.entries(GAME_CATEGORIES)) {
      const count = cat.gameIds.filter(id => playedByGame.has(id)).length;
      if (count > 0) result[key] = count;
    }
    return result;
  }, [allSessions]);
}
