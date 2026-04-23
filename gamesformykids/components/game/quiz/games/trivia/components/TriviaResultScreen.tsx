'use client';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  score: number;
  total: number;
  category: string;
  onRestart: () => void;
}

export default function TriviaResultScreen({ score, total, onRestart }: Props) {
  const correctCount = Math.round(score / 10);
  return <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={onRestart} theme="amber" />;
}
