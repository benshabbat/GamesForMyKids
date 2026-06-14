'use client';

import { useEffect } from 'react';
import { useGameTypeStore } from '@/lib/stores/gameTypeStore';
import { trackGameVisit } from '@/lib/utils/engagement/trackGameVisit';

export function GameEngagementSync() {
  const gameType = useGameTypeStore((s) => s.currentGameType);

  useEffect(() => {
    if (gameType) trackGameVisit(gameType);
  }, [gameType]);

  return null;
}
