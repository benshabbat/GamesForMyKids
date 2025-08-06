"use client";

import { BaseGameItem } from "@/lib/types";
import CelebrationBox from "@/components/shared/CelebrationBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import CountingCard from "./CountingCard";
import { useCountingGame } from "./useCountingGame";
import StartScreen from "./StartScreen";

export default function CountingGame() {
  // משחק הספירה לא משתמש ב-items כמו שאר המשחקים
  const emptyItems: BaseGameItem[] = [];

  const {
    gameState,
    speakQuestion,
    startGame,
    handleNumberClick,
    resetGame,
  } = useCountingGame();

  if (!gameState || !gameState.isPlaying) {
    return <StartScreen items={emptyItems} onStart={startGame} onSpeak={speakQuestion} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            levelColor="text-purple-600"
          />
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
        <TipsBox 
          tip="💡 טיפ: ספור את האימוג'ים על המסך!"
          description="שים לב לכמות האימוג'ים ובחר את המספר הנכון"
        />

        {/* Celebration */}
        {gameState.showCelebration && gameState.currentChallenge && (
          <CelebrationBox 
            label="תשובה נכונה!" 
            value={`יש ${gameState.currentChallenge.correctAnswer} ${gameState.currentChallenge.correctAnswer === 1 ? gameState.currentChallenge.itemName : gameState.currentChallenge.itemPlural}`}
          />
        )}
      </div>
    </div>
  );
}
