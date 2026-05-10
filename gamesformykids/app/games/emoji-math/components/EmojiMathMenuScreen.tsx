'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { DifficultyPicker } from '@/components/game/shared/DifficultyPicker';
import { useEmojiMathGame } from '../useEmojiMathGame';
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';

const LIVES_BY_DIFF = { easy: 5, medium: 3, hard: 2 } as const;
const TIME_BY_DIFF  = { easy: 12, medium: 8, hard: 5 } as const;

export default function EmojiMathMenuScreen() {
  const { best, startGame } = useEmojiMathGame();
  const { difficulty } = useGameDifficulty();
  return (
    <GameMenuCard
      emoji="🧮"
      title="מתמטיקה עם אמוג'י"
      description="ספור את האמוג'י ופתור את התרגיל!"
      hint={`${LIVES_BY_DIFF[difficulty]} חיים · ${TIME_BY_DIFF[difficulty]} שניות · רצף מנצח = +20 נקודות`}
      gradientClass="from-yellow-100 to-orange-200"
      buttonClass="from-yellow-400 to-orange-500"
      onStart={startGame}
      startLabel="🧮 התחל!"
      best={best}
    >
      <DifficultyPicker />
    </GameMenuCard>
  );
}
