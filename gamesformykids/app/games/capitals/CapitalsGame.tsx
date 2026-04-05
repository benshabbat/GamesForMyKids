'use client';

import { useCapitalsGame } from './useCapitalsGame';
import CapitalsMenuScreen from './components/CapitalsMenuScreen';
import CapitalsQuestion from './components/CapitalsQuestion';
import CapitalsResultScreen from './components/CapitalsResultScreen';

export default function CapitalsGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useCapitalsGame();

  if (phase === 'menu') return <CapitalsMenuScreen onStart={startGame} />;

  if (phase === 'result') return (
    <CapitalsResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} onMenu={goMenu} />
  );

  if (!current) return null;

  return (
    <CapitalsQuestion
      index={index} total={total} score={score}
      current={current} choices={choices} selected={selected}
      isCorrect={isCorrect} onSelect={selectAnswer} onNext={next}
    />
  );
}
