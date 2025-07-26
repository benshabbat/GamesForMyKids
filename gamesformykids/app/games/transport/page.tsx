"use client";

import { Transport } from "@/lib/types/game";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useTransportGame } from "./useTransportGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import TransportCard from "./TransportCard";
import { ALL_TRANSPORTS } from "@/lib/constants/gameConstants";

export default function TransportGame() {
  const transports: Transport[] = ALL_TRANSPORTS;

  const {
    gameState,
    speakTransportName,
    startGame,
    handleTransportClick,
    resetGame,
  } = useTransportGame(transports);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        transports={transports}
        onStart={startGame}
        onSpeak={speakTransportName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-blue-800"
            levelColor="text-blue-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה כלי תחבורה שמעת?"
              icon="🚗🚂✈️🚢"
              iconColor="text-blue-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakTransportName(gameState.currentChallenge!.name)}
              description="בחר את כלי התחבורה הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="כלי תחבורה" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        {/* אפשרויות כלי התחבורה */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleTransportClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(transport) => (
            <TransportCard
              transport={transport}
              onClick={handleTransportClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את שם כלי התחבורה שאני אומר!"
          description="לחץ על הסמל למעלה כדי לשמוע שוב, או על כלי התחבורה למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}
