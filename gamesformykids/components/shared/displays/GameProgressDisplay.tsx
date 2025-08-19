/**
 * Game Progress Display Component
 * קומפוננט להצגת התקדמות המשחק
 */

'use client';

import React from 'react';
import { useGameProgress, useGameStats } from '@/contexts/GameProgressContext';

interface GameProgressDisplayProps {
  showDetailedStats?: boolean;
  compact?: boolean;
}

export function GameProgressDisplay({ 
  showDetailedStats = true, 
  compact = false 
}: GameProgressDisplayProps) {
  const { 
    progress, 
    getProgressPercentage, 
    isGameActive 
  } = useGameProgress();
  
  const { accuracy, averageTime, streak, bestStreak } = useGameStats();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (compact) {
    return (
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-bold text-blue-600">{progress.score}</span>
          <span className="text-gray-500">נקודות</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-bold text-green-600">{progress.level}</span>
          <span className="text-gray-500">רמה</span>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1">
            <span className="font-bold text-orange-500">{streak}</span>
            <span className="text-gray-500">רצף</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-bold mb-3 text-center">התקדמות במשחק</h3>
      
      {/* מידע בסיסי */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{progress.score}</div>
          <div className="text-sm text-gray-500">נקודות</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{progress.level}</div>
          <div className="text-sm text-gray-500">רמה</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{streak}</div>
          <div className="text-sm text-gray-500">רצף נוכחי</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{formatTime(progress.timeSpent)}</div>
          <div className="text-sm text-gray-500">זמן</div>
        </div>
      </div>

      {/* פס התקדמות */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>התקדמות ברמה</span>
          <span>{Math.round(getProgressPercentage())}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* סטטיסטיקות מפורטות */}
      {showDetailedStats && progress.totalQuestions > 0 && (
        <div className="border-t pt-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="text-center">
              <div className="font-semibold text-green-600">{Math.round(accuracy)}%</div>
              <div className="text-gray-500">דיוק</div>
            </div>
            
            <div className="text-center">
              <div className="font-semibold text-blue-600">{progress.correctAnswers}</div>
              <div className="text-gray-500">תשובות נכונות</div>
            </div>
            
            <div className="text-center">
              <div className="font-semibold text-orange-600">{bestStreak}</div>
              <div className="text-gray-500">רצף הטוב ביותר</div>
            </div>
            
            <div className="text-center">
              <div className="font-semibold text-purple-600">{Math.round(averageTime)}s</div>
              <div className="text-gray-500">זמן ממוצע</div>
            </div>
          </div>
        </div>
      )}

      {/* סטטוס המשחק */}
      <div className="mt-3 text-center">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          isGameActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {isGameActive ? '🎮 המשחק פעיל' : '⏸️ המשחק מושהה'}
        </span>
      </div>
    </div>
  );
}

/**
 * Simple Score Display
 * תצוגה פשוטה של הציון
 */
export function ScoreDisplay() {
  const { progress } = useGameProgress();
  
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-2 rounded-lg">
      <span className="text-lg">🏆</span>
      <span className="font-bold text-lg">{progress.score}</span>
    </div>
  );
}

/**
 * Level Badge Component
 * תצוגת רמה כתג
 */
export function LevelBadge() {
  const { progress } = useGameProgress();
  
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-lg">
      <span className="text-lg">⭐</span>
      <span className="font-bold">רמה {progress.level}</span>
    </div>
  );
}

/**
 * Streak Indicator
 * מחוון רצף תשובות נכונות
 */
export function StreakIndicator() {
  const { streak } = useGameStats();
  
  if (streak === 0) return null;
  
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-2 rounded-lg animate-pulse">
      <span className="text-lg">🔥</span>
      <span className="font-bold">רצף: {streak}</span>
    </div>
  );
}
