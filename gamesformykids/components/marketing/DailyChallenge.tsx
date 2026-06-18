'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';

const DONE_KEY = 'gfk_daily_challenge_done';

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyChallenge() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const today = getTodayKey();
    const storedDone = localStorage.getItem(DONE_KEY);
    setDone(storedDone === today);

    const allGames = GamesRegistry.getAllGameRegistrations().filter((g) => g.available);
    if (allGames.length === 0) return;
    const dayIndex = Math.floor(Date.now() / 86_400_000);
    const pick = allGames[dayIndex % allGames.length];
    setGameId(pick?.id ?? null);
  }, []);

  if (!gameId) return null;

  const reg = GamesRegistry.getGameById(gameId);
  if (!reg) return null;

  const markDone = () => {
    localStorage.setItem(DONE_KEY, getTodayKey());
    setDone(true);
  };

  return (
    <div dir="rtl" className="mx-4 mt-3 rounded-2xl bg-gradient-to-l from-amber-400 to-orange-500 text-white shadow-lg px-4 py-3">
      <p className="text-xs opacity-80 font-bold mb-1">🎯 אתגר יומי</p>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{reg.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="font-bold truncate">{reg.title}</p>
          <p className="text-xs opacity-80">שחק את משחק היום!</p>
        </div>
        {done ? (
          <span className="shrink-0 bg-white text-green-600 font-bold text-sm px-4 py-1.5 rounded-xl">✅ עשית!</span>
        ) : (
          <Link
            href={reg.href}
            onClick={markDone}
            className="shrink-0 bg-white text-orange-600 font-bold text-sm px-4 py-1.5 rounded-xl hover:bg-orange-50 active:scale-95 transition-transform"
          >
            שחק עכשיו
          </Link>
        )}
      </div>
    </div>
  );
}
