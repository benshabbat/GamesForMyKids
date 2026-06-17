'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useWhackAMoleStore, GAME_DURATION, MOLES, BAD } from './whackAMoleStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';

export type { HoleState } from './whackAMoleStore';
export { GAME_DURATION } from './whackAMoleStore';

const GRID = 9;

const _useStore = createShallowHook(useWhackAMoleStore);

export function useWhackAMoleGame() {
  const state    = _useStore();
  const store    = useWhackAMoleStore;
  const { saveGameResultRef } = useGameCompletion('whack-a-mole');
  const startTimeRef   = useRef<number>(0);
  const spawnRef       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moleTimersRef  = useRef<(ReturnType<typeof setTimeout> | null)[]>(Array(GRID).fill(null));

  // Record start time when game begins
  useEffect(() => {
    if (state.phase === 'playing') startTimeRef.current = Date.now();
  }, [state.phase]);

  // Persist result when game ends
  useEffect(() => {
    if (state.phase === 'result') {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({ score: state.score, level: 1, durationSeconds });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  // Mole spawner — runs while phase === 'playing'
  useEffect(() => {
    if (state.phase !== 'playing') {
      if (spawnRef.current) { clearTimeout(spawnRef.current); spawnRef.current = null; }
      moleTimersRef.current.forEach((t, i) => { if (t) { clearTimeout(t); moleTimersRef.current[i] = null; } });
      return;
    }

    function spawnNext() {
      if (store.getState().phase !== 'playing') return;
      const { holes } = store.getState();
      const emptyIdxs = holes
        .map((h, i) => ({ h, i }))
        .filter(({ h }) => h === 'empty')
        .map(({ i }) => i);

      if (emptyIdxs.length > 0) {
        const idx   = emptyIdxs[Math.floor(Math.random() * emptyIdxs.length)]!;
        const isBad = Math.random() < 0.15;
        const val   = isBad ? BAD : MOLES[Math.floor(Math.random() * MOLES.length)]!;
        store.getState().showMole(idx, val, isBad);

        moleTimersRef.current[idx] = setTimeout(() => {
          store.getState().hideMole(idx);
          moleTimersRef.current[idx] = null;
        }, 800 + Math.random() * 800);
      }

      spawnRef.current = setTimeout(spawnNext, 400 + Math.random() * 600);
    }

    spawnRef.current = setTimeout(spawnNext, 400);
    const moleTimers = moleTimersRef.current;

    return () => {
      if (spawnRef.current) { clearTimeout(spawnRef.current); spawnRef.current = null; }
      moleTimers.forEach((t, i) => { if (t) { clearTimeout(t); moleTimers[i] = null; } });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  // Wrap whack to cancel auto-hide timer + schedule clear after hit/miss animation
  const whack = (idx: number) => {
    if (moleTimersRef.current[idx]) {
      clearTimeout(moleTimersRef.current[idx]!);
      moleTimersRef.current[idx] = null;
    }
    store.getState().whack(idx);
    setTimeout(() => store.getState().clearHole(idx), 300);
  };

  const pct     = (state.timeLeft / GAME_DURATION) * 100;
  const bgColor = state.timeLeft <= 10 ? 'from-red-100 to-rose-200' : 'from-yellow-50 to-amber-100';
  return { ...state, whack, bgColor, pct };
}
