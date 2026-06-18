'use client';
import { useState, useEffect } from 'react';
import { GAME_ITEMS_MAP } from '@/lib/constants/gameItemsMap';
import { speak } from '@/lib/utils/speech/speaker';
import type { BaseGameItem } from '@/lib/types/core/base';

const STORAGE_KEY = 'votd_last_shown';

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function pickWordOfTheDay(): BaseGameItem | null {
  const allItems: BaseGameItem[] = [];
  const seen = new Set<string>();

  for (const items of Object.values(GAME_ITEMS_MAP)) {
    if (!items) continue;
    for (const item of items) {
      if (item.hebrew && !seen.has(item.name)) {
        seen.add(item.name);
        allItems.push(item);
      }
    }
  }

  if (allItems.length === 0) return null;
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  return allItems[dayIndex % allItems.length] ?? null;
}

export function useVocabularyOfTheDay() {
  const [word, setWord] = useState<BaseGameItem | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const today = getTodayKey();
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (lastShown === today) return;

    const item = pickWordOfTheDay();
    if (!item) return;

    localStorage.setItem(STORAGE_KEY, today);
    setWord(item);
    setVisible(true);

    const speakTimer = setTimeout(() => {
      speak(`המילה של היום היא ${item.hebrew}`).catch(() => {});
    }, 600);

    const hideTimer = setTimeout(() => setVisible(false), 4600);

    return () => {
      clearTimeout(speakTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return { word, visible, dismiss: () => setVisible(false) };
}
