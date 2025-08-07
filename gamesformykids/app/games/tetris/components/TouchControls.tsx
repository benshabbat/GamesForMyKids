import React, { useCallback } from 'react';
import { TouchControlsProps } from '../types';

const TouchControls: React.FC<TouchControlsProps> = ({ 
  isGameRunning, 
  gameOver, 
  score, 
  onMove, 
  onRotate, 
  onStartGame,
  isDesktop = false
}) => {
  // אופטימיזציה למובייל - דיבאונס לכפתורים
  const handleMove = useCallback((dx: number, dy: number) => {
    if (!isGameRunning) return;
    onMove(dx, dy);
  }, [isGameRunning, onMove]);

  const handleRotate = useCallback(() => {
    if (!isGameRunning) return;
    onRotate();
  }, [isGameRunning, onRotate]);

  // פריסה למחשב
  if (isDesktop) {
    return (
      <div className="space-y-6">
        {/* Game Over / Start Game */}
        {gameOver && (
          <div className="text-center bg-red-500/90 text-white p-4 rounded-xl backdrop-blur-sm border border-red-300/30">
            <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
            <p className="text-lg mb-4">Your Score: {score}</p>
            <button
              onClick={onStartGame}
              className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Play Again
            </button>
          </div>
        )}

        {!isGameRunning && !gameOver && (
          <div className="text-center">
            <button
              onClick={onStartGame}
              className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Desktop Controls - Keyboard Instructions */}
        {isGameRunning && (
          <div className="bg-black/60 p-4 rounded-xl backdrop-blur-sm border border-blue-300/30">
            <h3 className="text-white font-bold text-lg mb-3 text-center">פקדי מקלדת</h3>
            <div className="space-y-2 text-white text-sm">
              <div className="flex justify-between">
                <span>הזזה שמאלה:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">←</span>
              </div>
              <div className="flex justify-between">
                <span>הזזה ימינה:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">→</span>
              </div>
              <div className="flex justify-between">
                <span>הזזה מטה:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">↓</span>
              </div>
              <div className="flex justify-between">
                <span>סיבוב:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">↑</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // פריסה למובייל
  return (
    <div className="mt-8 w-full max-w-lg">
      {/* Rotate Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleRotate}
          className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-green-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          🔄 סיבוב
        </button>
      </div>
      
      {/* Movement Controls */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => handleMove(-1, 0)}
          className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-blue-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          ⬅️
        </button>
        <button
          onClick={() => handleMove(0, 1)}
          className="bg-gradient-to-br from-red-400 to-red-600 text-white p-4 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-red-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          ⬇️ מהר
        </button>
        <button
          onClick={() => handleMove(1, 0)}
          className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-blue-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          ➡️
        </button>
      </div>
      
      {/* Start Button */}
      <button
        onClick={onStartGame}
        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white px-8 py-5 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-white/30 touch-manipulation"
      >
        {gameOver ? '🔄 משחק חדש' : isGameRunning ? '🔄 התחל מחדש' : '▶️ התחל לשחק'}
      </button>
      
      {/* Game Over Message */}
      {gameOver && (
        <div className="bg-gradient-to-br from-red-400/20 to-pink-500/20 backdrop-blur-lg border-2 border-red-400/50 rounded-2xl p-6 text-center mt-6 shadow-2xl">
          <h3 className="text-2xl font-black text-white mb-2 drop-shadow-lg">🎯 המשחק הסתיים!</h3>
          <p className="text-yellow-300 text-xl font-bold drop-shadow-lg">הניקוד שלך: {score.toLocaleString()}</p>
        </div>
      )}
      
      {/* Control Instructions */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-4 mt-6 text-center border border-white/20">
        <p className="text-white/80 font-medium">
          השתמש בכפתורים למעלה או בחיצי המקלדת 📱⌨️
        </p>
      </div>
    </div>
  );
};

export default TouchControls;
