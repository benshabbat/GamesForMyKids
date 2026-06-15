'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecentGames, type RecentGameEntry } from '@/lib/utils/engagement/trackGameVisit';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';

interface RecentItem {
  gameType: string;
  title: string;
  emoji: string;
  href: string;
}

export default function RecentlyPlayedRow() {
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    const recent: RecentGameEntry[] = getRecentGames();
    const resolved = recent
      .map((entry) => {
        const reg = GamesRegistry.getGameById(entry.gameType);
        if (!reg) return null;
        return { gameType: entry.gameType, title: reg.title, emoji: reg.emoji, href: reg.href };
      })
      .filter((x): x is RecentItem => x !== null);
    setItems(resolved);
  }, []);

  if (items.length === 0) return null;

  return (
    <div dir="rtl" className="mx-4 mt-3">
      <p className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-2 px-1">🕓 שיחקת לאחרונה</p>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max pb-1">
          {items.map((item) => (
            <Link
              key={item.gameType}
              href={item.href}
              className="flex flex-col items-center gap-1 bg-white dark:bg-gray-800 rounded-2xl shadow px-4 py-3 hover:shadow-md active:scale-95 transition-transform text-center min-w-[80px]"
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 leading-tight max-w-[72px] line-clamp-2">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
