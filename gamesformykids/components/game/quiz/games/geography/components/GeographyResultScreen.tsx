'use client';
import { QuizResultScreen } from '@/components/game/quiz';

export default function GeographyResultScreen({ onRestart }: { onRestart: () => void }) {
  return <QuizResultScreen onRestart={onRestart} theme="teal" />;
}
