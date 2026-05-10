'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { DifficultyPicker } from '@/components/game/shared/DifficultyPicker';
import { useColorTapGame } from '../useColorTapGame';
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';

const LIVES_BY_DIFF = { easy: 5, medium: 3, hard: 2 } as const;
const TIME_BY_DIFF  = { easy: 8, medium: 5, hard: 3 } as const;

export default function ColorTapMenuScreen() {
  const { best, startGame } = useColorTapGame();
  const { difficulty } = useGameDifficulty();
  return (
    <GameMenuCard
      emoji="🎨"
      title="צבע נכון"
      description="בחר את הצבע הנכון לפני שהזמן נגמר!"
      hint={`${LIVES_BY_DIFF[difficulty]} חיים · ${TIME_BY_DIFF[difficulty]} שניות לכל שאלה`}
      gradientClass="from-pink-100 to-purple-200"
      buttonClass="from-pink-500 to-purple-600"
      onStart={startGame}
      startLabel="🎨 התחל!"
      best={best}
    >
      <DifficultyPicker />
    </GameMenuCard>
  );
}
