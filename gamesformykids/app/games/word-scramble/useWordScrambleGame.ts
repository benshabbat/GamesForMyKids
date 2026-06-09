'use client';
import { useEffect } from 'react';
import { useWordScrambleStore } from './wordScrambleStore';
import { createPhaseGameHook } from '@/hooks/shared/progress';

export type { WordEntry, LetterSlot, PickedLetter } from './wordScrambleStore';
export { WORD_LIST } from './wordScrambleStore';

const _useBase = createPhaseGameHook(
  useWordScrambleStore,
  'word-scramble',
  (s) => ({ score: s.score, level: 1 }),
  ['results'],
);

export function useWordScrambleGame() {
  const game = _useBase();

  // Auto-advance to next word after correct answer animation
  useEffect(() => {
    if (!game.correct) return;
    const id = setTimeout(game.advanceWord, 900);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.correct]);

  // Clear shake state after shake animation completes
  useEffect(() => {
    if (!game.shake) return;
    const id = setTimeout(game.resetPick, 600);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.shake]);

  // Transition to results when lives run out
  useEffect(() => {
    if (game.lives > 0 || game.phase !== 'playing') return;
    const id = setTimeout(game.goToResults, 1000);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.lives, game.phase]);

  return game;
}
