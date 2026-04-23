'use client';
import type { BodyCategory } from '../data/body';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  score: number;
  total: number;
  category: BodyCategory;
  onRestart: (category: BodyCategory) => void;
}

export default function HumanBodyResultScreen({ score, total, category, onRestart }: Props) {
  const correctCount = Math.round(score / 10);
  return <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={() => onRestart(category)} theme="red" />;
}
