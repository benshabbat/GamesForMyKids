'use client';

import { useInstrumentsGame } from './useInstrumentsGame';
import InstrumentsMenuScreen from './components/InstrumentsMenuScreen';
import InstrumentsQuestion from './components/InstrumentsQuestion';
import InstrumentsResultScreen from './components/InstrumentsResultScreen';

export default function InstrumentsGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useInstrumentsGame();

  if (phase === 'menu') {
    return <InstrumentsMenuScreen onStart={startGame} />;
  }

  if (phase === 'result') {
    return <InstrumentsResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} onMenu={goMenu} />;
  }

  if (!current) return null;

  return (
    <InstrumentsQuestion
      index={index}
      total={total}
      score={score}
      current={current}
      choices={choices}
      selected={selected}
      isCorrect={isCorrect ?? false}
      onSelect={selectAnswer}
      onNext={next}
    />
  );
}

