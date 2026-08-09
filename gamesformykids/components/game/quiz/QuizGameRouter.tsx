'use client';

import { createElement } from 'react';
import { useGameTypeStore } from '@/lib/stores/gameTypeStore';
import { getQuizGameComponent } from '@/lib/quiz/quizGameRegistry';

/**
 * מרנדר את קומפוננט המשחק המתאים לפי gameType מה-store.
 * משמש כנקודת כניסה יחידה לכל משחקי החידון דרך [gameType]/page.tsx.
 */
export function QuizGameRouter() {
  const gameType = useGameTypeStore(s => s.currentGameType);
  if (!gameType) return null;

  // createElement rather than `<GameComponent />`: assigning a capitalized
  // local from a call and rendering it as JSX reads as "component defined
  // during render", which remounts the subtree on every render if the
  // reference ever changes. This is a lookup in a module-level registry, so
  // the reference is stable — createElement says that plainly.
  const gameComponent = getQuizGameComponent(gameType);
  if (!gameComponent) return null;

  return createElement(gameComponent);
}
