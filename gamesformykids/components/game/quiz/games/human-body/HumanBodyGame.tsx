'use client';

import { useHumanBodyGame } from './useHumanBodyGame';
import type { BodyCategory } from './data/body';
import HumanBodyMenuScreen from './components/HumanBodyMenuScreen';
import HumanBodyQuestion from './components/HumanBodyQuestion';
import { QuizResultScreen } from '@/components/game/quiz';

export default function HumanBodyGame() {
  const {
    phase, category, currentQuestion,
    currentIndex, total, choices, selected, isCorrect,
    score, startGame, selectAnswer, nextQuestion,
  } = useHumanBodyGame();

  if (phase === 'menu') {
    return <HumanBodyMenuScreen onStart={(cat: BodyCategory) => startGame(cat)} />;
  }

  if (phase === 'result') {
    return <QuizResultScreen correctCount={score} total={total} onRestart={() => startGame(category)} theme="red" />;
  }

  if (!currentQuestion) return null;

  return (
    <HumanBodyQuestion
      phase={phase}
      currentIndex={currentIndex}
      total={total}
      score={score}
      currentQuestion={currentQuestion}
      choices={choices}
      selected={selected}
      isCorrect={isCorrect ?? false}
      onSelect={selectAnswer}
      onNext={nextQuestion}
    />
  );
}
