'use client';
import { useState, useEffect } from 'react';
import { getMasteryStars } from '@/lib/utils/engagement/masteryStars';

export function useMasteryStars(gameId: string): number {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    setStars(getMasteryStars(gameId));
  }, [gameId]);

  return stars;
}
