'use client';
import { useEffect } from 'react';
import { useArithmeticGameStore, stopArithmeticTimer } from './arithmeticGameStore';
import ArithmeticMenuScreen from './components/ArithmeticMenuScreen';
import ArithmeticQuestion from './components/ArithmeticQuestion';
import ArithmeticResultScreen from './components/ArithmeticResultScreen';

export default function ArithmeticGame() {
  const phase = useArithmeticGameStore(s => s.phase);

  useEffect(() => stopArithmeticTimer, []);

  if (phase === 'menu')    return <ArithmeticMenuScreen />;
  if (phase === 'playing') return <ArithmeticQuestion />;
  return <ArithmeticResultScreen />;
}
