'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface Props {
  best: number;
  onStart: () => void;
}

export default function EmojiMathMenuScreen({ best, onStart }: Props) {
  return (
    <GameMenuCard
      emoji="🧮"
      title="מתמטיקה עם אמוג'י"
      description="ספור את האמוג'י ופתור את התרגיל!"
      hint="3 חיים · רצף מנצח = +20 נקודות"
      gradientClass="from-yellow-100 to-orange-200"
      buttonClass="from-yellow-400 to-orange-500"
      onStart={onStart}
      startLabel="🧮 התחל!"
      best={best}
    />
  );
}
