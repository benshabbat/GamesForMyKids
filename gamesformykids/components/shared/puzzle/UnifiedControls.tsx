'use client';

import { RefObject } from 'react';
import { Home, RotateCcw, Eye, Settings, Shuffle, Upload } from 'lucide-react';

interface UnifiedControlsProps {
  type: 'simple' | 'custom';
  gameStarted: boolean;
  hintsEnabled: boolean;
  debugMode: boolean;
  onResetGame: () => void;
  onToggleHints: () => void;
  onToggleDebug: () => void;
  
  // Simple puzzle specific
  onGoHome?: () => void;
  
  // Custom puzzle specific
  difficulty?: number;
  fileInputRef?: RefObject<HTMLInputElement | null>;
  onShufflePieces?: () => void;
  onDifficultyChange?: (difficulty: number) => void;
}

export default function UnifiedControls({
  type,
  gameStarted,
  hintsEnabled,
  debugMode,
  onResetGame,
  onToggleHints,
  onToggleDebug,
  onGoHome,
  difficulty,
  fileInputRef,
  onShufflePieces,
  onDifficultyChange
}: UnifiedControlsProps) {
  if (type === 'simple') {
    // Simple puzzle controls - horizontal layout
    return (
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {onGoHome && (
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">בחר פאזל אחר</span>
            <span className="sm:hidden">פאזל אחר</span>
          </button>
        )}
        
        <button
          onClick={onResetGame}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={!gameStarted}
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">התחל מחדש</span>
          <span className="sm:hidden">מחדש</span>
        </button>
        
        <button
          onClick={onToggleHints}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
            hintsEnabled 
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white' 
              : 'bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">רמזים {hintsEnabled ? 'פעיל' : 'כבוי'}</span>
          <span className="sm:hidden">{hintsEnabled ? '👁️' : '👁️‍🗨️'}</span>
        </button>
        
        <button
          onClick={onToggleDebug}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
            debugMode 
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white' 
              : 'bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-700'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">ניפוי באגים {debugMode ? 'פעיל' : 'כבוי'}</span>
          <span className="sm:hidden">{debugMode ? '⚙️' : '🔧'}</span>
        </button>
      </div>
    );
  }

  // Custom puzzle controls - card layout
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
          
          {onShufflePieces && (
            <button
              onClick={onShufflePieces}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!gameStarted}
            >
              <Shuffle className="w-5 h-5" />
              <span className="hidden sm:inline">ערבב חלקים</span>
              <span className="sm:hidden">ערבב</span>
            </button>
          )}
          
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
        
        {/* Difficulty selector for custom puzzles */}
        {difficulty !== undefined && onDifficultyChange && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-700 mb-3 text-center">רמת קושי</h4>
            <div className="flex justify-center gap-2">
              {[2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => onDifficultyChange(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                    difficulty === level
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {level}x{level}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
