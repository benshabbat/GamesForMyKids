'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';
import { useContinueBanner } from '@/hooks/shared/marketing/useContinueBanner';

export default function ContinueBanner() {
  const { data, dismissed, dismiss } = useContinueBanner();

  if (!data || dismissed) return null;

  const reg = GamesRegistry.getGameById(data.gameType);
  if (!reg) return null;

  return (
    <div dir="rtl" className="mx-4 mt-3 rounded-2xl bg-linear-to-l from-purple-500 to-indigo-600 text-white shadow-lg flex items-center gap-3 px-4 py-3">
      <span className="text-3xl">{reg.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs opacity-80 font-medium">ממשיכים מאיפה שעצרת</p>
        <p className="font-bold truncate">{reg.title}</p>
      </div>
      <Link
        href={reg.href}
        className="shrink-0 bg-white text-purple-600 font-bold text-sm px-4 py-1.5 rounded-xl hover:bg-purple-50 active:scale-95 transition-transform"
      >
        ▶ המשך
      </Link>
      <button onClick={dismiss} aria-label="סגור" className="shrink-0 opacity-70 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
