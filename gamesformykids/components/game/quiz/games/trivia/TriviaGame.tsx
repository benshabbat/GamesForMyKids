'use client';
import { useTriviaGame } from './useTriviaGame';
import TriviaMenuScreen from './components/TriviaMenuScreen';
import TriviaQuestion from './components/TriviaQuestion';
import { QuizResultScreen } from '@/components/game/quiz';

export default function TriviaGame() {
  const { phase, current, startGame, selectAnswer, restart } = useTriviaGame();

  if (phase === 'menu') return <TriviaMenuScreen onStart={startGame} />;
  if (phase === 'playing' && current) return <TriviaQuestion current={current} onSelect={selectAnswer} />;
  return <QuizResultScreen onRestart={restart} theme="amber" />;
}
