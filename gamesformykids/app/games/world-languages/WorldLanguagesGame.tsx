'use client';
import { useWorldLanguagesGame } from './useWorldLanguagesGame';
import WorldLanguagesMenuScreen from './components/WorldLanguagesMenuScreen';
import WorldLanguagesQuestion from './components/WorldLanguagesQuestion';
import WorldLanguagesResultScreen from './components/WorldLanguagesResultScreen';

export default function WorldLanguagesGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, startGame, selectAnswer, next, restart } = useWorldLanguagesGame();

  if (phase === 'menu') return <WorldLanguagesMenuScreen onStart={startGame} />;

  if (phase === 'playing' && current) return (
    <WorldLanguagesQuestion
      index={index}
      total={total}
      score={score}
      current={current}
      choices={choices as string[]}
      selected={selected}
      isCorrect={isCorrect ?? false}
      onSelect={selectAnswer}
      onNext={next}
    />
  );

  return (
    <WorldLanguagesResultScreen
      score={score}
      total={total}
      onRestart={restart}
    />
  );
}
