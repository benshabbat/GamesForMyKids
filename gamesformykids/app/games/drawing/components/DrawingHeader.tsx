"use client";

import { useDrawingGame } from '../hooks/useDrawingGame';

export default function DrawingHeader() {
  const { isMobileDevice } = useDrawingGame();

  return (
    <div className="text-center mb-6">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-2xl mx-auto">
        <div className="text-6xl mb-4">🎨</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">משחק ציורים</h1>
        <p className="text-gray-600 mb-4">ציירו את מה שבא לכם!</p>
        <p className="text-sm text-gray-500">
          {isMobileDevice
            ? '💡 געו במסך וגררו כדי לצייר או למחוק'
            : '💡 לחצו וגררו עם העכבר כדי לצייר או למחוק'}
        </p>
        {!isMobileDevice && (
          <details className="mt-3">
            <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
              ⌨️ קיצורי מקלדת
            </summary>
            <div className="text-xs text-gray-500 mt-2 space-y-1 bg-gray-50 p-3 rounded-lg">
              <div>E - מחק | D - ציור | Ctrl+C - נקה הכל</div>
              <div>+ להגדיל מברשת | - להקטין מברשת</div>
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
