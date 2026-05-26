'use client';

import type { TransportType } from '../data/transport';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  correctCount: number;
  total: number;
  transportType: TransportType;
  onRestart: (type: TransportType) => void;
}

export default function TransportResultScreen({ correctCount, total, transportType, onRestart }: Props) {
  return <QuizResultScreen correctCount={correctCount} total={total} onRestart={() => onRestart(transportType)} theme="sky" />;
}
