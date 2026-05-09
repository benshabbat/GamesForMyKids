'use client';
import TimedMathGame from '@/components/game/shared/TimedMathGame';
import { MULTIPLICATION_CONFIG } from './multiplicationConfig';

export default function MultiplicationGame() {
  return <TimedMathGame config={MULTIPLICATION_CONFIG} />;
}
