'use client';

import { useEffect } from 'react';
import { useFeaturedGameStore } from '@/lib/stores/featuredGameStore';

export function useDailyGame() {
  const dailyGame = useFeaturedGameStore((s) => s.featuredGame);
  const isInitialized = useFeaturedGameStore((s) => s.isInitialized);
  const initialize = useFeaturedGameStore((s) => s.initialize);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  return { dailyGame, isClient: isInitialized };
}
