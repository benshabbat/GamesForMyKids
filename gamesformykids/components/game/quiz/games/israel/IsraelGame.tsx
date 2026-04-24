'use client';

import { useIsraelGame } from './useIsraelGame';
import type { IsraelCategory } from './data/questions';
import IsraelMenuScreen from './components/IsraelMenuScreen';
import IsraelQuestion from './components/IsraelQuestion';
import { QuizResultScreen } from '@/components/game/quiz';

export default function IsraelGame() {
  const { phase, categories, index, score, selected, isCorrect, current, total, correctCount, startGame, selectAnswer, next, restart } = useIsraelGame();

  if (phase === 'menu') {
    return <IsraelMenuScreen categories={categories as readonly IsraelCategory[]} onStart={startGame} />;
  }

  if (phase === 'result') {
    return <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} theme="blue" />;
  }

  if (!current) return null;

  return (
    <IsraelQuestion
      index={index}
      total={total}
      score={score}
      current={current}
      selected={selected}
      isCorrect={isCorrect ?? false}
      onSelect={selectAnswer}
      onNext={next}
    />
  );
}
