/**
 * Hook למעקב אחר קדמה בלמידה ושיפור מותאם אישית
 * מנתח דפוסי טעויות ומספק המלצות
 */

import { useState, useEffect, useCallback } from 'react';
import { BaseGameItem, GameType } from '@/lib/types/base';
import { GameSession, ProgressStats } from '@/lib/types/hooks/progress';

export function useProgressTracking(gameType: GameType) {
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null);
  const [allSessions, setAllSessions] = useState<GameSession[]>([]);
  const [progressStats, setProgressStats] = useState<ProgressStats | null>(null);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('gameProgress');
    if (savedSessions) {
      try {
        const sessions = JSON.parse(savedSessions);
        setAllSessions(sessions);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading progress:', error);
        }
      }
    }
  }, []);

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
      const completedSession = {
        ...currentSession,
        endTime: new Date(),
      };

      setAllSessions(prev => {
        const newSessions = [...prev, completedSession];
        // Save to localStorage
        try {
          localStorage.setItem('gameProgress', JSON.stringify(newSessions));
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error saving progress:', error);
          }
        }
        return newSessions;
      });

      setCurrentSession(null);
    }
  }, [currentSession]);

  // Calculate comprehensive progress statistics
  const calculateProgressStats = useCallback((): ProgressStats => {
    if (allSessions.length === 0) {
      return {
        totalSessions: 0,
        totalTime: 0,
        totalGamesPlayed: 0,
        gamesCompleted: 0,
        averageScore: 0,
        bestScore: 0,
        averageAccuracy: 0,
        mostDifficultItems: [],
        strongestAreas: [],
        weakestAreas: [],
        improvementTrend: 'stable',
        recommendedPractice: [],
      };
    }

    const gameTypeSessions = allSessions.filter(s => s.gameType === gameType);
    const allGameSessions = allSessions;

    // Basic stats
    const totalGamesPlayed = gameTypeSessions.length;
    const averageScore = gameTypeSessions.reduce((sum, s) => sum + s.score, 0) / totalGamesPlayed;
    const bestScore = Math.max(...gameTypeSessions.map(s => s.score));

    // Most difficult items (items with most mistakes)
    const mistakeCount: Record<string, number> = {};
    gameTypeSessions.forEach(session => {
      session.mistakes.forEach(mistake => {
        mistakeCount[mistake.item] = (mistakeCount[mistake.item] || 0) + mistake.attempts;
      });
    });
    const mostDifficultItems = Object.entries(mistakeCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([item]) => item);

    // Strongest and weakest game areas
    const gameTypeStats: Record<string, { score: number, count: number }> = {};
    allGameSessions.forEach(session => {
      if (!gameTypeStats[session.gameType]) {
        gameTypeStats[session.gameType] = { score: 0, count: 0 };
      }
      gameTypeStats[session.gameType].score += session.score;
      gameTypeStats[session.gameType].count += 1;
    });

    const gameTypeAverages = Object.entries(gameTypeStats).map(([type, stats]) => ({
      type: type as GameType,
      average: stats.score / stats.count,
    }));

    const strongestAreas = gameTypeAverages
      .sort((a, b) => b.average - a.average)
      .slice(0, 3)
      .map(area => area.type);

    const weakestAreas = gameTypeAverages
      .sort((a, b) => a.average - b.average)
      .slice(0, 3)
      .map(area => area.type);

    // Improvement trend (last 5 sessions vs previous 5)
    let improvementTrend: 'up' | 'stable' | 'down' = 'stable';
    if (gameTypeSessions.length >= 10) {
      const recent = gameTypeSessions.slice(-5);
      const previous = gameTypeSessions.slice(-10, -5);
      const recentAvg = recent.reduce((sum, s) => sum + s.score, 0) / 5;
      const previousAvg = previous.reduce((sum, s) => sum + s.score, 0) / 5;
      
      if (recentAvg > previousAvg * 1.1) improvementTrend = 'up';
      else if (recentAvg < previousAvg * 0.9) improvementTrend = 'down';
    }

    // Recommended practice areas
    const recommendedPractice: string[] = [];
    if (mostDifficultItems.length > 0) {
      recommendedPractice.push(`תרגל עוד את: ${mostDifficultItems.slice(0, 3).join(', ')}`);
    }
    if (weakestAreas.length > 0 && weakestAreas[0] !== gameType) {
      recommendedPractice.push(`נסה לשפר ב: ${weakestAreas[0]}`);
    }
    if (improvementTrend === 'down') {
      recommendedPractice.push('קח הפסקה קצרה ותחזור רענן');
    }

    return {
      totalSessions: allSessions.length,
      totalTime: allSessions.reduce((sum, s) => sum + (s.duration || 0), 0),
      totalGamesPlayed,
      gamesCompleted: allSessions.filter(s => s.completed).length,
      averageScore,
      bestScore,
      averageAccuracy: gameTypeSessions.reduce((sum, s) => sum + s.accuracy, 0) / totalGamesPlayed || 0,
      mostDifficultItems,
      strongestAreas,
      weakestAreas,
      improvementTrend,
      recommendedPractice,
    };
  }, [allSessions, gameType]);

  // Update progress stats when sessions change
  useEffect(() => {
    setProgressStats(calculateProgressStats());
  }, [allSessions, calculateProgressStats]);

  // Get accuracy rate for current session
  const getCurrentAccuracy = useCallback(() => {
    if (!currentSession || currentSession.totalAnswers === 0) return 0;
    return Math.round((currentSession.correctAnswers / currentSession.totalAnswers) * 100);
  }, [currentSession]);

  return {
    currentSession,
    progressStats,
    startSession,
    recordCorrectAnswer,
    recordMistake,
    endSession,
    getCurrentAccuracy,
    allSessions: allSessions.filter(s => s.gameType === gameType),
  };
}
