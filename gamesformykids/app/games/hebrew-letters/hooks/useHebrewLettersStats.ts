import { useCallback } from 'react';
import { useHebrewLetters } from '@/contexts';

/**
 * Hook מותאם אישית לניהול סטטיסטיקות של אותיות עבריות
 * מספק ממשק פשוט ונוח לגישה לנתוני למידה ואנליטיקה
 */
export const useHebrewLettersStats = () => {
  const {
    learningStats,
    completedLetters,
    getTotalPracticeTime,
    getLetterStats,
    exportLearningData,
    resetAllStats,
    startPracticeSession,
    endPracticeSession,
    logPracticeActivity
  } = useHebrewLetters();

  // פונקציות עזר לחישובי סטטיסטיקה
  const getCompletionRate = useCallback(() => {
    const totalLetters = 22; // מספר האותיות בעברית
    return completedLetters.size > 0 ? (completedLetters.size / totalLetters) * 100 : 0;
  }, [completedLetters.size]);

  const getAverageTimePerLetter = useCallback(() => {
    const totalTime = getTotalPracticeTime();
    const lettersStarted = learningStats.lettersStarted.size;
    return lettersStarted > 0 ? totalTime / lettersStarted : 0;
  }, [getTotalPracticeTime, learningStats.lettersStarted.size]);

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
    const totalTime = getTotalPracticeTime();
    const mostPracticed = getMostPracticedLetter();

    if (completionRate > 50) {
      insights.push({
        type: 'success',
        message: `כל הכבוד! השלמת ${Math.round(completionRate)}% מהאותיות!`
      });
    }

    if (totalTime > 30 * 60 * 1000) { // מעל 30 דקות
      insights.push({
        type: 'achievement',
        message: `מדהים! תרגלת כבר ${Math.round(totalTime / (60 * 1000))} דקות!`
      });
    }

    if (mostPracticed) {
      insights.push({
        type: 'info',
        message: `האות שאתה הכי אוהב לתרגל היא ${mostPracticed}`
      });
    }

    if (learningStats.practiceHistory.length > 20) {
      insights.push({
        type: 'streak',
        message: `יש לך ${learningStats.practiceHistory.length} פעילויות תרגול!`
      });
    }

    return insights;
  }, [getCompletionRate, getTotalPracticeTime, getMostPracticedLetter, learningStats.practiceHistory.length]);

  // פונקציות פורמט
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

  // פונקציות ייצוא מתקדמות
  const exportDetailedReport = useCallback(() => {
    const report = {
      summary: {
        totalPracticeTime: getTotalPracticeTime(),
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
    getTotalPracticeTime,
    completedLetters.size,
    learningStats,
    getCompletionRate,
    getAverageTimePerLetter,
    getMostPracticedLetter,
    getWeeklyProgress,
    getProgressInsights
  ]);

  return {
    // נתונים בסיסיים
    learningStats,
    completedLetters,
    
    // פונקציות חישוב
    getCompletionRate,
    getAverageTimePerLetter,
    getMostPracticedLetter,
    getWeeklyProgress,
    getProgressInsights,
    
    // פונקציות פורמט
    formatTime,
    formatProgress,
    
    // פונקציות ניהול
    getTotalPracticeTime,
    getLetterStats,
    startPracticeSession,
    endPracticeSession,
    logPracticeActivity,
    
    // פונקציות ייצוא
    exportLearningData,
    exportDetailedReport,
    resetAllStats
  };
};

export default useHebrewLettersStats;
