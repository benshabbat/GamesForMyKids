/**
 * Game Events Hook
 * Hook לניהול אירועי משחק ותגובות
 */

'use client';

'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useGameProgress, GameProgress } from '@/contexts/GameProgressContext';
import { useGameType } from '@/contexts/GameTypeContext';
import { UseGameEventsReturn } from '@/lib/types/hooks/ui';
import { GameEvent, GameEventData } from '@/lib/types/events/game-events';


export function useGameEvents(): UseGameEventsReturn {
  const { 
    recordAttempt, 
    incrementLevel, 
    setGameActive, 
    progress,
    isGameActive 
  } = useGameProgress();
  
  const { currentGameType } = useGameType();

  // אירוע גנרי
  const triggerEvent = useCallback((event: GameEvent, data?: Record<string, unknown>) => {
    const eventData: GameEventData = {
      event,
      gameType: currentGameType || 'unknown',
      timestamp: Date.now(),
      data,
    };
    
    // כאן ניתן להוסיף לוגיקה לשליחת אירועים לאנליטיקס
    // Game Event logged
    
    // אפשר לשלוח ל-Google Analytics, מסד נתונים וכו'
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, {
        game_type: currentGameType,
        ...data,
      });
    }
  }, [currentGameType]);

  // תשובה נכונה
  const onCorrectAnswer = useCallback((data?: Record<string, unknown>) => {
    recordAttempt(true);
    triggerEvent('correct_answer', {
      score: progress.score,
      level: progress.level,
      streak: progress.streakCount,
      ...data,
    });
    
    // בדיקת milestone לרצף
    if (progress.streakCount > 0 && progress.streakCount % 5 === 0) {
      triggerEvent('streak_milestone', {
        streak: progress.streakCount,
      });
    }
  }, [recordAttempt, triggerEvent, progress]);

  // תשובה שגויה
  const onWrongAnswer = useCallback((data?: Record<string, unknown>) => {
    recordAttempt(false);
    triggerEvent('wrong_answer', {
      score: progress.score,
      level: progress.level,
      attempts: progress.attempts,
      ...data,
    });
  }, [recordAttempt, triggerEvent, progress]);

  // התחלת משחק
  const onGameStart = useCallback(() => {
    setGameActive(true);
    triggerEvent('game_start', {
      level: progress.level,
    });
  }, [setGameActive, triggerEvent, progress.level]);

  // השהיית משחק
  const onGamePause = useCallback(() => {
    setGameActive(false);
    triggerEvent('game_pause', {
      time_played: progress.timeSpent,
      score: progress.score,
    });
  }, [setGameActive, triggerEvent, progress]);

  // המשכת משחק
  const onGameResume = useCallback(() => {
    setGameActive(true);
    triggerEvent('game_resume', {
      time_played: progress.timeSpent,
      score: progress.score,
    });
  }, [setGameActive, triggerEvent, progress]);

  // עליה ברמה
  const onLevelUp = useCallback(() => {
    incrementLevel();
    triggerEvent('level_up', {
      new_level: progress.level + 1,
      score: progress.score,
      accuracy: progress.totalQuestions > 0 ? (progress.correctAnswers / progress.totalQuestions) * 100 : 0,
    });
  }, [incrementLevel, triggerEvent, progress]);

  // Effect לבדיקת השלמת משחק
  useEffect(() => {
    // בדיקה אם המשחק הושלם (הגיע לרמה המקסימלית)
    if (progress.level >= 10 && isGameActive) { // נניח שרמה 10 היא הסיום
      triggerEvent('game_complete', {
        final_score: progress.score,
        total_time: progress.timeSpent,
        accuracy: progress.totalQuestions > 0 ? (progress.correctAnswers / progress.totalQuestions) * 100 : 0,
        best_streak: progress.bestStreak,
      });
    }
  }, [progress.level, isGameActive, triggerEvent, progress]);

  return {
    onCorrectAnswer,
    onWrongAnswer,
    onGameStart,
    onGamePause,
    onGameResume,
    onLevelUp,
    triggerEvent,
  };
}

/**
 * Achievement System Hook
 * Hook לניהול הישגים במשחק
 */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: Omit<GameProgress, 'isGameActive' | 'timerPaused'>) => boolean;
  unlocked: boolean;
}

export function useAchievements() {
  const { progress } = useGameProgress();
  const { triggerEvent } = useGameEvents();

  const achievements = useMemo((): Achievement[] => [
    {
      id: 'first_correct',
      title: 'התחלה טובה',
      description: 'קבל תשובה נכונה ראשונה',
      icon: '🎯',
      condition: (p) => p.correctAnswers >= 1,
      unlocked: progress.correctAnswers >= 1,
    },
    {
      id: 'streak_5',
      title: 'כוכב עולה',
      description: 'רצף של 5 תשובות נכונות',
      icon: '⭐',
      condition: (p) => p.bestStreak >= 5,
      unlocked: progress.bestStreak >= 5,
    },
    {
      id: 'level_5',
      title: 'מתקדם',
      description: 'הגע לרמה 5',
      icon: '🚀',
      condition: (p) => p.level >= 5,
      unlocked: progress.level >= 5,
    },
    {
      id: 'perfect_accuracy',
      title: 'מושלם',
      description: '100% דיוק ב-10 שאלות לפחות',
      icon: '💎',
      condition: (p) => p.totalQuestions >= 10 && p.correctAnswers === p.totalQuestions,
      unlocked: progress.totalQuestions >= 10 && progress.correctAnswers === progress.totalQuestions,
    },
    {
      id: 'speed_demon',
      title: 'מהיר כברק',
      description: 'ממוצע פחות מ-3 שניות לשאלה',
      icon: '⚡',
      condition: (p) => p.totalQuestions >= 5 && (p.timeSpent / p.totalQuestions) < 3,
      unlocked: progress.totalQuestions >= 5 && (progress.timeSpent / progress.totalQuestions) < 3,
    },
  ], [progress]);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  // בדיקה של הישגים חדשים
  useEffect(() => {
    achievements.forEach(achievement => {
      if (achievement.unlocked && !achievement.condition(progress)) {
        // הישג חדש נפתח
        triggerEvent('achievement_unlocked' as GameEvent, {
          achievement_id: achievement.id,
          achievement_title: achievement.title,
        });
      }
    });
  }, [progress, achievements, triggerEvent]);

  return {
    achievements,
    unlockedAchievements,
    lockedAchievements,
    totalAchievements: achievements.length,
    unlockedCount: unlockedAchievements.length,
  };
}
