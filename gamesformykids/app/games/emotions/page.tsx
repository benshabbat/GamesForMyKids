"use client";

import { useState } from 'react';
import { EmotionCard } from '@/components/shared/CardPresets'; // ⭐ קארד חדש!
import StartScreen from './StartScreen';
import { useEmotionGameDry } from "./useEmotionGameDry"; // ⭐ השינוי היחיד!
import { ALL_EMOTIONS } from '@/lib/constants';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CelebrationBox from "@/components/shared/CelebrationBox";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";

export default function EmotionGamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const {
    gameState,
    speakItemName: speakEmotionName, // שינוי שם בלבד
    startGame,
    handleItemClick: handleEmotionClick, // שינוי שם בלבד
    resetGame,
  } = useEmotionGameDry(); // ⭐ לא צריך לשלוח ALL_EMOTIONS!

  if (!gameStarted) {
    return (
      <ErrorBoundary>
        <StartScreen
          items={ALL_EMOTIONS}
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
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              עבודה מצוינת בלימוד רגשות!
            </h2>
              <div className="text-lg text-gray-700 mb-6 space-y-2">
              <p>🎯 ניקוד: {gameState.score}</p>
              <p>⭐ רמה: {gameState.level}</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  resetGame();
                  startGame();
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg"
              >
                🔄 שחק שוב
              </button>
              <button
                onClick={() => {
                  setGameStarted(false);
                  resetGame();
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg"
              >
                🏠 חזור להתחלה
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header עם ניקוד */}
          <div className="text-center mb-8">
            <GameHeader
              score={gameState.score}
              level={gameState.level}
              onHome={() => (window.location.href = "/")}
              onReset={resetGame}
              scoreColor="text-orange-700"
              levelColor="text-orange-600"
            />

            {/* האתגר הנוכחי */}
            {gameState.currentChallenge && !gameState.showCelebration && (
              <ChallengeBox
                title="מצא את הרגש:"
                icon="😊"
                iconColor="text-orange-700"
                challengeText={gameState.currentChallenge.hebrew}
                onSpeak={() => speakEmotionName(gameState.currentChallenge!.name)}
                description="לחץ על הרגש הנכון!"
              />
            )}

            {/* חגיגת הצלחה */}
            {gameState.showCelebration && gameState.currentChallenge && (
              <CelebrationBox
                label="רגש"
                value={gameState.currentChallenge.hebrew}
              />
            )}
          </div>

          {/* לוח הרגשות - מציג רק את 4 האפשרויות הנוכחיות */}
          <GameCardGrid
            items={gameState.options}
            onItemClick={handleEmotionClick}
            currentChallenge={gameState.currentChallenge}
            showSoundIcon={true}
            gridCols="grid-cols-2"
            maxWidth="max-w-3xl"
            renderCustomCard={(emotion) => (
              <EmotionCard
                emotion={emotion}
                onClick={handleEmotionClick}
              />
            )}
          />

          {/* טיפים */}
          <TipsBox
            tip="💡 טיפ: תשמע את שם הרגש כשהאתגר מופיע!"
            description="לחץ על שם הרגש כדי לשמוע שוב, או על הרגשות למטה לתרגול"
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}
