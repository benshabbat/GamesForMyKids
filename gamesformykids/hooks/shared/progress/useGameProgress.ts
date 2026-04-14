'use client';

import { useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/shared/auth/useAuth'
import { supabase } from '@/lib/supabase/client'
import { useGameProgressDataStore } from '@/lib/stores/gameProgressDataStore'

export interface GameProgress {
  id: string
  user_id: string
  game_type: string
  level: number
  score: number
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
      let query = supabase
        .from('game_progress')
        .select('*')
        .eq('user_id', user.id)

      if (gameType) {
        query = query.eq('game_type', gameType)
      }

      const { data, error } = await query

      if (error) throw error

      setProgress(data || [])
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

  async function updateProgress(gameType: string, updates: Partial<GameProgress>) {
    if (!user) return null

    try {
      const { data, error } = await supabase
        .from('game_progress')
        .upsert({
          user_id: user.id,
          game_type: gameType,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      // Update store
      upsertProgressItem(data)

      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בעדכון ההתקדמות')
      return null
    }
  }

  async function addPlayTime(gameType: string, playTimeSeconds: number) {
    const currentProgress = progress.find(p => p.game_type === gameType)
    const newTotalTime = (currentProgress?.total_play_time || 0) + playTimeSeconds

    return updateProgress(gameType, {
      total_play_time: newTotalTime,
      last_played_at: new Date().toISOString()
    })
  }

  async function updateScore(gameType: string, newScore: number) {
    const currentProgress = progress.find(p => p.game_type === gameType)
    const bestScore = Math.max(currentProgress?.best_score || 0, newScore)

    return updateProgress(gameType, {
      score: newScore,
      best_score: bestScore,
      last_played_at: new Date().toISOString()
    })
  }

  async function updateLevel(gameType: string, newLevel: number) {
    const currentProgress = progress.find(p => p.game_type === gameType)
    const completedLevels = Math.max(currentProgress?.completed_levels || 0, newLevel - 1)

    return updateProgress(gameType, {
      level: newLevel,
      completed_levels: completedLevels,
      last_played_at: new Date().toISOString()
    })
  }

  return {
    progress,
    loading,
    error,
    updateProgress,
    addPlayTime,
    updateScore,
    updateLevel,
    refreshProgress: fetchProgress
  }
}
