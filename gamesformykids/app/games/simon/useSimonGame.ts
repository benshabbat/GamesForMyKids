'use client';

import { useCallback } from 'react';
import { useSimonStore } from './simonStore';

export const BUTTONS = [
  { id: 'red',    bg: 'bg-red-500',    active: 'bg-red-200',    label: '' },
  { id: 'blue',   bg: 'bg-blue-500',   active: 'bg-blue-200',   label: '' },
  { id: 'green',  bg: 'bg-green-500',  active: 'bg-green-200',  label: '' },
  { id: 'yellow', bg: 'bg-yellow-400', active: 'bg-yellow-100', label: '' },
] as const;

export type ButtonId = typeof BUTTONS[number]['id'];
import type { PhaseSimon as Phase } from '@/lib/types';

export function useSimonGame() {
  const phase       = useSimonStore((s) => s.phase);
  const activeColor = useSimonStore((s) => s.activeColor);
  const playerIdx   = useSimonStore((s) => s.playerIdx);
  const best        = useSimonStore((s) => s.best);
  const roundScore  = useSimonStore((s) => s.roundScore);
  const sequence    = useSimonStore((s) => s.sequence);

  const flash = useCallback((id: ButtonId, ms: number) =>
    new Promise<void>(resolve => {
      useSimonStore.getState().setActiveColor(id);
      setTimeout(() => { useSimonStore.getState().setActiveColor(null); setTimeout(resolve, 120); }, ms);
    }), []);

  const showSequence = useCallback(async (seq: ButtonId[]) => {
    const store = useSimonStore.getState();
    store.setPhase('showing');
    store.setPlayerIdx(0);
    await new Promise(r => setTimeout(r, 500));
    const speed = Math.max(280, 650 - seq.length * 25);
    for (const id of seq) {
      if (useSimonStore.getState().phase !== 'showing') return;
      await flash(id, speed);
    }
    if (useSimonStore.getState().phase !== 'showing') return;
    useSimonStore.getState().setPhase('input');
    useSimonStore.getState().setPlayerIdx(0);
  }, [flash]);

  const startGame = useCallback(() => {
    const first = BUTTONS[Math.floor(Math.random() * BUTTONS.length)].id;
    const seq: ButtonId[] = [first];
    useSimonStore.getState().setSequence(seq);
    useSimonStore.getState().setRoundScore(0);
    showSequence(seq);
  }, [showSequence]);

  const handleTap = useCallback((id: ButtonId) => {
    const { phase: currentPhase, playerIdx: idx, sequence: seq } = useSimonStore.getState();
    if (currentPhase !== 'input') return;

    useSimonStore.getState().setActiveColor(id);
    setTimeout(() => useSimonStore.getState().setActiveColor(null), 180);

    if (id !== seq[idx]) {
      useSimonStore.getState().setPhase('dead');
      useSimonStore.getState().updateBest(seq.length - 1);
      useSimonStore.getState().setRoundScore(seq.length - 1);
      return;
    }

    const next = idx + 1;
    useSimonStore.getState().setPlayerIdx(next);

    if (next >= seq.length) {
      useSimonStore.getState().setRoundScore(seq.length);
      const nextBtn = BUTTONS[Math.floor(Math.random() * BUTTONS.length)].id;
      const newSeq: ButtonId[] = [...seq, nextBtn];
      useSimonStore.getState().setSequence(newSeq);
      setTimeout(() => showSequence(newSeq), 900);
    }
  }, [showSequence]);

  return { phase, activeColor, playerIdx, best, roundScore, sequenceLength: sequence.length, startGame, handleTap };
}

// keep Phase exported for consumers
export type { Phase };
