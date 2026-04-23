'use client';

import { useGameTypeStore } from '@/lib/stores/gameTypeStore';
import { getQuizGameComponent } from '@/lib/quiz/quizGameRegistry';

/**
 * מרנדר את קומפוננט המשחק המתאים לפי gameType מה-store.
 * משמש כנקודת כניסה יחידה לכל משחקי החידון דרך [gameType]/page.tsx.
 */
export function QuizGameRouter() {
  const gameType = useGameTypeStore(s => s.currentGameType);
  if (!gameType) return null;

  const GameComponent = getQuizGameComponent(gameType);
  if (!GameComponent) return null;

  return <GameComponent />;
}
