'use client';

import { useQuizGameStore } from '@/lib/stores';
import AnimalsMenuScreen from './components/AnimalsMenuScreen';
import AnimalsQuestionCard from './components/AnimalsQuestionCard';
import AnimalsResultScreen from './components/AnimalsResultScreen';

export default function AnimalsGame() {
  const phase = useQuizGameStore(s => s.phase);

  if (phase === 'menu')    return <AnimalsMenuScreen />;
  if (phase === 'playing') return <AnimalsQuestionCard />;
  return <AnimalsResultScreen />;
}
