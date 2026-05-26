'use client';

import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  score: number;
  maxScore: number;
  onRestart: () => void;
}

export default function HolidaysCompleteScreen({ score, maxScore, onRestart }: Props) {
  return (
    <QuizResultScreen
      correctCount={score}
      total={maxScore}
      title="כל הכבוד!"
      subtitle="עברת על כל חגי ישראל!"
      onRestart={onRestart}
      theme="sky"
    />
  );
}
