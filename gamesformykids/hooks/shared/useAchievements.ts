import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'

export interface Achievement {
  id: string
  user_id: string
  achievement_type: string
  achievement_name: string
  description: string | null
  icon: string | null
  earned_at: string
  game_type: string | null
  metadata: Record<string, unknown>
}

export function useAchievements(gameType?: string) {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAchievements = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      let query = supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false })

      if (gameType) {
        query = query.eq('game_type', gameType)
      }

      const { data, error } = await query

      if (error) throw error

      setAchievements(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת ההישגים')
    } finally {
      setLoading(false)
    }
  }, [user, gameType])

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    fetchAchievements()
  }, [user, gameType, fetchAchievements])

  async function unlockAchievement(achievement: Omit<Achievement, 'id' | 'user_id' | 'earned_at'>) {
    if (!user) return null

    try {
      // Check if achievement already exists
      const { data: existing } = await supabase
        .from('achievements')
        .select('id')
        .eq('user_id', user.id)
        .eq('achievement_type', achievement.achievement_type)
        .eq('game_type', achievement.game_type || '')
        .single()

      if (existing) {
        // Achievement already unlocked
        return existing
      }

      // Unlock new achievement
      const { data, error } = await supabase
        .from('achievements')
        .insert({
          user_id: user.id,
          ...achievement,
          earned_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      // Update local state
      setAchievements(prev => [data, ...prev])
      
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בשמירת ההישג')
      return null
    }
  }

  // Pre-defined achievement checkers
  async function checkScoreAchievements(gameType: string, score: number) {
    const achievements = []

    // First score achievement
    if (score > 0) {
      achievements.push({
        achievement_type: 'first_score',
        achievement_name: 'הניקוד הראשון',
        description: 'קיבלת את הניקוד הראשון שלך!',
        icon: '🎯',
        game_type: gameType,
        metadata: { score }
      })
    }

    // High score achievements
    if (score >= 100) {
      achievements.push({
        achievement_type: 'score_100',
        achievement_name: 'מאה נקודות',
        description: 'השגת 100 נקודות במשחק!',
        icon: '💯',
        game_type: gameType,
        metadata: { score }
      })
    }

    if (score >= 500) {
      achievements.push({
        achievement_type: 'score_500',
        achievement_name: 'חמש מאות נקודות',
        description: 'השגת 500 נקודות במשחק!',
        icon: '⭐',
        game_type: gameType,
        metadata: { score }
      })
    }

    // Unlock achievements
    for (const achievement of achievements) {
      await unlockAchievement(achievement)
    }
  }

  async function checkLevelAchievements(gameType: string, level: number) {
    const achievements = []

    if (level >= 5) {
      achievements.push({
        achievement_type: 'level_5',
        achievement_name: 'רמה 5',
        description: 'הגעת לרמה 5!',
        icon: '🏆',
        game_type: gameType,
        metadata: { level }
      })
    }

    if (level >= 10) {
      achievements.push({
        achievement_type: 'level_10',
        achievement_name: 'רמה 10',
        description: 'הגעת לרמה 10! מדהים!',
        icon: '👑',
        game_type: gameType,
        metadata: { level }
      })
    }

    // Unlock achievements
    for (const achievement of achievements) {
      await unlockAchievement(achievement)
    }
  }

  async function checkPlayTimeAchievements(gameType: string, totalPlayTimeMinutes: number) {
    const achievements = []

    if (totalPlayTimeMinutes >= 10) {
      achievements.push({
        achievement_type: 'playtime_10min',
        achievement_name: '10 דקות משחק',
        description: 'שיחקת 10 דקות!',
        icon: '⏰',
        game_type: gameType,
        metadata: { playtime_minutes: totalPlayTimeMinutes }
      })
    }

    if (totalPlayTimeMinutes >= 60) {
      achievements.push({
        achievement_type: 'playtime_1hour',
        achievement_name: 'שעה של משחק',
        description: 'שיחקת שעה שלמה!',
        icon: '🎮',
        game_type: gameType,
        metadata: { playtime_minutes: totalPlayTimeMinutes }
      })
    }

    // Unlock achievements
    for (const achievement of achievements) {
      await unlockAchievement(achievement)
    }
  }

  return {
    achievements,
    loading,
    error,
    unlockAchievement,
    checkScoreAchievements,
    checkLevelAchievements,
    checkPlayTimeAchievements,
    refreshAchievements: fetchAchievements
  }
}
