'use client';

import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useReflexStore } from '../reflexStore';
import { GAME_DURATION } from '../data/targets';

export default function ReflexMenuScreen() {
  const startGame = useReflexStore((s) => s.startGame);

  return (
    <GameMenuCard
      emoji="⚡"
      title="מהירות תגובה"
      description="לחץ על הסמלים לפני שהם נעלמים!"
      gradientClass="from-rose-50 to-red-100"
      buttonClass="from-rose-500 to-red-600"
      onStart={startGame}
      startLabel="🚀 התחל!"
    >
      <div className="bg-red-100 rounded-2xl p-4 text-sm text-red-700 space-y-1 text-right">
        <p>⏱️ {GAME_DURATION} שניות משחק</p>
        <p>⚡ ככל שאוספים יותר — הסמלים מהירים יותר</p>
        <p>❌ סמל שנעלם = פספוס</p>
      </div>
    </GameMenuCard>
  );
}
