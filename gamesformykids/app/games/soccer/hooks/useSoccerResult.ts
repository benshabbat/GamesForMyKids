'use client';

import { useSoccerStore } from '../store/soccerStore';

export function useSoccerResult() {
  const { score, questions, category, startGame, goToMenu } = useSoccerStore();
  const total = questions.length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const trophy = pct === 100 ? '🏆' : pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : '⚽';
  const msg = pct === 100 ? 'שחקן על!' : pct >= 80 ? 'מצוין!' : pct >= 60 ? 'כל הכבוד!' : 'אפשר טוב יותר!';

  return { score, total, pct, trophy, msg, category, startGame, goToMenu };
}
