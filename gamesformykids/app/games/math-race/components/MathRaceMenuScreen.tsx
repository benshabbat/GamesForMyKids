'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { DifficultyPicker } from '@/components/game/shared/DifficultyPicker';
import { useMathRaceGame } from '../useMathRaceGame';
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';

const TIME_BY_DIFF = { easy: 45, medium: 30, hard: 20 } as const;

export default function MathRaceMenuScreen() {
  const { best, startGame } = useMathRaceGame();
  const { difficulty } = useGameDifficulty();
  return (
    <GameMenuCard
      emoji="🏎️"
      title="מרוץ מתמטיקה"
      description={`פתור כמה שיותר תרגילים ב-${TIME_BY_DIFF[difficulty]} שניות!`}
      hint="רצף 3+ = 20 נקודות · הקושי עולה עם הניקוד"
      gradientClass="from-blue-100 to-indigo-200"
      buttonClass="from-blue-500 to-indigo-600"
      onStart={startGame}
      startLabel="🏎️ התחל!"
      best={best}
    >
      <DifficultyPicker />
    </GameMenuCard>
  );
}
