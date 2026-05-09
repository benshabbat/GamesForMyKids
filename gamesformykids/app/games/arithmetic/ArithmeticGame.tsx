'use client';
import TimedMathGame from '@/components/game/shared/TimedMathGame';
import { ARITHMETIC_CONFIG } from './arithmeticConfig';

export default function ArithmeticGame() {
  return <TimedMathGame config={ARITHMETIC_CONFIG} />;
}
