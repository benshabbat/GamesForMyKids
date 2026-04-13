'use client';

import { RefObject } from 'react';
import { RotateCcw, Eye, Settings, Shuffle, Upload } from 'lucide-react';
import { usePuzzleContext } from '@/contexts';
import DifficultySelector from './DifficultySelector';

interface CustomControlsProps {
  fileInputRef?: RefObject<HTMLInputElement | null>;
}

export default function CustomControls({ fileInputRef }: CustomControlsProps) {
  const { state, resetGame, shufflePieces, toggleHints, toggleDebug } = usePuzzleContext();
  const { gameStarted, showHints: hintsEnabled, showDebug: debugMode } = state;
  const onResetGame = resetGame;
  const onShufflePieces = shufflePieces;
  const onToggleHints = toggleHints;
  const onToggleDebug = toggleDebug;
  return (
    <div className="mb-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🎮 פקדי משחק</h3>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {fileInputRef && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium"
            >
              <Upload className="w-5 h-5" />
              <span className="hidden sm:inline">תמונה חדשה</span>
              <span className="sm:hidden">חדש</span>
            </button>
          )}

          <button
            onClick={onShufflePieces}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={!gameStarted}
          >
            <Shuffle className="w-5 h-5" />
            <span className="hidden sm:inline">ערבב חלקים</span>
            <span className="sm:hidden">ערבב</span>
          </button>

          <button
            onClick={onResetGame}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={!gameStarted}
          >
            <RotateCcw className="w-5 h-5" />
            <span className="hidden sm:inline">התחל מחדש</span>
            <span className="sm:hidden">מחדש</span>
          </button>

          <button
            onClick={onToggleHints}
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
            onClick={onToggleDebug}
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
