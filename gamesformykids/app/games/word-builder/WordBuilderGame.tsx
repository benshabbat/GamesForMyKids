'use client';

import { useWordBuilderGame } from './useWordBuilderGame';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import WordBuilderQuestion from './components/WordBuilderQuestion';
import WordBuilderResultScreen from './components/WordBuilderResultScreen';

export default function WordBuilderGame() {
  const {
    phase, index, score, typed, available, status, current, total,
    startGame, pressLetter, clearTyped, next, restart,
  } = useWordBuilderGame();

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

  if (phase === 'playing' && current) return (
    <WordBuilderQuestion
      index={index}
      total={total}
      score={score}
      current={current}
      typed={typed}
      available={available}
      status={status}
      onPressLetter={pressLetter}
      onClear={clearTyped}
      onNext={next}
    />
  );

  return (
    <WordBuilderResultScreen
      score={score}
      total={total}
      onRestart={restart}
    />
  );
}
