'use client';

import { useQuizGameStore } from '@/lib/stores/quizGameStore';

export function useQuizProgress() {
  const index     = useQuizGameStore(s => s.index);
  const total     = useQuizGameStore(s => s.total);
  const score     = useQuizGameStore(s => s.score);
  const selected  = useQuizGameStore(s => s.selected);
  const isCorrect = useQuizGameStore(s => s.isCorrect ?? false);
  const next      = useQuizGameStore(s => s.nextQuestion);
  return { index, total, score, selected, isCorrect, next };
}
