'use client';

import { useRiddlesGame } from './useRiddlesGame';
import RiddlesMenuScreen from './components/RiddlesMenuScreen';
import RiddlesQuestion from './components/RiddlesQuestion';
import RiddlesResultScreen from './components/RiddlesResultScreen';

export default function RiddlesGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useRiddlesGame();

  if (phase === 'menu') return <RiddlesMenuScreen onStart={startGame} />;

  if (phase === 'result') {
    return <RiddlesResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} onMenu={goMenu} />;
  }

  if (!current) return null;

  return (
    <RiddlesQuestion
      index={index}
      total={total}
      score={score}
      current={current}
      choices={choices as string[]}
      selected={selected as string | null}
      isCorrect={isCorrect ?? false}
      onSelect={selectAnswer}
      onNext={next}
    />
  );
}

