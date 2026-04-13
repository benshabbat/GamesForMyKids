'use client';

import { useRef } from 'react';
import { Home, RotateCcw, Eye, Settings, Shuffle, Upload } from 'lucide-react';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import DifficultySelector from './DifficultySelector';

interface GameControlsProps {
  variant: 'simple' | 'custom';
}

export default function GameControls({ variant }: GameControlsProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const {
    gameStarted, showHints: hintsEnabled, showDebug: debugMode,
    resetGame, shufflePieces, toggleHints, toggleDebug, goToMenu, handleImageUpload,
  } = usePuzzleStore();

  const isCustom = variant === 'custom';
  const iconSize = isCustom ? 'w-5 h-5' : 'w-4 h-4';
  const btnBase = isCustom
    ? 'inline-flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium'
    : 'inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105';

  const resetColor = isCustom
    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white';

  const hintsActiveColor = isCustom
    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white';
  const hintsInactiveColor = isCustom
    ? 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white'
    : 'bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-700';

  const debugActiveColor = isCustom
    ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'
    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white';
  const debugInactiveColor = isCustom
    ? 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white'
    : 'bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-700';

  const buttons = (
    <>
      {isCustom ? (
        <>
          <input type="file" accept="image/*" onChange={handleImageUpload} ref={uploadRef} className="hidden" />
          <button
            onClick={() => uploadRef.current?.click()}
            className={`${btnBase} bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white`}
          >
            <Upload className={iconSize} />
            <span className="hidden sm:inline">תמונה חדשה</span>
            <span className="sm:hidden">חדש</span>
          </button>
          <button
            onClick={shufflePieces}
            className={`${btnBase} bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            disabled={!gameStarted}
          >
            <Shuffle className={iconSize} />
            <span className="hidden sm:inline">ערבב חלקים</span>
            <span className="sm:hidden">ערבב</span>
          </button>
        </>
      ) : (
        <button
          onClick={goToMenu}
          className={`${btnBase} bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white`}
        >
          <Home className={iconSize} />
          <span className="hidden sm:inline">בחר פאזל אחר</span>
          <span className="sm:hidden">פאזל אחר</span>
        </button>
      )}

      <button
        onClick={resetGame}
        className={`${btnBase} ${resetColor} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        disabled={!gameStarted}
      >
        <RotateCcw className={iconSize} />
        <span className="hidden sm:inline">התחל מחדש</span>
        <span className="sm:hidden">מחדש</span>
      </button>

      <button
        onClick={toggleHints}
        className={`${btnBase} ${hintsEnabled ? hintsActiveColor : hintsInactiveColor}`}
      >
        <Eye className={iconSize} />
        {isCustom ? (
          <>
            <span className="hidden sm:inline">רמזים</span>
            <span className="sm:hidden">💡</span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline">רמזים {hintsEnabled ? 'פעיל' : 'כבוי'}</span>
            <span className="sm:hidden">{hintsEnabled ? '👁️' : '👁️‍🗨️'}</span>
          </>
        )}
      </button>

      <button
        onClick={toggleDebug}
        className={`${btnBase} ${debugMode ? debugActiveColor : debugInactiveColor}`}
      >
        <Settings className={iconSize} />
        {isCustom ? (
          <>
            <span className="hidden sm:inline">ניפוי באגים</span>
            <span className="sm:hidden">🔧</span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline">ניפוי באגים {debugMode ? 'פעיל' : 'כבוי'}</span>
            <span className="sm:hidden">{debugMode ? '⚙️' : '🔧'}</span>
          </>
        )}
      </button>
    </>
  );

  if (isCustom) {
    return (
      <div className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🎮 פקדי משחק</h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {buttons}
          </div>
          <DifficultySelector />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4 mb-6 flex-wrap">
      {buttons}
    </div>
  );
}
