"use client";

import CelebrationBox from "@/components/shared/CelebrationBox";
import { useDogGame } from "./useDogGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";

/**
 * משחק כלבים חדש - נוצר תוך 5 דקות! 🐕
 * העתקתי את page.tsx של ירקות והחלפתי רק כמה מילים
 */
export default function DogGame() {
  const {
    gameState,
    speakItemName: speakDogName,
    startGame,
    handleItemClick: handleDogClick,
    resetGame,
  } = useDogGame(); // ⭐ זה השינוי היחיד!

  if (!gameState.isPlaying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-brown-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-800 mb-8">🐕 משחק כלבים 🐶</h1>
          <button 
            onClick={startGame}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-lg text-2xl"
          >
            התחל משחק!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-brown-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-yellow-800"
            levelColor="text-yellow-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה כלב שמעת?"
              icon="🐕🐩🐶🦮"
              iconColor="text-yellow-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakDogName(gameState.currentChallenge!.name)}
              description="בחר את הכלב הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox
              label="כלב"
              value={gameState.currentChallenge.hebrew}
            />
          )}
        </div>

        {/* לוח הכלבים - מציג רק את 4 האפשרויות הנוכחיות */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleDogClick}
          currentChallenge={gameState.currentChallenge}
          showSoundIcon={true}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(dog) => (
            <div
              key={dog.name}
              className={`${dog.color} rounded-lg p-4 text-center cursor-pointer hover:scale-105 transition-transform`}
              onClick={() => handleDogClick(dog)}
            >
              <div className="text-4xl mb-2">{dog.emoji}</div>
              <div className="text-white font-bold">{dog.hebrew}</div>
            </div>
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את שם הכלב כשהאתגר מופיע!"
          description="לחץ על האייקון למעלה כדי לשמוע שוב, או לחץ על כלבים למטה כדי לשמוע את שמותיהם"
        />
      </div>
    </div>
  );
}
