"use client";

import { BaseGameItem } from "@/lib/types/base";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useWeatherGameDry } from "./useWeatherGameDry"; // ⭐ השינוי היחיד!
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import WeatherCard from "./WeatherCard";
import { ALL_WEATHERS } from "@/lib/constants";

export default function WeatherGame() {
  const weathers: BaseGameItem[] = ALL_WEATHERS;

  const {
    gameState,
    speakItemName: speakWeatherName, // שינוי שם בלבד
    startGame,
    handleItemClick: handleWeatherClick, // שינוי שם בלבד
    resetGame,
  } = useWeatherGameDry(); // ⭐ לא צריך לשלוח weathers!

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={weathers}
        onStart={startGame}
        onSpeak={speakWeatherName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-sky-800"
            levelColor="text-sky-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה מזג אוויר שמעת?"
              icon="🌤️☀️🌧️❄️"
              iconColor="text-sky-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakWeatherName(gameState.currentChallenge!.name)}
              description="בחר את מזג האוויר הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="מזג אוויר" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        {/* אפשרויות מזג האוויר */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleWeatherClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(weather) => (
            <WeatherCard
              weather={weather}
              onClick={handleWeatherClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את מזג האוויר שאני אומר!"
          description="לחץ על הסמל למעלה כדי לשמוע שוב, או על מזג האוויר למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}
