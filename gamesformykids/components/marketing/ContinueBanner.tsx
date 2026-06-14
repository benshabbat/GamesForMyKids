'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { getLastPlayed, type LastPlayedData } from '@/lib/utils/engagement/trackGameVisit';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';

const DISMISS_KEY = 'gfk_dismissed_continue';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function ContinueBanner() {
  const [data, setData] = useState<LastPlayedData | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const sessionDismissed = sessionStorage.getItem(DISMISS_KEY);
    if (sessionDismissed) return;
    const last = getLastPlayed();
    if (!last) return;
    if (Date.now() - last.timestamp > MAX_AGE_MS) return;
    setData(last);
  }, []);

  if (!data || dismissed) return null;

  const reg = GamesRegistry.getGameById(data.gameType);
  if (!reg) return null;

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  };

  return (
    <div dir="rtl" className="mx-4 mt-3 rounded-2xl bg-gradient-to-l from-purple-500 to-indigo-600 text-white shadow-lg flex items-center gap-3 px-4 py-3">
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
