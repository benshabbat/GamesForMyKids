'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useSimonGame } from '../useSimonGame';

export default function SimonMenuScreen() {
  const { best, startGame } = useSimonGame();
  return (
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
  );
}
