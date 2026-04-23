'use client';

import { useSportsQuizGame } from './useSportsQuizGame';
import { QuizResultScreen } from '@/components/game/quiz';
import SportsQuizMenuScreen from './components/SportsQuizMenuScreen';
import SportsQuizQuestion from './components/SportsQuizQuestion';

export default function SportsQuizGame() {
  const {
    phase, index, score, selected, isCorrect, current, choices, total, correctCount,
    startGame, selectAnswer, next, restart,
  } = useSportsQuizGame();

  if (phase === 'menu') return <SportsQuizMenuScreen onStart={startGame} />;

  if (phase === 'result') return (
    <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} theme="green" />
  );

  if (!current) return null;

  return (
    <SportsQuizQuestion
      index={index}
      total={total}
      score={score}
      current={current}
      choices={choices}
      selected={selected}
      isCorrect={isCorrect}
      onSelect={selectAnswer}
      onNext={next}
    />
  );
}
