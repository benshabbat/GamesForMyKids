'use client';
import type { TransportType } from '../data/transport';
import { QuizResultScreen } from '@/components/game/quiz';

interface Props {
  transportType: TransportType;
  onRestart: (type: TransportType) => void;
}

export default function TransportResultScreen({ transportType, onRestart }: Props) {
  return <QuizResultScreen onRestart={() => onRestart(transportType)} theme="sky" />;
}
