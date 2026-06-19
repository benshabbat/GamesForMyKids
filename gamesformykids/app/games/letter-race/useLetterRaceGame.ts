'use client';
import { useEffect } from 'react';
import { createPhaseGameHook } from '@/hooks/shared/progress/createPhaseGameHook';
import { useLetterRaceStore } from './letterRaceStore';

export type { LetterQuestion } from './letterRaceStore';
export { GAME_TIME } from './letterRaceStore';

const _useBase = createPhaseGameHook(
  useLetterRaceStore,
  'letter-race',
  (s) => ({ score: s.score, level: 1 }),
  ['dead'],
);

export function useLetterRaceGame() {
  const state = _useBase();
  const accuracy = state.total > 0 ? Math.round((state.correct / state.total) * 100) : 0;

  useEffect(() => {
    if (!state.feedback) return;
    const id = setTimeout(state.nextQuestion, 600);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.feedback]);

  return { ...state, accuracy };
}
