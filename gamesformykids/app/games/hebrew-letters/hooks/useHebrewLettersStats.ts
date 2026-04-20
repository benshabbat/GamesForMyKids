'use client';

import { useCallback } from 'react';
import { useHebrewLettersStore } from '../store/hebrewLettersStore';
import { TOTAL_HEBREW_LETTERS } from '../constants/hebrewLetters';

/**
 * Hook ׳׳•׳×׳׳ ׳׳™׳©׳™׳× ׳׳ ׳™׳”׳•׳ ׳¡׳˜׳˜׳™׳¡׳˜׳™׳§׳•׳× ׳©׳ ׳׳•׳×׳™׳•׳× ׳¢׳‘׳¨׳™׳•׳×
 * ׳׳¡׳₪׳§ ׳׳׳©׳§ ׳₪׳©׳•׳˜ ׳•׳ ׳•׳— ׳׳’׳™׳©׳” ׳׳ ׳×׳•׳ ׳™ ׳׳׳™׳“׳” ׳•׳׳ ׳׳™׳˜׳™׳§׳”
 */
export const useHebrewLettersStats = () => {
  const learningStats = useHebrewLettersStore((s) => s.learningStats);
  const completedLetters = useHebrewLettersStore((s) => s.completedLetters);
  const { resetAllStats, startPracticeSession, endPracticeSession } = useHebrewLettersStore();

  const getTotalPracticeTime = useCallback(() => learningStats.totalPracticeTime, [learningStats.totalPracticeTime]);

  // ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳¢׳–׳¨ ׳׳—׳™׳©׳•׳‘׳™ ׳¡׳˜׳˜׳™׳¡׳˜׳™׳§׳”
  const getCompletionRate = useCallback(() => {
    return completedLetters.size > 0 ? (completedLetters.size / TOTAL_HEBREW_LETTERS) * 100 : 0;
  }, [completedLetters.size]);

  const getAverageTimePerLetter = useCallback(() => {
    const totalTime = learningStats.totalPracticeTime;
    const lettersStarted = learningStats.lettersStarted.size;
    return lettersStarted > 0 ? totalTime / lettersStarted : 0;
  }, [learningStats.totalPracticeTime, learningStats.lettersStarted.size]);

  const getMostPracticedLetter = useCallback(() => {
    const letterCounts: Record<string, number> = {};
    
    learningStats.practiceHistory.forEach(activity => {
      letterCounts[activity.letter] = (letterCounts[activity.letter] || 0) + 1;
    });

    const mostPracticed = Object.entries(letterCounts).reduce(
      (max, [letter, count]) => count > max.count ? { letter, count } : max,
      { letter: '', count: 0 }
    );

    return mostPracticed.letter || null;
  }, [learningStats.practiceHistory]);

  const getWeeklyProgress = useCallback(() => {
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const recentActivities = learningStats.practiceHistory.filter(
      activity => activity.timestamp > oneWeekAgo
    );
    
    const dailyStats: Record<string, { activities: number; timeSpent: number }> = {};
    
    recentActivities.forEach(activity => {
      const day = new Date(activity.timestamp).toDateString();
      if (!dailyStats[day]) {
        dailyStats[day] = { activities: 0, timeSpent: 0 };
      }
      dailyStats[day].activities++;
      dailyStats[day].timeSpent += activity.timeSpent;
    });

    return dailyStats;
  }, [learningStats.practiceHistory]);

  const getProgressInsights = useCallback(() => {
    const insights = [];
    const completionRate = getCompletionRate();
    const totalTime = learningStats.totalPracticeTime;
    const mostPracticed = getMostPracticedLetter();

    if (completionRate > 50) {
      insights.push({
        type: 'success',
        message: `׳›׳ ׳”׳›׳‘׳•׳“! ׳”׳©׳׳׳× ${Math.round(completionRate)}% ׳׳”׳׳•׳×׳™׳•׳×!`
      });
    }

    if (totalTime > 30 * 60 * 1000) { // ׳׳¢׳ 30 ׳“׳§׳•׳×
      insights.push({
        type: 'achievement',
        message: `׳׳“׳”׳™׳! ׳×׳¨׳’׳׳× ׳›׳‘׳¨ ${Math.round(totalTime / (60 * 1000))} ׳“׳§׳•׳×!`
      });
    }

    if (mostPracticed) {
      insights.push({
        type: 'info',
        message: `׳”׳׳•׳× ׳©׳׳×׳” ׳”׳›׳™ ׳׳•׳”׳‘ ׳׳×׳¨׳’׳ ׳”׳™׳ ${mostPracticed}`
      });
    }

    if (learningStats.practiceHistory.length > 20) {
      insights.push({
        type: 'streak',
        message: `׳™׳© ׳׳ ${learningStats.practiceHistory.length} ׳₪׳¢׳™׳׳•׳™׳•׳× ׳×׳¨׳’׳•׳!`
      });
    }

    return insights;
  }, [getCompletionRate, getMostPracticedLetter, learningStats.totalPracticeTime, learningStats.practiceHistory.length]);

  // ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳₪׳•׳¨׳׳˜
  const formatTime = useCallback((milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    }
    return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
  }, []);

  const formatProgress = useCallback((percentage: number) => {
    return `${Math.round(percentage)}%`;
  }, []);

  const getLetterStats = useCallback((letterName: string) => ({
    timesStarted: learningStats.lettersStarted.has(letterName) ? 1 : 0,
    timesCompleted: learningStats.lettersCompleted.has(letterName) ? 1 : 0,
    totalTimeSpent: 0,
    averageTimePerStep: 0,
  }), [learningStats.lettersStarted, learningStats.lettersCompleted]);

  const exportLearningData = useCallback(() => JSON.stringify(learningStats), [learningStats]);

  const exportDetailedReport = useCallback(() => {
    const report = {
      summary: {
        totalPracticeTime: learningStats.totalPracticeTime,
        lettersCompleted: completedLetters.size,
        lettersStarted: learningStats.lettersStarted.size,
        completionRate: getCompletionRate(),
        totalActivities: learningStats.practiceHistory.length,
        averageTimePerLetter: getAverageTimePerLetter(),
        mostPracticedLetter: getMostPracticedLetter()
      },
      weeklyProgress: getWeeklyProgress(),
      insights: getProgressInsights(),
      detailedHistory: learningStats.practiceHistory,
      exportDate: new Date().toISOString(),
      version: '2.0'
    };

    return JSON.stringify(report, null, 2);
  }, [
    learningStats,
    completedLetters.size,
    getCompletionRate,
    getAverageTimePerLetter,
    getMostPracticedLetter,
    getWeeklyProgress,
    getProgressInsights
  ]);

  const downloadDetailedReport = useCallback(() => {
    const data = exportDetailedReport();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hebrew-letters-detailed-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [exportDetailedReport]);

  return {
    // ׳ ׳×׳•׳ ׳™׳ ׳‘׳¡׳™׳¡׳™׳™׳
    learningStats,
    completedLetters,
    
    // ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳—׳™׳©׳•׳‘
    getCompletionRate,
    getAverageTimePerLetter,
    getMostPracticedLetter,
    getWeeklyProgress,
    getProgressInsights,
    
    // ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳₪׳•׳¨׳׳˜
    formatTime,
    formatProgress,
    
    // ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳ ׳™׳”׳•׳
    getTotalPracticeTime,
    getLetterStats,
    startPracticeSession,
    endPracticeSession,
    logPracticeActivity: () => {},
    
    // ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳™׳™׳¦׳•׳
    exportLearningData,
    exportDetailedReport,
    downloadDetailedReport,
    resetAllStats
  };
};

export default useHebrewLettersStats;
