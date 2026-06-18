'use client';
import { useState, useEffect } from 'react';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';

const DONE_KEY = 'gfk_daily_challenge_done';

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function useDailyChallenge() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const today = getTodayKey();
    setDone(localStorage.getItem(DONE_KEY) === today);

    const allGames = GamesRegistry.getAllGameRegistrations().filter((g) => g.available);
    if (allGames.length === 0) return;
    const dayIndex = Math.floor(Date.now() / 86_400_000);
    setGameId(allGames[dayIndex % allGames.length]?.id ?? null);
  }, []);

  const markDone = () => {
    localStorage.setItem(DONE_KEY, getTodayKey());
    setDone(true);
  };

  return { gameId, done, markDone };
}
