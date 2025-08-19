'use client';

import { Sparkles, Trash2, Undo2, Redo2 } from 'lucide-react';
import { useBuildingContext } from '@/app/games/building/contexts/BuildingContext';

export default function ActionButtons() {
  const { 
    historyIndex, 
    history, 
    magicShuffle, 
    clearAll, 
    undo, 
    redo 
  } = useBuildingContext();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 md:p-4">
      <h3 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3 text-center">פעולות</h3>
      <div className="grid grid-cols-2 gap-1 md:gap-2">
        <button
          onClick={magicShuffle}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 md:py-3 px-2 md:px-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1 text-sm md:text-base touch-manipulation"
          title="ערבוב קסום של כל הצורות"
        >
          <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
          קסם!
        </button>
        
        <button
          onClick={clearAll}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-2 md:py-3 px-2 md:px-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1 text-sm md:text-base touch-manipulation"
          title="מחיקת כל הצורות"
        >
          <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
          נקה
        </button>

        <button
          onClick={undo}
          disabled={!canUndo}
          className={`font-bold py-2 md:py-3 px-2 md:px-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1 text-sm md:text-base touch-manipulation ${
            canUndo 
              ? 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 active:scale-95' 
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
          title="ביטול פעולה אחרונה"
        >
          <Undo2 className="w-3 h-3 md:w-4 md:h-4" />
          חזור
        </button>

        <button
          onClick={redo}
          disabled={!canRedo}
          className={`font-bold py-2 md:py-3 px-2 md:px-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1 text-sm md:text-base touch-manipulation ${
            canRedo 
              ? 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 active:scale-95' 
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
          title="החזרת פעולה שבוטלה"
        >
          <Redo2 className="w-3 h-3 md:w-4 md:h-4" />
          קדימה
        </button>
      </div>
    </div>
  );
}
