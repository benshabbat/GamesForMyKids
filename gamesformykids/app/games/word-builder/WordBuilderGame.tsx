'use client';

import { useWordBuilderGame } from './useWordBuilderGame';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import WordBuilderQuestion from './components/WordBuilderQuestion';
import WordBuilderResultScreen from './components/WordBuilderResultScreen';

export default function WordBuilderGame() {
  const { phase, startGame } = useWordBuilderGame();

  if (phase === 'menu') return (
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

  if (phase === 'playing') return <WordBuilderQuestion />;

  return <WordBuilderResultScreen />;
}
