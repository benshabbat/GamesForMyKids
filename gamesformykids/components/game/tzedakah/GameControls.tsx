import React from 'react';

interface GameControlsProps {
  gameStarted: boolean;
  gameTime: number;
  score: number;
  collectedCoins: number;
  nextGame: { title: string; href: string };
  isMobile: boolean;
  onStartGame: () => void;
  onNavigateToNext: () => void;
  onNavigateHome: () => void;
}

export default function GameControls({
  gameStarted,
  gameTime,
  score,
  collectedCoins,
  nextGame,
  isMobile,
  onStartGame,
  onNavigateToNext,
  onNavigateHome
}: GameControlsProps) {
  return (
    <div className="flex justify-center mb-6">
      {!gameStarted && gameTime > 0 && (
        <button
          onClick={onStartGame}
          className={`bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-green-300 ${
            isMobile ? 'py-3 px-6 text-lg' : 'py-4 px-8 text-2xl'
          }`}
        >
          🎮 התחל משחק!
        </button>
      )}

      {gameTime <= 0 && score > 0 && (
        <div className={`bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-yellow-400 rounded-2xl text-center shadow-2xl mx-auto ${
          isMobile ? 'p-4 max-w-sm' : 'p-6 max-w-md'
        }`}>
          <div className={isMobile ? 'text-4xl mb-3' : 'text-6xl mb-4'}>🎉</div>
          <h2 className={`font-bold text-purple-800 mb-3 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            המשחק נגמר!
          </h2>
          <p className={`text-gray-700 mb-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>
            הניקוד הסופי שלך: <span className="font-bold text-blue-600">{score}</span>
          </p>
          <p className={`text-gray-600 mb-4 ${isMobile ? 'text-sm' : 'text-lg'}`}>
            תפסת <span className="font-bold text-green-600">{collectedCoins}</span> מטבעות! 🪙
          </p>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={onStartGame}
              className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isMobile ? 'py-2 px-4 text-sm' : 'py-3 px-6'
              }`}
            >
              🔄 שחק שוב
            </button>
            
            <button
              onClick={onNavigateToNext}
              className={`bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${
                isMobile ? 'py-2 px-4 text-sm' : 'py-3 px-6'
              }`}
            >
              <span>🎮</span>
              <span>עבור ל{nextGame.title}</span>
              <span>→</span>
            </button>
            
            <button
              onClick={onNavigateHome}
              className={`bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-bold rounded-lg transition-all duration-300 ${
                isMobile ? 'py-1 px-3 text-xs' : 'py-2 px-4 text-sm'
              }`}
            >
              🏠 חזרה לעמוד הראשי
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
