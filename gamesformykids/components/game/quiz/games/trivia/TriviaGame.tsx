'use client';
import { useTriviaGame } from './useTriviaGame';
import TriviaMenuScreen from './components/TriviaMenuScreen';
import TriviaQuestion from './components/TriviaQuestion';
import { QuizResultScreen } from '@/components/game/quiz';

export default function TriviaGame() {
  const { phase, index, score, selected, isCorrect, current, total, startGame, selectAnswer, next, restart } = useTriviaGame();

  if (phase === 'menu') return <TriviaMenuScreen onStart={startGame} />;

  if (phase === 'playing' && current) return (
    <TriviaQuestion
      index={index}
      total={total}
      score={score}
      current={current}
      selected={selected}
      isCorrect={isCorrect ?? false}
      onSelect={selectAnswer}
      onNext={next}
    />
  );

  return <QuizResultScreen correctCount={score} total={total} onRestart={restart} theme="amber" />;
}
