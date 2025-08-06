/**
 * קומפוננט להצגת סטטיסטיקות ביצועים
 * מציג מידע על קדמה, דיוק ותחומים לשיפור
 */

"use client";

import React from 'react';

interface ProgressStats {
  totalGamesPlayed: number;
  averageScore: number;
  bestScore: number;
  mostDifficultItems: string[];
  strongestAreas: string[];
  weakestAreas: string[];
  improvementTrend: 'improving' | 'stable' | 'declining';
  recommendedPractice: string[];
}

interface ProgressDisplayProps {
  currentAccuracy: number;
  progressStats: ProgressStats | null;
  isVisible: boolean;
  onClose: () => void;
  className?: string;
}

const TREND_ICONS = {
  improving: '📈',
  stable: '➡️',
  declining: '📉',
};

const TREND_COLORS = {
  improving: 'text-green-600',
  stable: 'text-yellow-600',
  declining: 'text-red-600',
};

const TREND_MESSAGES = {
  improving: 'מתקדם בצורה מעולה! 🎉',
  stable: 'ביצועים יציבים 👍',
  declining: 'בואו נשפר יחד! 💪',
};

export function ProgressDisplay({ 
  currentAccuracy, 
  progressStats, 
  isVisible, 
  onClose,
  className = ""
}: ProgressDisplayProps) {
  if (!isVisible) return null;

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📊 הסטטיסטיקות שלך</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Current Accuracy */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">דיוק נוכחי:</span>
            <span className={`text-2xl font-bold ${getAccuracyColor(currentAccuracy)}`}>
              {currentAccuracy}%
            </span>
          </div>
        </div>

        {/* Progress Stats */}
        {progressStats ? (
          <div className="space-y-4">
            {/* Games Played */}
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">משחקים שוחקו:</span>
              <span className="font-bold text-blue-600">{progressStats.totalGamesPlayed}</span>
            </div>

            {/* Average Score */}
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">ציון ממוצע:</span>
              <span className={`font-bold ${getScoreColor(progressStats.averageScore)}`}>
                {progressStats.averageScore}
              </span>
            </div>

            {/* Best Score */}
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">הציון הטוב ביותר:</span>
              <span className="font-bold text-green-600">🏆 {progressStats.bestScore}</span>
            </div>

            {/* Improvement Trend */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">מגמת התקדמות:</span>
                <span className={`text-xl ${TREND_COLORS[progressStats.improvementTrend]}`}>
                  {TREND_ICONS[progressStats.improvementTrend]}
                </span>
              </div>
              <p className={`text-sm ${TREND_COLORS[progressStats.improvementTrend]}`}>
                {TREND_MESSAGES[progressStats.improvementTrend]}
              </p>
            </div>

            {/* Strongest Areas */}
            {progressStats.strongestAreas.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">💪 החוזקות שלך:</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  {progressStats.strongestAreas.map((area) => (
                    <li key={area}>• {area}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Areas for Improvement */}
            {progressStats.weakestAreas.length > 0 && (
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-bold text-yellow-800 mb-2">🎯 תחומים לשיפור:</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {progressStats.weakestAreas.map((area) => (
                    <li key={area}>• {area}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Practice */}
            {progressStats.recommendedPractice.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">🎓 מומלץ להתרגל:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  {progressStats.recommendedPractice.map((practice) => (
                    <li key={practice}>• {practice}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">אין עדיין מספיק נתונים להצגת סטטיסטיקות מפורטות</p>
            <p className="text-sm text-gray-400 mt-2">המשך לשחק כדי לראות את ההתקדמות שלך!</p>
          </div>
        )}

        {/* Close Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}
