'use client';

import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface Props {
  gameDuration: number;
  onStart: () => void;
}

export default function ReflexMenuScreen({ gameDuration, onStart }: Props) {
  return (
    <GameMenuCard
      emoji="⚡"
      title="מהירות תגובה"
      description="לחץ על הסמלים לפני שהם נעלמים!"
      gradientClass="from-rose-50 to-red-100"
      buttonClass="from-rose-500 to-red-600"
      onStart={onStart}
      startLabel="🚀 התחל!"
    >
      <div className="bg-red-100 rounded-2xl p-4 text-sm text-red-700 space-y-1 text-right">
        <p>⏱️ {gameDuration} שניות משחק</p>
        <p>⚡ ככל שאוספים יותר — הסמלים מהירים יותר</p>
        <p>❌ סמל שנעלם = פספוס</p>
      </div>
    </GameMenuCard>
  );
}
