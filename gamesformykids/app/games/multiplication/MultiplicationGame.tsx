'use client';
import { useEffect } from 'react';
import { useMultiplicationGameStore, stopMultiplicationTimer } from './multiplicationGameStore';
import MultiplicationMenuScreen from './components/MultiplicationMenuScreen';
import MultiplicationQuestion from './components/MultiplicationQuestion';
import MultiplicationResultScreen from './components/MultiplicationResultScreen';

export default function MultiplicationGame() {
  const phase = useMultiplicationGameStore((s) => s.phase);

  useEffect(() => stopMultiplicationTimer, []);

  if (phase === 'menu')    return <MultiplicationMenuScreen />;
  if (phase === 'playing') return <MultiplicationQuestion />;
  return <MultiplicationResultScreen />;
}
