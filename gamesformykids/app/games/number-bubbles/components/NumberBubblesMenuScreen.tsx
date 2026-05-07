'use client';

import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useNumberBubblesGame } from '../useNumberBubblesGame';

export default function NumberBubblesMenuScreen() {
  const { best, startGame } = useNumberBubblesGame();

  return (
    <GameMenuCard
      emoji="🔢"
      title="בועות מספרים"
      description="פוצץ את הבועות לפי הסדר: 1, 2, 3..."
      hint="כל רמה יש יותר מספרים!"
      gradientClass="from-sky-100 to-blue-200"
      buttonClass="from-sky-500 to-blue-600"
      onStart={startGame}
      startLabel="🔢 התחל!"
    >
      {best && (
        <p className="text-yellow-600 font-bold mb-2">🏆 שיא: רמה {best.level} ב-{best.time}s</p>
      )}
    </GameMenuCard>
  );
}
