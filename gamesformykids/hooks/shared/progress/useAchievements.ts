'use client';

import { useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/shared/auth/useAuth';
import { useAchievementsStore } from '@/lib/stores/achievementsStore';
import {
  fetchAchievements,
  findAchievement,
  insertAchievement,
} from '@/lib/supabase/achievements';

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type: string;
  achievement_name: string;
  description: string | null;
  icon: string | null;
  earned_at: string;
  game_type: string | null;
  metadata: Record<string, unknown>;
}

export function useAchievements(gameType?: string) {
  const { user } = useAuth();
  const achievements = useAchievementsStore((s) => s.achievements);
  const loading = useAchievementsStore((s) => s.loading);
  const error = useAchievementsStore((s) => s.error);
  const loadedForUserId = useAchievementsStore((s) => s.loadedForUserId);
  const { setAchievements, prependAchievement, setLoading, setError, setLoadedForUserId } =
    useAchievementsStore();

  const loadAchievements = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await fetchAchievements(user.id, gameType);
      setAchievements(data);
      setLoadedForUserId(user.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת ההישגים');
    } finally {
      setLoading(false);
    }
  }, [user, gameType, setAchievements, setLoading, setError, setLoadedForUserId]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    if (loadedForUserId === user.id) return;
    loadAchievements();
  }, [user, gameType, loadedForUserId, loadAchievements, setLoading]);

  async function unlockAchievement(
    achievement: Omit<Achievement, 'id' | 'user_id' | 'earned_at'>,
  ) {
    if (!user) return null;

    try {
      const existing = await findAchievement(
        user.id,
        achievement.achievement_type,
        achievement.game_type ?? '',
      );
      if (existing) return existing;

      const data = await insertAchievement(user.id, achievement);
      prependAchievement(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בשמירת ההישג');
      return null;
    }
  }

  async function checkScoreAchievements(gameType: string, score: number) {
    const candidates = [];

    if (score > 0) {
      candidates.push({
        achievement_type: 'first_score',
        achievement_name: 'הניקוד הראשון',
        description: 'קיבלת את הניקוד הראשון שלך!',
        icon: '🎯',
        game_type: gameType,
        metadata: { score },
      });
    }

    if (score >= 100) {
      candidates.push({
        achievement_type: 'score_100',
        achievement_name: 'מאה נקודות',
        description: 'השגת 100 נקודות במשחק!',
        icon: '💯',
        game_type: gameType,
        metadata: { score },
      });
    }

    if (score >= 500) {
      candidates.push({
        achievement_type: 'score_500',
        achievement_name: 'חמש מאות נקודות',
        description: 'השגת 500 נקודות במשחק!',
        icon: '⭐',
        game_type: gameType,
        metadata: { score },
      });
    }

    for (const a of candidates) {
      await unlockAchievement(a);
    }
  }

  async function checkLevelAchievements(gameType: string, level: number) {
    const candidates = [];

    if (level >= 5) {
      candidates.push({
        achievement_type: 'level_5',
        achievement_name: 'רמה 5',
        description: 'הגעת לרמה 5!',
        icon: '🏆',
        game_type: gameType,
        metadata: { level },
      });
    }

    if (level >= 10) {
      candidates.push({
        achievement_type: 'level_10',
        achievement_name: 'רמה 10',
        description: 'הגעת לרמה 10! מדהים!',
        icon: '👑',
        game_type: gameType,
        metadata: { level },
      });
    }

    for (const a of candidates) {
      await unlockAchievement(a);
    }
  }

  return {
    achievements,
    loading,
    error,
    checkScoreAchievements,
    checkLevelAchievements,
  };
}
