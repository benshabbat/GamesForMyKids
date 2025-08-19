"use client";

import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import CountingCard from "@/components/game/counting/CountingCard";
import { useCountingGame } from "./useCountingGame";
import CountingStartScreen from "@/components/game/counting/CountingStartScreen";

export default function CountingGame() {
  const {
    gameState,
    handleNumberClick,
    startGame,
    speakQuestion,
  } = useCountingGame();

  console.log("CountingGame render - gameState:", gameState);

  if (!gameState || !gameState.isPlaying) {
    console.log("Showing start screen - isPlaying:", gameState?.isPlaying);
    return <CountingStartScreen startGame={startGame} speakQuestion={speakQuestion} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <GameHeader />
        </div>

        {/* Challenge Display */}
        {gameState.currentChallenge && (
          <div className="text-center mb-8">
            {/* Display counting items */}
            <div className="text-6xl mb-4 leading-relaxed">
              {gameState.currentChallenge.emoji.repeat(gameState.currentChallenge.correctAnswer)}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              כמה {gameState.currentChallenge.itemPlural} יש?
            </h2>
          </div>
        )}

        {/* Number Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {gameState.options.map((number) => (
            <CountingCard
              key={number}
              number={number}
              onClick={handleNumberClick}
            />
          ))}
        </div>

        {/* Tips */}
        <TipsBox />

        {/* Celebration */}
        {gameState.showCelebration && gameState.currentChallenge && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-3xl p-8 text-center shadow-2xl transform animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">מעולה!</h2>
              <p className="text-xl text-gray-700 mb-4">
                התשובה נכונה! יש {gameState.currentChallenge.correctAnswer} {gameState.currentChallenge.itemPlural}
              </p>
              <div className="text-lg text-purple-600 font-semibold">
                + 10 נקודות
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
