'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { DifficultyPicker } from '@/components/game/shared/DifficultyPicker';
import { useTrueFalseGame } from '../useTrueFalseGame';
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';

const LIVES_BY_DIFF = { easy: 5, medium: 3, hard: 2 } as const;
const TIME_BY_DIFF  = { easy: 10, medium: 6, hard: 4 } as const;

export default function TrueFalseMenuScreen() {
  const { best, startGame } = useTrueFalseGame();
  const { difficulty } = useGameDifficulty();
  return (
    <GameMenuCard
      emoji="🤔"
      title="נכון או לא נכון?"
      description="קרא את המשפט ולחץ ✅ או ❌"
      hint={`${LIVES_BY_DIFF[difficulty]} חיים · ${TIME_BY_DIFF[difficulty]} שניות לכל שאלה`}
      gradientClass="from-teal-100 to-cyan-200"
      buttonClass="from-teal-500 to-cyan-600"
      onStart={startGame}
      startLabel="✅ התחל!"
      best={best}
    >
      <DifficultyPicker />
    </GameMenuCard>
  );
}
