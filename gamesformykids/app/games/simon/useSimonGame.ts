'use client';

import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSimonStore, showSequence, BUTTONS } from './simonStore';
export type { ButtonId } from './simonStore';
export { BUTTONS };

import type { PhaseSimon as Phase } from '@/lib/types';

export function useSimonGame() {
  const { phase, activeColor, playerIdx, best, roundScore, sequence, startGame } =
    useSimonStore(useShallow((s) => s));

  const handleTap = useCallback((id: string) => {
    const { phase: currentPhase, playerIdx: idx, sequence: seq } = useSimonStore.getState();
    if (currentPhase !== 'input') return;

    useSimonStore.getState().setActiveColor(id as typeof BUTTONS[number]['id']);
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
      const newSeq = [...seq, nextBtn];
      useSimonStore.getState().setSequence(newSeq);
      setTimeout(() => showSequence(newSeq), 900);
    }
  }, []);

  return { phase, activeColor, playerIdx, best, roundScore, sequenceLength: sequence.length, startGame, handleTap };
}

export type { Phase };
