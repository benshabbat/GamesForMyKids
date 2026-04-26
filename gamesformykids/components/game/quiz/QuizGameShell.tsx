'use client';

import type { ReactNode } from 'react';
import { useQuizGameStore } from '@/lib/stores';

interface Props {
  menu: ReactNode;
  question: ReactNode;
  result: ReactNode;
}

/**
 * Phase-level shell for all Zustand-backed quiz games.
 * Reads phase from quizGameStore and renders the appropriate slot.
 */
export function QuizGameShell({ menu, question, result }: Props) {
  const phase = useQuizGameStore(s => s.phase);
  if (phase === 'menu')    return <>{menu}</>;
  if (phase === 'playing') return <>{question}</>;
  return <>{result}</>;
}
