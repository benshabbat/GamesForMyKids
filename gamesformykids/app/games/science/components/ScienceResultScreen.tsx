'use client';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function ScienceResultScreen({ score, total, onRestart }: Props) {
  return <QuizResultScreen correctCount={score} total={total} onRestart={onRestart} theme="cyan" />;
}
