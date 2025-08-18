/**
 * ===============================================
 * Simple Progress Display - גרסה פשוטה עם קונטקסט
 * ===============================================
 * 
 * 🎯 אפס props - הכל מהקונטקסט!
 */

"use client";

import { useUniversalGame } from '@/contexts/UniversalGameContext';

/**
 * 🎯 SimpleProgressDisplay עם קונטקסט - ללא props!
 */
export function SimpleProgressDisplay() {
  const { 
    currentAccuracy, 
    showProgressModal, 
    setShowProgressModal,
    score,
    level
  } = useUniversalGame();
  
  if (!showProgressModal) return null;

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyMessage = (accuracy: number) => {
    if (accuracy >= 90) return 'מעולה! 🌟';
    if (accuracy >= 70) return 'טוב מאוד! 👍';
    if (accuracy >= 50) return 'לא רע, אפשר לשפר! 💪';
    return 'בואו נתרגל עוד! 🎯';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📊 הסטטיסטיקות שלך</h2>
          <button
            onClick={() => setShowProgressModal(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        {/* Current Session Stats */}
        <div className="space-y-4">
          {/* Accuracy */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="text-4xl font-bold mb-2">
              <span className={getAccuracyColor(currentAccuracy)}>
                {Math.round(currentAccuracy)}%
              </span>
            </div>
            <p className="text-gray-600 text-lg mb-2">דיוק נוכחי</p>
            <p className="text-sm font-medium text-purple-600">
              {getAccuracyMessage(currentAccuracy)}
            </p>
          </div>

          {/* Score and Level */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {score}
              </div>
              <p className="text-gray-600 text-sm">נקודות</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {level}
              </div>
              <p className="text-gray-600 text-sm">רמה</p>
            </div>
          </div>

          {/* Encouragement */}
          <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
            <div className="text-lg font-bold text-amber-700 mb-2">
              💪 כל הכבוד!
            </div>
            <p className="text-gray-600 text-sm">
              תמשיך לשחק ולהשתפר!
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowProgressModal(false)}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 font-bold"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimpleProgressDisplay;
