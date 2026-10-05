'use client';
import { useState, useEffect } from 'react';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';
import { getLocalDateKey, getLocalDayIndex } from '@/lib/utils/engagement/localDate';

const DONE_KEY = 'gfk_daily_challenge_done';

function getTodayKey(): string {
  return getLocalDateKey();
}

export function useDailyChallenge() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const today = getTodayKey();
    setDone(localStorage.getItem(DONE_KEY) === today);

    const allGames = GamesRegistry.getAllGameRegistrations().filter((g) => g.available);
    if (allGames.length === 0) return;
    const dayIndex = getLocalDayIndex();
    setGameId(allGames[dayIndex % allGames.length]?.id ?? null);
  }, []);

  const markDone = () => {
    localStorage.setItem(DONE_KEY, getTodayKey());
    setDone(true);
  };

  return { gameId, done, markDone };
}
