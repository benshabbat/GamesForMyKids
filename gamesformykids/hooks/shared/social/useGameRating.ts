'use client';
import { useState, useEffect } from 'react';
import { safeGetItem, safeSetItem } from '@/lib/utils/safeStorage';

type Rating = 'up' | 'down';

function ratingKey(gameType: string): string {
  const date = new Date().toISOString().slice(0, 10);
  return `gfk_rating_${gameType}_${date}`;
}

export function useGameRating(gameType: string | null | undefined) {
  const [rating, setRating] = useState<Rating | null>(null);

  useEffect(() => {
    if (!gameType) return;
    const saved = safeGetItem(ratingKey(gameType));
    if (saved === 'up' || saved === 'down') setRating(saved);
  }, [gameType]);

  const rate = (value: Rating) => {
    if (!gameType || rating) return;
    safeSetItem(ratingKey(gameType), value);
    setRating(value);
  };

  return { rating, rate };
}
