'use client';
import { useSpellingGame } from './useSpellingGame';
import SpellingMenuScreen from './components/SpellingMenuScreen';
import SpellingQuestion from './components/SpellingQuestion';
import SpellingResultScreen from './components/SpellingResultScreen';

export default function SpellingGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useSpellingGame();

  if (phase === 'menu') return <SpellingMenuScreen onStart={startGame} />;

  if (phase === 'playing' && current) return (
    <SpellingQuestion
      index={index}
      total={total}
      score={score}
      current={current}
      choices={choices}
      selected={selected}
      isCorrect={isCorrect}
      onSelect={selectAnswer}
      onNext={next}
      onMenu={goMenu}
    />
  );

  return (
    <SpellingResultScreen
      correctCount={correctCount}
      total={total}
      onRestart={restart}
      onMenu={goMenu}
    />
  );
}
