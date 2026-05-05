'use client';

import { useMemoryStore } from "../stores/useMemoryStore";

export default function GameTimeoutScreen() {
  const { gameStats, difficulty, getDifficultyConfig, initializeGame, resetToMenu } = useMemoryStore();
  const difficultyConfig = getDifficultyConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto text-center p-8 bg-white/80 rounded-3xl shadow-xl">
        <div className="text-6xl mb-4">⏰</div>
        <h2 className="text-4xl font-bold text-purple-800 mb-2">נגמר הזמן!</h2>
        <p className="text-xl text-purple-600 mb-6">
          ברמת <span className="font-bold">{difficultyConfig.name}</span>
        </p>
        <div className="bg-purple-100 rounded-xl p-4 mb-8">
          <div className="text-3xl font-bold text-purple-700">{gameStats.score} נקודות</div>
          <div className="text-gray-600 mt-1">זוגות שנמצאו: {gameStats.matches}</div>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => initializeGame(difficulty)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🎮 נסה שוב
          </button>
          <button
            onClick={resetToMenu}
            className="bg-white/80 hover:bg-white text-gray-700 font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-200"
          >
            🏠 תפריט
          </button>
        </div>
      </div>
    </div>
  );
}
