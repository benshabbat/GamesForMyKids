'use client';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  correctCount: number;
  total: number;
  score: number;
  onRestart: () => void;
}

export default function RiddlesResultScreen({ correctCount, total, score, onRestart }: Props) {
  return <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={onRestart} theme="purple" />;
}
