'use client';

import { useSportsQuizGame } from './useSportsQuizGame';
import SportsQuizMenuScreen from './components/SportsQuizMenuScreen';
import SportsQuizQuestion from './components/SportsQuizQuestion';
import SportsQuizResultScreen from './components/SportsQuizResultScreen';

export default function SportsQuizGame() {
  const { phase, index, score, selected, isCorrect, current, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useSportsQuizGame();

  if (phase === 'menu') return <SportsQuizMenuScreen onStart={startGame} />;

  if (phase === 'result') return (
    <SportsQuizResultScreen
      correctCount={correctCount}
      total={total}
      score={score}
      onRestart={restart}
      onMenu={goMenu}
    />
  );

  if (!current) return null;

  return (
    <SportsQuizQuestion
      index={index}
      total={total}
      score={score}
      current={current}
      selected={selected}
      isCorrect={isCorrect}
      onSelect={selectAnswer}
      onNext={next}
      onMenu={goMenu}
    />
  );
}
