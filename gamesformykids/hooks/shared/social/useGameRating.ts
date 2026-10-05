'use client';
import { useState, useEffect } from 'react';
import { getLocalDateKey } from '@/lib/utils/engagement/localDate';

type Rating = 'up' | 'down';

function ratingKey(gameType: string): string {
  const date = getLocalDateKey();
  return `gfk_rating_${gameType}_${date}`;
}

export function useGameRating(gameType: string | null | undefined) {
  const [rating, setRating] = useState<Rating | null>(null);

  useEffect(() => {
    if (!gameType) return;
    const saved = localStorage.getItem(ratingKey(gameType));
    if (saved === 'up' || saved === 'down') setRating(saved);
  }, [gameType]);

  const rate = (value: Rating) => {
    if (!gameType || rating) return;
    localStorage.setItem(ratingKey(gameType), value);
    setRating(value);
  };

  return { rating, rate };
}
