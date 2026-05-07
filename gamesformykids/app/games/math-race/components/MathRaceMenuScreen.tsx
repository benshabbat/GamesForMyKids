'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useMathRaceGame, GAME_TIME } from '../useMathRaceGame';

export default function MathRaceMenuScreen() {
  const { best, startGame } = useMathRaceGame();
  return (
    <GameMenuCard
      emoji="🏎️"
      title="מרוץ מתמטיקה"
      description={`פתור כמה שיותר תרגילים ב-${GAME_TIME} שניות!`}
      hint="רצף 3+ = 20 נקודות · הקושי עולה עם הניקוד"
      gradientClass="from-blue-100 to-indigo-200"
      buttonClass="from-blue-500 to-indigo-600"
      onStart={startGame}
      startLabel="🏎️ התחל!"
      best={best}
    />
  );
}
