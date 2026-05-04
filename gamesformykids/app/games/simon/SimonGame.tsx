'use client';
import { useSimonGame } from './useSimonGame';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import SimonBoard from './components/SimonBoard';
import SimonGameOverScreen from './components/SimonGameOverScreen';

export default function SimonGame() {
  const { phase, best, roundScore, startGame, handleTap } = useSimonGame();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {phase === 'menu' && (
        <GameMenuCard
          emoji="🔴"
          title="שיימון אומר"
          description="צפה בסדר הצבעים וחזור עליהם בדיוק!"
          hint="כל סיבוב — עוד צבע אחד"
          gradientClass="from-gray-800 to-gray-900"
          buttonClass="from-gray-600 to-gray-800"
          onStart={startGame}
          startLabel="🔴 התחל!"
          best={best}
        />
      )}
      {(phase === 'showing' || phase === 'input') && <SimonBoard onTap={handleTap} />}
      {phase === 'dead' && <SimonGameOverScreen roundScore={roundScore} best={best} onRestart={startGame} />}
    </div>
  );
}
