'use client';

import { useShallow } from 'zustand/react/shallow';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useSoccerGame } from '@/lib/quiz/useSoccerGame';

export function useSoccerResult() {
  const { score, total } = useQuizGameStore(
    useShallow((s) => ({ score: s.score, total: s.total })),
  );
  const { category, startGame } = useSoccerGame();

  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const trophy = pct === 100 ? '🏆' : pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : '⚽';
  const msg = pct === 100 ? 'שחקן על!' : pct >= 80 ? 'מצוין!' : pct >= 60 ? 'כל הכבוד!' : 'אפשר טוב יותר!';

  return { score, total, pct, trophy, msg, category, startGame };
}
