'use client';
import { useMemo } from 'react';
import { useProgressTrackingStore } from '@/lib/stores/progressTrackingStore';
import type { LearningPath } from '@/lib/constants/learningPaths';

const MASTERY_THRESHOLD = 0.7;

export interface LearningPathProgress {
  completedGameIds: Set<string>;
  completedCount: number;
  totalCount: number;
  /** First not-yet-mastered gameId in path order, or null once the whole path is complete. */
  nextGameId: string | null;
}

/** A game counts as mastered for a path once any session hit >=70% accuracy — same bar as the daily-challenge badge. */
export function useLearningPathProgress(path: LearningPath | undefined): LearningPathProgress {
  const allSessions = useProgressTrackingStore((s) => s.allSessions);

  return useMemo(() => {
    if (!path) return { completedGameIds: new Set<string>(), completedCount: 0, totalCount: 0, nextGameId: null };
    const completedGameIds = new Set<string>();
    for (const gameId of path.gameIds) {
      const mastered = allSessions.some(
        (s) => s.gameType === gameId && s.totalAnswers > 0 && s.correctAnswers / s.totalAnswers >= MASTERY_THRESHOLD,
      );
      if (mastered) completedGameIds.add(gameId);
    }
    const nextGameId = path.gameIds.find((id) => !completedGameIds.has(id)) ?? null;
    return {
      completedGameIds,
      completedCount: completedGameIds.size,
      totalCount: path.gameIds.length,
      nextGameId,
    };
  }, [allSessions, path]);
}
