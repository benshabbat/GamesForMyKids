'use client';
import { QuizResultScreen } from '@/components/game/quiz';
import { useWordBuilderStore } from '../wordBuilderStore';

export default function WordBuilderResultScreen() {
  const { score, puzzles, startGame } = useWordBuilderStore();
  return <QuizResultScreen correctCount={score} total={puzzles.length} onRestart={startGame} theme="amber" />;
}
