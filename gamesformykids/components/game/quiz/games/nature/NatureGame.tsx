'use client';

import { useNatureGame } from './useNatureGame';
import type { NatureCategory } from './data/questions';
import NatureMenuScreen from './components/NatureMenuScreen';
import NatureQuestion from './components/NatureQuestion';
import { QuizResultScreen } from '@/components/game/quiz';

export default function NatureGame() {
  const { phase, categories, index, score, selected, isCorrect, current, total, correctCount, startGame, selectAnswer, next, restart } = useNatureGame();

  if (phase === 'menu') {
    return <NatureMenuScreen categories={categories as readonly NatureCategory[]} onStart={startGame} />;
  }

  if (phase === 'result') {
    return <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} theme="green" />;
  }

  if (!current) return null;

  return <NatureQuestion index={index} total={total} score={score} current={current} selected={selected} isCorrect={isCorrect ?? false} onSelect={selectAnswer} onNext={next} />;
}
