'use client';

import { useRef } from 'react';
import { Home, RotateCcw, Eye, Settings, Shuffle, Upload } from 'lucide-react';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import DifficultySelector from '../shared/DifficultySelector';

export default function CustomControls() {
  const uploadRef = useRef<HTMLInputElement>(null);
  const {
    gameStarted, showHints: hintsEnabled, showDebug: debugMode,
    resetGame, shufflePieces, toggleHints, toggleDebug, handleImageUpload,
  } = usePuzzleStore();

  return (
    <div className="mb-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🎮 פקדי משחק</h3>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <input type="file" accept="image/*" onChange={handleImageUpload} ref={uploadRef} className="hidden" />
          <button
            onClick={() => uploadRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <Upload className="w-5 h-5" />
            <span className="hidden sm:inline">תמונה חדשה</span>
            <span className="sm:hidden">חדש</span>
          </button>
          <button
            onClick={shufflePieces}
            disabled={!gameStarted}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Shuffle className="w-5 h-5" />
            <span className="hidden sm:inline">ערבב חלקים</span>
            <span className="sm:hidden">ערבב</span>
          </button>
          <button
            onClick={resetGame}
            disabled={!gameStarted}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="hidden sm:inline">התחל מחדש</span>
            <span className="sm:hidden">מחדש</span>
          </button>
          <button
            onClick={toggleHints}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium ${
              hintsEnabled
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white'
            }`}
          >
            <Eye className="w-5 h-5" />
            <span className="hidden sm:inline">רמזים</span>
            <span className="sm:hidden">💡</span>
          </button>
          <button
            onClick={toggleDebug}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium ${
              debugMode
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'
                : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">ניפוי באגים</span>
            <span className="sm:hidden">🔧</span>
          </button>
        </div>
        <DifficultySelector />
      </div>
    </div>
  );
}
