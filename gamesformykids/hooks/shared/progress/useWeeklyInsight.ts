'use client';
import { useMemo } from 'react';
import { useProgressTrackingStore } from '@/lib/stores/progressTrackingStore';
import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export interface CategoryAccuracy {
  categoryKey: string;
  title: string;
  accuracy: number;
  sessionCount: number;
}

export interface WeeklyInsight {
  categories: CategoryAccuracy[];
  strongest: CategoryAccuracy;
  weakest: CategoryAccuracy;
  recommendedGameId: string;
  gamesPlayedThisWeek: number;
}

function findCategoryKey(gameType: string): string | undefined {
  return Object.entries(GAME_CATEGORIES).find(([, cat]) => cat.gameIds.includes(gameType))?.[0];
}

/** Aggregates this week's sessions into per-category accuracy, surfacing the strongest and weakest categories. */
export function useWeeklyInsight(): WeeklyInsight | null {
  const allSessions = useProgressTrackingStore((s) => s.allSessions);

  return useMemo(() => {
    const now = Date.now();
    // session.accuracy is not reliably populated on save — derive from correct/total answers instead.
    const weekSessions = allSessions.filter(
      (s) => now - new Date(s.startTime).getTime() < SEVEN_DAYS_MS && s.totalAnswers > 0,
    );
    if (weekSessions.length === 0) return null;

    const byCategory: Record<string, { correct: number; total: number; sessionCount: number }> = {};
    for (const session of weekSessions) {
      const categoryKey = findCategoryKey(session.gameType as string);
      if (!categoryKey) continue;
      const entry = byCategory[categoryKey] ?? { correct: 0, total: 0, sessionCount: 0 };
      entry.correct += session.correctAnswers;
      entry.total += session.totalAnswers;
      entry.sessionCount += 1;
      byCategory[categoryKey] = entry;
    }

    const categories: CategoryAccuracy[] = Object.entries(byCategory).map(
      ([categoryKey, { correct, total, sessionCount }]) => ({
        categoryKey,
        title: GAME_CATEGORIES[categoryKey]!.title,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
        sessionCount,
      }),
    );
    if (categories.length === 0) return null;

    const strongest = categories.reduce((best, c) => (c.accuracy > best.accuracy ? c : best), categories[0]!);
    const weakest = categories.reduce((worst, c) => (c.accuracy < worst.accuracy ? c : worst), categories[0]!);
    const recommendedGameId = GAME_CATEGORIES[weakest.categoryKey]!.gameIds[0]!;

    return { categories, strongest, weakest, recommendedGameId, gamesPlayedThisWeek: weekSessions.length };
  }, [allSessions]);
}
