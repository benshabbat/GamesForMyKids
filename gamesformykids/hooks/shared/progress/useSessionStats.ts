/**
 * Hook למעקב אחר קדמה בלמידה ושיפור מותאם אישית
 * מנתח דפוסי טעויות ומספק המלצות
 */

'use client';

import { useState, useCallback } from 'react';
import { BaseGameItem, GameType } from '@/lib/types/core/base';
import { GameSession } from '@/lib/types/hooks/progress';
import { useProgressTrackingStore } from '@/lib/stores/progressTrackingStore';
import { recordGameSession } from '@/lib/utils/engagement/masteryStars';

export function useSessionStats(gameType: GameType) {
  const { addSession } = useProgressTrackingStore();

  const [currentSession, setCurrentSession] = useState<GameSession | null>(null);

  // Start a new game session
  const startSession = useCallback(() => {
    const session: GameSession = {
      id: `session_${Date.now()}`,
      gameType,
      startTime: new Date(),
      score: 0,
      level: 1,
      correctAnswers: 0,
      totalAnswers: 0,
      duration: 0,
      accuracy: 0,
      mistakes: [],
      completed: false,
    };
    setCurrentSession(session);
  }, [gameType]);

  // Record a correct answer
  const recordCorrectAnswer = useCallback((item: BaseGameItem, score: number, level: number) => {
    setCurrentSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        score,
        level,
        correctAnswers: prev.correctAnswers + 1,
        totalAnswers: prev.totalAnswers + 1,
      };
    });
  }, []);

  // Record a mistake
  const recordMistake = useCallback((item: BaseGameItem, attempts: number = 1) => {
    setCurrentSession(prev => {
      if (!prev) return null;

      const existingMistake = prev.mistakes.find(m => m.item === item.name);
      const mistakes = existingMistake
        ? prev.mistakes.map(m =>
            m.item === item.name
              ? { ...m, attempts: m.attempts + attempts, timestamp: new Date() }
              : m
          )
        : [...prev.mistakes, { item: item.name, timestamp: new Date(), attempts }];

      return {
        ...prev,
        totalAnswers: prev.totalAnswers + 1,
        mistakes,
      };
    });
  }, []);

  // End current session and save progress
  const endSession = useCallback(() => {
    if (currentSession) {
      const completedSession: GameSession = {
        ...currentSession,
        endTime: new Date(),
      };
      addSession(completedSession);
      const accuracy = completedSession.totalAnswers > 0
        ? Math.round((completedSession.correctAnswers / completedSession.totalAnswers) * 100)
        : 0;
      recordGameSession(String(gameType), accuracy);
      setCurrentSession(null);
    }
  }, [currentSession, addSession, gameType]);

  // Get accuracy rate for current session
  const getCurrentAccuracy = useCallback(() => {
    if (!currentSession || currentSession.totalAnswers === 0) return 0;
    return Math.round((currentSession.correctAnswers / currentSession.totalAnswers) * 100);
  }, [currentSession]);

  return {
    currentSession,
    startSession,
    recordCorrectAnswer,
    recordMistake,
    endSession,
    getCurrentAccuracy,
  };
}
