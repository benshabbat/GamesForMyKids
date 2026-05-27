'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSimonStore, showSequence, BUTTONS } from './simonStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
export type { ButtonId } from './simonStore';
export { BUTTONS };

import type { PhaseSimon as Phase } from '@/lib/types';

export function useSimonGame() {
  const { phase, activeColor, playerIdx, best, roundScore, sequence, startGame } =
    useSimonStore(useShallow((s) => s));

  const { saveGameResultRef } = useGameCompletion('simon');
  const startTimeRef = useRef<number>(0);

  // Record start time when game begins (showing = sequence display, which is start of a round)
  useEffect(() => {
    if (phase === 'showing' && sequence.length === 1) {
      startTimeRef.current = Date.now();
    }
  }, [phase, sequence.length]);

  // Persist result when game ends
  useEffect(() => {
    if (phase === 'dead') {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({ score: roundScore, level: 1, durationSeconds });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

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
      const nextBtn = BUTTONS[Math.floor(Math.random() * BUTTONS.length)]!.id;
      const newSeq = [...seq, nextBtn];
      useSimonStore.getState().setSequence(newSeq);
      setTimeout(() => showSequence(newSeq), 900);
    }
  }, []);

  return { phase, activeColor, playerIdx, best, roundScore, sequenceLength: sequence.length, startGame, handleTap };
}

export type { Phase };
