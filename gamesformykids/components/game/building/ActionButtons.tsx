'use client';

import React from 'react';
import { Sparkles, Trash2, Undo2, Redo2 } from 'lucide-react';

interface ActionButtonsProps {
  historyIndex: number;
  historyLength: number;
  onMagicShuffle: () => void;
  onClearAll: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export default function ActionButtons({ 
  historyIndex, 
  historyLength, 
  onMagicShuffle, 
  onClearAll, 
  onUndo, 
  onRedo 
}: ActionButtonsProps) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
      <h3 className="text-white font-bold text-lg mb-3 text-center">פעולות</h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onMagicShuffle}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-3 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-1"
        >
          <Sparkles className="w-4 h-4" />
          קסם!
        </button>
        
        <button
          onClick={onClearAll}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-3 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          נקה
        </button>

        <button
          onClick={onUndo}
          disabled={historyIndex <= 0}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-3 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-1"
        >
          <Undo2 className="w-4 h-4" />
          חזור
        </button>

        <button
          onClick={onRedo}
          disabled={historyIndex >= historyLength - 1}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-3 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-1"
        >
          <Redo2 className="w-4 h-4" />
          קדימה
        </button>
      </div>
    </div>
  );
}
