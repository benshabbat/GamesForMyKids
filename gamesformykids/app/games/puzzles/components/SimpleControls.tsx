'use client';

import { Home, RotateCcw, Eye, Settings } from 'lucide-react';
import { usePuzzleContext } from '@/contexts';

export default function SimpleControls() {
  const { state, resetGame, toggleHints, toggleDebug, goToMenu } = usePuzzleContext();
  const { gameStarted, showHints: hintsEnabled, showDebug: debugMode } = state;
  const onGoHome = goToMenu;
  const onResetGame = resetGame;
  const onToggleHints = toggleHints;
  const onToggleDebug = toggleDebug;
  return (
    <div className="flex justify-center gap-4 mb-6 flex-wrap">
      <button
        onClick={onGoHome}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">בחר פאזל אחר</span>
        <span className="sm:hidden">פאזל אחר</span>
      </button>

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
