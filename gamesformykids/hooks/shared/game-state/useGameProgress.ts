'use client'

/**
 * useGameProgress — aggregates progress state from useGameProgressStore
 * and exposes a stable API with computed helpers.
 */

import { useCallback } from 'react'
import { useGameProgressStore } from '@/lib/stores/gameProgressStore'

// Re-export type for backward compatibility
export type { GameProgressState as GameProgress } from '@/lib/stores/gameProgressStore'

export interface GameProgressContextValue {
  progress: {
    score: number
    level: number
    attempts: number
    correctAnswers: number
    totalQuestions: number
    timeSpent: number
    startTime: number
    streakCount: number
    bestStreak: number
  }
  incrementScore: (points?: number) => void
  incrementLevel: () => void
  recordAttempt: (isCorrect: boolean) => void
  resetProgress: () => void
  pauseTimer: () => void
  resumeTimer: () => void
  getAccuracy: () => number
  getAverageTimePerQuestion: () => number
  getProgressPercentage: () => number
  isGameActive: boolean
  setGameActive: (active: boolean) => void
}

export function useGameProgress(maxLevel = 10, pointsPerCorrect = 10): GameProgressContextValue {
  const store = useGameProgressStore()

  const incrementScore = useCallback(
    (points = pointsPerCorrect) => store.incrementScore(points),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pointsPerCorrect],
  )

  const incrementLevel = useCallback(
    () => store.incrementLevel(maxLevel),
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
