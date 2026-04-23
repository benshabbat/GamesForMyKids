'use client';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function WorldLanguagesResultScreen({ score, total, onRestart }: Props) {
  const correctCount = Math.round(score / 10);
  return <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={onRestart} theme="emerald" />;
}
