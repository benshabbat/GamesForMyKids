'use client';

import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface Best {
  level: number;
  time: number;
}

interface Props {
  best: Best | null;
  onStart: () => void;
}

export default function NumberBubblesMenuScreen({ best, onStart }: Props) {
  return (
    <GameMenuCard
      emoji="🔢"
      title="בועות מספרים"
      description="פוצץ את הבועות לפי הסדר: 1, 2, 3..."
      hint="כל רמה יש יותר מספרים!"
      gradientClass="from-sky-100 to-blue-200"
      buttonClass="from-sky-500 to-blue-600"
      onStart={onStart}
      startLabel="🔢 התחל!"
    >
      {best && (
        <p className="text-yellow-600 font-bold mb-2">🏆 שיא: רמה {best.level} ב-{best.time}s</p>
      )}
    </GameMenuCard>
  );
}
