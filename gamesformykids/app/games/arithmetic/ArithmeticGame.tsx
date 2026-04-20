'use client';
import { useEffect } from 'react';
import { useArithmeticGameStore, stopArithmeticTimer } from './arithmeticGameStore';
import ArithmeticMenuScreen from './components/ArithmeticMenuScreen';
import ArithmeticQuestion from './components/ArithmeticQuestion';
import ArithmeticResultScreen from './components/ArithmeticResultScreen';

export default function ArithmeticGame() {
  const phase = useArithmeticGameStore(s => s.phase);

  useEffect(() => {
    // Reset to menu whenever the component mounts (e.g. after client-side
    // navigation back to this page). Without this, the Zustand module-level
    // store retains the previous phase in production (Vercel), causing the
    // game to show a question/result screen instead of the menu.
    stopArithmeticTimer();
    useArithmeticGameStore.setState({ phase: 'menu', question: null, selected: null, isCorrect: null });
    return stopArithmeticTimer;
  }, []);

  if (phase === 'menu')    return <ArithmeticMenuScreen />;
  if (phase === 'playing') return <ArithmeticQuestion />;
  return <ArithmeticResultScreen />;
}
