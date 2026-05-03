'use client';

import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface Props {
  best: number;
  gameTime: number;
  onStart: () => void;
}

export default function MathRaceMenuScreen({ best, gameTime, onStart }: Props) {
  return (
    <GameMenuCard
      emoji="🏎️"
      title="מרוץ מתמטיקה"
      description={`פתור כמה שיותר תרגילים ב-${gameTime} שניות!`}
      hint="רצף 3+ = 20 נקודות · הקושי עולה עם הניקוד"
      gradientClass="from-blue-100 to-indigo-200"
      buttonClass="from-blue-500 to-indigo-600"
      onStart={onStart}
      startLabel="🏎️ התחל!"
      best={best}
    />
  );
}
