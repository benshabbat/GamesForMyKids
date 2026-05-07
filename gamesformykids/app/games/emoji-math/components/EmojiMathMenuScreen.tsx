'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useEmojiMathGame } from '../useEmojiMathGame';

export default function EmojiMathMenuScreen() {
  const { best, startGame } = useEmojiMathGame();
  return (
    <GameMenuCard
      emoji="🧮"
      title="מתמטיקה עם אמוג'י"
      description="ספור את האמוג'י ופתור את התרגיל!"
      hint="3 חיים · רצף מנצח = +20 נקודות"
      gradientClass="from-yellow-100 to-orange-200"
      buttonClass="from-yellow-400 to-orange-500"
      onStart={startGame}
      startLabel="🧮 התחל!"
      best={best}
    />
  );
}
