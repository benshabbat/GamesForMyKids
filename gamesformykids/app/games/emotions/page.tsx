'use client';

import { useState } from 'react';
import EmotionCard from './EmotionCard';
import StartScreen from './StartScreen';
import { useEmotionGame } from './useEmotionGame';
import { ALL_EMOTIONS } from '@/lib/constants/gameConstants';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function EmotionGamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const {
    gameState,
    speakEmotionName,
    startGame,
    handleEmotionClick,
    resetGame,
  } = useEmotionGame(ALL_EMOTIONS);

  if (!gameStarted) {
    return (
      <ErrorBoundary>
        <StartScreen
          emotions={ALL_EMOTIONS}
          onStart={() => {
            setGameStarted(true);
            startGame();
          }}
          onSpeak={speakEmotionName}
        />
      </ErrorBoundary>
    );
  }

  if (!gameState.isPlaying && gameState.score > 0) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              Great job learning emotions!
            </h2>
            <div className="text-lg text-gray-700 mb-6 space-y-2">
              <p>🎯 Score: {gameState.score}</p>
              <p>⭐ Level: {gameState.level}</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  resetGame();
                  startGame();
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg"
              >
                🔄 Play Again
              </button>
              <button
                onClick={() => {
                  setGameStarted(false);
                  resetGame();
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg"
              >
                🏠 Back to Start
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              😊 Emotions Game 😢
            </h1>
            <div className="flex justify-center items-center gap-6 text-white">
              <span className="text-lg">
                🎯 Score: {gameState.score}
              </span>
              <span className="text-lg">
                ⭐ Level: {gameState.level}
              </span>
            </div>
          </div>

          {/* Game Content */}
          {gameState.currentChallenge && (
            <EmotionCard
              emotion={gameState.currentChallenge}
              options={gameState.options}
              onAnswer={handleEmotionClick}
              onSpeak={speakEmotionName}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
