'use client';

import type { ComponentTypes } from "@/lib/types";

/**
 * קומפוננט להצגת התקדמות המשחק
 */
export default function GameProgressDisplay({ 
  currentLevel,
  totalLevels,
  score,
  progress,
  showDetails = true,
  stats
}: ComponentTypes.GameProgressDisplayProps) {
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      {/* Header with level info */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">התקדמות המשחק</h3>
        <div className="text-sm text-gray-600">
          שלב {currentLevel} מתוך {totalLevels}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">התקדמות:</span>
          <span className="text-sm font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Score */}
      <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-yellow-700 font-medium">ניקוד:</span>
          <span className="text-2xl font-bold text-yellow-800">🏆 {score}</span>
        </div>
      </div>

      {/* Detailed stats */}
      {showDetails && stats && (
        <div className="space-y-3 pt-3 border-t border-gray-200">
          <h4 className="font-semibold text-gray-700">סטטיסטיקות:</h4>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">הושלמו:</span>
              <span className="font-bold">{stats.completedItems}/{stats.totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">דיוק:</span>
              <span className="font-bold text-green-600">{stats.accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">זמן ממוצע:</span>
              <span className="font-bold">{stats.averageTime}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">רצף:</span>
              <span className="font-bold text-purple-600">{stats.streak}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
