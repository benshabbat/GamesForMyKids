'use client';

import { useFractionsGame } from './useFractionsGame';
import FractionsMenuScreen from './components/FractionsMenuScreen';
import FractionsQuestion from './components/FractionsQuestion';
import FractionsResultScreen from './components/FractionsResultScreen';

export default function FractionsGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useFractionsGame();

  if (phase === 'menu') {
    return <FractionsMenuScreen onStart={startGame} />;
  }

  if (phase === 'result') {
    return <FractionsResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} onMenu={goMenu} />;
  }

  if (!current) return null;

  return (
    <FractionsQuestion
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
