'use client';

import { useEffect, useState } from 'react';
import { GAME_ITEMS_MAP } from '@/lib/constants/gameItemsMap';
import { speak } from '@/lib/utils/speech/speaker';
import type { BaseGameItem } from '@/lib/types/core/base';

const STORAGE_KEY = 'votd_last_shown';

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
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

export default function VocabularyOfTheDay() {
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

    // Speak after a short delay so the banner has rendered
    const speakTimer = setTimeout(() => {
      speak(`המילה של היום היא ${item.hebrew}`).catch(() => {});
    }, 600);

    const hideTimer = setTimeout(() => setVisible(false), 4600);

    return () => {
      clearTimeout(speakTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!word || !visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={() => setVisible(false)}
      className="fixed top-20 inset-x-4 z-50 mx-auto max-w-sm cursor-pointer"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 px-6 py-4 text-center animate-fade-in-up">
        <p className="text-xs text-purple-500 font-medium mb-1">המילה של היום</p>
        <p className="text-5xl mb-2">{word.emoji}</p>
        <p className="text-2xl font-bold text-purple-800">{word.hebrew}</p>
        <p className="text-xs text-gray-400 mt-2">לחץ לסגירה</p>
      </div>
    </div>
  );
}
