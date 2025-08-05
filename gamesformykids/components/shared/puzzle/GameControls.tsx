'use client';

import { RefObject } from 'react';
import { Shuffle, RotateCcw, Upload, Lightbulb, Eye, EyeOff } from 'lucide-react';

interface GameControlsProps {
  gameStarted: boolean;
  showHints: boolean;
  showDebug: boolean;
  difficulty: number;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onShufflePieces: () => void;
  onResetGame: () => void;
  onToggleHints: () => void;
  onToggleDebug: () => void;
  onDifficultyChange: (difficulty: number) => void;
}

export default function GameControls({
  gameStarted,
  showHints,
  showDebug,
  difficulty,
  fileInputRef,
  onShufflePieces,
  onResetGame,
  onToggleHints,
  onToggleDebug,
  onDifficultyChange
}: GameControlsProps) {
  return (
    <div className="mb-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🎮 פקדי משחק</h3>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium"
          >
            <Upload className="w-5 h-5" />
            <span className="hidden sm:inline">תמונה חדשה</span>
            <span className="sm:hidden">חדש</span>
          </button>
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={!gameStarted}
          >
            <RotateCcw className="w-5 h-5" />
            <span className="hidden sm:inline">התחל מחדש</span>
            <span className="sm:hidden">איפוס</span>
          </button>
          <button
            onClick={onToggleHints}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              showHints 
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 hover:from-yellow-500 hover:to-yellow-600' 
                : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600'
            }`}
            disabled={!gameStarted}
          >
            <Lightbulb className="w-5 h-5" />
            <span className="hidden sm:inline">רמזים</span>
            <span className="sm:hidden">💡</span>
          </button>
          <button
            onClick={onToggleDebug}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium ${
              showDebug 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600' 
                : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600'
            }`}
          >
            {showDebug ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <span className="hidden sm:inline">דיבוג</span>
            <span className="sm:hidden">🔧</span>
          </button>
        </div>
        
        {/* Difficulty selector */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <label className="text-lg font-bold text-gray-700">🎯 רמת קושי:</label>
            <select
              value={difficulty}
              onChange={(e) => onDifficultyChange(Number(e.target.value))}
              className="px-4 py-3 border-2 border-gray-300 rounded-xl bg-white text-gray-800 font-semibold text-base shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value={4}>🟢 קל (2x2) - 4 חלקים</option>
              <option value={9}>🟡 בינוני (3x3) - 9 חלקים</option>
              <option value={16}>🟠 קשה (4x4) - 16 חלקים</option>
              <option value={25}>🔴 מומחה (5x5) - 25 חלקים</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
