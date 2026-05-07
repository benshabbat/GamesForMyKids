'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useWordBuilderGame } from '../useWordBuilderGame';

export default function WordBuilderMenuScreen() {
  const { startGame } = useWordBuilderGame();
  return (
    <GameMenuCard
      emoji="🔤"
      title="בניית מילים"
      description="סדר את האותיות ובנה את המילה הנכונה!"
      gradientClass="from-orange-50 to-amber-100"
      buttonClass="from-orange-500 to-amber-500"
      onStart={startGame}
      startLabel="🚀 התחל!"
    />
  );
}
