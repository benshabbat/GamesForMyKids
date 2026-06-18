'use client';
import { useState, useEffect } from 'react';
import { getRecentGames, type RecentGameEntry } from '@/lib/utils/engagement/trackGameVisit';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';

export interface RecentItem {
  gameType: string;
  title: string;
  emoji: string;
  href: string;
}

export function useRecentlyPlayed(): RecentItem[] {
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

  return items;
}
