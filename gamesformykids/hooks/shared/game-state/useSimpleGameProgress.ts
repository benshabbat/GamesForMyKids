'use client'

/**
 * useSimpleGameProgress — lightweight progress hook backed by useGameProgressStore.
 */

import { useCallback } from 'react'
import {
  SimpleGameProgress,
  SimpleGameProgressContextValue,
} from '@/lib/types/contexts/simple-game-progress'
import { useGameProgressStore } from '@/lib/stores/gameProgressStore'

export function useSimpleGameProgress(
  maxLevel = 10,
  pointsPerCorrect = 10,
): SimpleGameProgressContextValue {
  const store = useGameProgressStore()

  const incrementScore = useCallback(
    (points: number = pointsPerCorrect) => store.incrementScore(points),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pointsPerCorrect],
  )

  const incrementLevel = useCallback(
    () => store.incrementLevel(maxLevel),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxLevel],
  )

  const recordAttempt = useCallback(
    (isCorrect: boolean) => store.recordAttempt(isCorrect, pointsPerCorrect),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pointsPerCorrect],
  )

  const updateProgress = useCallback(
    (updates: Partial<SimpleGameProgress>) => store.updateProgress(updates),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const getAccuracy = useCallback(() => {
    const s = useGameProgressStore.getState()
    return s.totalQuestions === 0 ? 0 : (s.correctAnswers / s.totalQuestions) * 100
  }, [])

  const getAverageTimePerQuestion = useCallback(() => {
    const s = useGameProgressStore.getState()
    return s.totalQuestions === 0 ? 0 : s.timeSpent / s.totalQuestions
  }, [])

  const progress: SimpleGameProgress = {
    score: store.score,
    level: store.level,
    attempts: store.attempts,
    correctAnswers: store.correctAnswers,
    totalQuestions: store.totalQuestions,
    timeSpent: store.timeSpent,
    startTime: store.startTime,
    streakCount: store.streakCount,
    bestStreak: store.bestStreak,
  }

  return {
    progress,
    incrementScore,
    incrementLevel,
    recordAttempt,
    resetProgress: store.resetProgress,
    updateProgress,
    getAccuracy,
    getAverageTimePerQuestion,
  }
}
