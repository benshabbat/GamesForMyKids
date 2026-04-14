'use client';

import { useEffect } from 'react';
import { useFeaturedGameStore } from '@/lib/stores/featuredGameStore';

export function useFeaturedGameContent() {
  const featuredGame = useFeaturedGameStore((s) => s.featuredGame);
  const isInitialized = useFeaturedGameStore((s) => s.isInitialized);
  const initialize = useFeaturedGameStore((s) => s.initialize);

  // בחר משחק יומי — רק בצד הלקוח
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  return { featuredGame };
}
