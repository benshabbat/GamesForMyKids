'use client';
import { useState, useEffect, useRef } from 'react';
import { useProgressTrackingStore } from '@/lib/stores/progressTrackingStore';
import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';

const TROPHY_LS_KEY = 'gfk_category_trophies';

function getTrophiedCategories(): Set<string> {
  try {
    const raw = localStorage.getItem(TROPHY_LS_KEY);
    return new Set<string>(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set<string>();
  }
}

function markTrophied(categoryKey: string) {
  try {
    const existing = getTrophiedCategories();
    existing.add(categoryKey);
    localStorage.setItem(TROPHY_LS_KEY, JSON.stringify([...existing]));
  } catch {
    // localStorage unavailable
  }
}

/**
 * Detects when a game completion finishes a full category for the first time.
 * Returns `{ title }` of the completed category on the first completion — null otherwise.
 * Each category can only trigger a trophy once (stored in localStorage).
 */
export function useCategoryCompletion(gameType: string | undefined): { title: string } | null {
  const allSessions = useProgressTrackingStore(s => s.allSessions);
  const [trophy, setTrophy] = useState<{ title: string } | null>(null);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (checkedRef.current || !gameType) return;
    checkedRef.current = true;

    const categoryEntry = Object.entries(GAME_CATEGORIES).find(([, cat]) =>
      cat.gameIds.includes(gameType)
    );
    if (!categoryEntry) return;
    const [categoryKey, category] = categoryEntry;

    if (getTrophiedCategories().has(categoryKey)) return;

    const allRegistrations = GamesRegistry.getAllGameRegistrations();
    const availableIds = new Set(
      allRegistrations
        .filter(g => g.available && category.gameIds.includes(g.id))
        .map(g => g.id)
    );
    if (availableIds.size === 0) return;

    const playedIds = new Set(allSessions.map(s => s.gameType as string));
    const allPlayed = [...availableIds].every(id => playedIds.has(id));

    if (allPlayed) {
      markTrophied(categoryKey);
      setTrophy({ title: category.title });
    }
  }, [gameType, allSessions]);

  return trophy;
}
