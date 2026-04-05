'use client';
import { useTriviaGame } from './useTriviaGame';
import TriviaMenuScreen from './components/TriviaMenuScreen';
import TriviaQuestion from './components/TriviaQuestion';
import TriviaResultScreen from './components/TriviaResultScreen';

export default function TriviaGame() {
  const { phase, index, score, selected, isCorrect, current, category, total, startGame, selectAnswer, next, goMenu, restart } = useTriviaGame();

  if (phase === 'menu') return <TriviaMenuScreen onStart={startGame} />;

  if (phase === 'playing' && current) return (
    <TriviaQuestion
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

  return (
    <TriviaResultScreen
      score={score}
      total={total}
      category={category}
      onRestart={restart}
      onMenu={goMenu}
    />
  );
}
