'use client';
import type { TransportType } from '../data/transport';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  score: number;
  total: number;
  transportType: TransportType;
  onRestart: (type: TransportType) => void;
}

export default function TransportResultScreen({ score, total, transportType, onRestart }: Props) {
  return <QuizResultScreen correctCount={score} total={total} onRestart={() => onRestart(transportType)} theme="sky" />;
}
