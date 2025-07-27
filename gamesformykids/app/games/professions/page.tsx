"use client";

import { ProfessionItem } from "@/lib/types/games";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useProfessionGameDry } from "./useProfessionGameDry"; // ⭐ השינוי היחיד!
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import ProfessionCard from "./ProfessionCard";
import { ALL_PROFESSIONS } from "@/lib/constants";

export default function ProfessionGame() {
  const professions: ProfessionItem[] = ALL_PROFESSIONS as ProfessionItem[];

  const {
    gameState,
    speakItemName: speakProfessionName, // שינוי שם בלבד
    startGame,
    handleItemClick: handleProfessionClick, // שינוי שם בלבד
    resetGame,
  } = useProfessionGameDry(); // ⭐ לא צריך לשלוח professions!

  // Wrapper function for speaking profession by name
  const speakByName = (professionId: string) => {
    const profession = professions.find(p => p.id === professionId);
    if (profession) {
      speakProfessionName(profession);
    }
  };

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={professions}
        onStart={startGame}
        onSpeak={speakByName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-purple-800"
            levelColor="text-purple-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה מקצוע זה?"
              icon="👩‍⚕️👨‍🚒👩‍🏫👮‍♀️"
              iconColor="text-purple-800"
              challengeText={gameState.currentChallenge.description}
              onSpeak={() => speakProfessionName(gameState.currentChallenge!)}
              description="בחר את המקצוע הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="מקצוע" 
              value={gameState.currentChallenge.name} 
            />
          )}
        </div>

        {/* אפשרויות המקצועות */}
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
          {gameState.options.map((profession: ProfessionItem) => (
            <ProfessionCard
              key={profession.id}
              profession={profession}
              onClick={handleProfessionClick}
            />
          ))}
        </div>
        
        <TipsBox
          tip="💡 טיפ: תשמע את תיאור המקצוע!"
          description="לחץ על הסמל למעלה כדי לשמוע שוב, או על המקצועות למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}
