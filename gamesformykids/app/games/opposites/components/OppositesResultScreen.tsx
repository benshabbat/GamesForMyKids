'use client';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  correctCount: number;
  total: number;
  onRestart: () => void;
}

export default function OppositesResultScreen({ correctCount, total, onRestart }: Props) {
  return <QuizResultScreen correctCount={correctCount} total={total} onRestart={onRestart} theme="orange" />;
}
