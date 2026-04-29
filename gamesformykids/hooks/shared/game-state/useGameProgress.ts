'use client'

/**
 * useGameProgress — aggregates progress state from useGameProgressStore
 * and exposes a stable API with computed helpers.
 */

import { useCallback } from 'react'
import { useGameProgressStore } from '@/lib/stores/gameProgressStore'

export type { GameProgressState as GameProgress } from '@/lib/stores/gameProgressStore'

export function useGameProgress(maxLevel = 10, pointsPerCorrect = 10) {
  const store = useGameProgressStore()

  const incrementScore = useCallback(
    (points = pointsPerCorrect) => store.incrementScore(points),
    // intentionally omit `store` — Zustand store actions are stable references
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pointsPerCorrect],
  )

  const incrementLevel = useCallback(
    () => store.incrementLevel(maxLevel),
    // intentionally omit `store` — Zustand store actions are stable references
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxLevel],
  )

  const getAccuracy = useCallback(() => {
    const s = useGameProgressStore.getState()
    return s.totalQuestions === 0 ? 0 : (s.correctAnswers / s.totalQuestions) * 100
  }, [])

  const getAverageTimePerQuestion = useCallback(() => {
    const s = useGameProgressStore.getState()
    return s.totalQuestions === 0 ? 0 : s.timeSpent / s.totalQuestions
  }, [])

  const getProgressPercentage = useCallback(() => {
    return (useGameProgressStore.getState().level / maxLevel) * 100
    // reads live state via getState() — no reactive dependency needed beyond maxLevel
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxLevel])

  return {
    progress: {
      score: store.score,
      level: store.level,
      attempts: store.attempts,
      correctAnswers: store.correctAnswers,
      totalQuestions: store.totalQuestions,
      timeSpent: store.timeSpent,
      startTime: store.startTime,
      streakCount: store.streakCount,
      bestStreak: store.bestStreak,
    },
    incrementScore,
    incrementLevel,
    recordAttempt: store.recordAttempt,
    resetProgress: store.resetProgress,
    pauseTimer: store.pauseTimer,
    resumeTimer: store.resumeTimer,
    getAccuracy,
    getAverageTimePerQuestion,
    getProgressPercentage,
    isGameActive: store.isGameActive,
    setGameActive: store.setGameActive,
  }
}
