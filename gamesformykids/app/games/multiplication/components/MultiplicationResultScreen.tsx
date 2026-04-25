'use client';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  level: number;
  correct: number;
  totalQuestions: number;
  score: number;
  onRestart: (level: number) => void;
}

export default function MultiplicationResultScreen({ level, correct, totalQuestions, score, onRestart }: Props) {
  return <QuizResultScreen correctCount={correct} total={totalQuestions} onRestart={() => onRestart(level)} theme="violet" />;
}
