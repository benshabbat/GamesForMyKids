'use client';
import type { SequenceLevel } from '../data/sequences';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  level: SequenceLevel;
  score: number;
  total: number;
  onRestart: () => void;
}

export default function SequencesResultScreen({ score, total, onRestart }: Props) {
  const correctCount = Math.round(score / 10);
  return <QuizResultScreen correctCount={correctCount} total={total} score={score} onRestart={onRestart} theme="sky" />;
}
