'use client';

import Link from 'next/link';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';
import { useDailyChallenge } from '@/hooks/shared/marketing/useDailyChallenge';

export default function DailyChallenge() {
  const { gameId, done, markDone } = useDailyChallenge();

  if (!gameId) return null;

  const reg = GamesRegistry.getGameById(gameId);
  if (!reg) return null;

  return (
    <div dir="rtl" className="max-w-6xl mx-auto px-4 mt-3">
      <div className="rounded-2xl bg-linear-to-l from-emerald-500 to-teal-600 text-white shadow-lg px-4 py-3">
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
              className="shrink-0 bg-white text-emerald-600 font-bold text-sm px-4 py-1.5 rounded-xl hover:bg-emerald-50 active:scale-95 transition-transform"
            >
              שחק עכשיו
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
