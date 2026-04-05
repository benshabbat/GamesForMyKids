'use client';

import { useWordBuilderGame } from './useWordBuilderGame';
import WordBuilderMenuScreen from './components/WordBuilderMenuScreen';
import WordBuilderQuestion from './components/WordBuilderQuestion';
import WordBuilderResultScreen from './components/WordBuilderResultScreen';

export default function WordBuilderGame() {
  const {
    phase, index, score, typed, available, status, current, total,
    startGame, pressLetter, clearTyped, next, goMenu, restart,
  } = useWordBuilderGame();

  if (phase === 'menu') return <WordBuilderMenuScreen onStart={startGame} />;

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
      onMenu={goMenu}
    />
  );

  return (
    <WordBuilderResultScreen
      score={score}
      total={total}
      onRestart={restart}
      onMenu={goMenu}
    />
  );
}
