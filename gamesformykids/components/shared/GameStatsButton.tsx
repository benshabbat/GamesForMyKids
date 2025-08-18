"use client";

import { useUniversalGame } from '@/contexts/UniversalGameContext';

export default function GameStatsButton() {
  const { currentAccuracy, setShowProgressModal } = useUniversalGame();
  
  return (
    <button
      onClick={() => setShowProgressModal(true)}
      className="
        px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg
        hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 
        transition-all duration-200 font-bold flex items-center gap-2
      "
      title="הצג סטטיסטיקות מפורטות"
    >
      📊 {Math.round(currentAccuracy)}%
    </button>
  );
}
