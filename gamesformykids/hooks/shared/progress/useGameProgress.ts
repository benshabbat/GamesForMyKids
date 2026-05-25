'use client';

import { useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/shared/auth/useAuth'
import { fetchGameProgress, updateGameProgress } from '@/lib/supabase/gameProgress'
import { useGameProgressDataStore } from '@/lib/stores/gameProgressDataStore'

export interface GameProgress {
  id: string
  user_id: string
  game_type: string
  level: number
  score: number
  last_score: number
  best_score: number
  completed_levels: number
  total_play_time: number
  last_played_at: string
  created_at: string
  updated_at: string
}

export function useGameProgress(gameType?: string) {
  const { user } = useAuth()
  const progress = useGameProgressDataStore((s) => s.progress)
  const loading = useGameProgressDataStore((s) => s.loading)
  const error = useGameProgressDataStore((s) => s.error)
  const loadedForUserId = useGameProgressDataStore((s) => s.loadedForUserId)
  const { setProgress, upsertProgressItem, setLoading, setError, setLoadedForUserId } = useGameProgressDataStore()

  const fetchProgress = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      const data = await fetchGameProgress(user.id, gameType)
      setProgress(data)
      setLoadedForUserId(user.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת ההתקדמות')
    } finally {
      setLoading(false)
    }
  }, [user, gameType, setProgress, setLoading, setError, setLoadedForUserId])

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    if (loadedForUserId === user.id) return
    fetchProgress()
  }, [user, gameType, loadedForUserId, fetchProgress, setLoading])

  async function handleUpdateProgress(gt: string, updates: Partial<GameProgress>) {
    if (!user) return null

    try {
      const data = await updateGameProgress(user.id, gt, updates)
      upsertProgressItem(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בעדכון ההתקדמות')
      return null
    }
  }

  async function addPlayTime(gt: string, playTimeSeconds: number) {
    const currentProgress = progress.find(p => p.game_type === gt)
    const newTotalTime = (currentProgress?.total_play_time || 0) + playTimeSeconds

    return handleUpdateProgress(gt, {
      total_play_time: newTotalTime,
      last_played_at: new Date().toISOString()
    })
  }

  async function updateScore(gt: string, newScore: number) {
    const currentProgress = progress.find(p => p.game_type === gt)
    const bestScore = Math.max(currentProgress?.best_score || 0, newScore)

    return handleUpdateProgress(gt, {
      score: newScore,
      last_score: newScore,
      best_score: bestScore,
      last_played_at: new Date().toISOString()
    })
  }

  async function updateLevel(gt: string, newLevel: number) {
    const currentProgress = progress.find(p => p.game_type === gt)
    const completedLevels = Math.max(currentProgress?.completed_levels || 0, newLevel - 1)

    return handleUpdateProgress(gt, {
      level: newLevel,
      completed_levels: completedLevels,
      last_played_at: new Date().toISOString()
    })
  }

  return {
    progress,
    loading,
    error,
    updateProgress: handleUpdateProgress,
    addPlayTime,
    updateScore,
    updateLevel,
    refreshProgress: fetchProgress
  }
}
