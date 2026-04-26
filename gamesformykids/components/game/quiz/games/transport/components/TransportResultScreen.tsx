'use client';

import type { TransportType } from '../data/transport';
import { useTransportStore } from '../store/transportStore';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  transportType: TransportType;
  onRestart: (type: TransportType) => void;
}

export default function TransportResultScreen({ transportType, onRestart }: Props) {
  const score = useTransportStore(s => s.score);
  const total = useTransportStore(s => s.questions.length);
  return <QuizResultScreen correctCount={score} total={total} onRestart={() => onRestart(transportType)} theme="sky" />;
}
