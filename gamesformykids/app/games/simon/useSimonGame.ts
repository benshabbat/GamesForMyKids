'use client';

import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSimonStore, BUTTONS } from './simonStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
export type { ButtonId } from './simonStore';
export { BUTTONS };

import type { PhaseSimon as Phase } from '@/lib/types';
import type { ButtonId } from './simonStore';

export function useSimonGame() {
  const { phase, activeColor, playerIdx, best, roundScore, sequence, initGame,
          setActiveColor, setPhase, setPlayerIdx, setRoundScore, setSequence, updateBest } =
    useSimonStore(useShallow((s) => s));

  const flash = (id: ButtonId, ms: number): Promise<void> => {
    return new Promise(resolve => {
      setActiveColor(id);
      setTimeout(() => {
        setActiveColor(null);
        setTimeout(resolve, 120);
      }, ms);
    });
  };

  const runSequence = async (seq: ButtonId[]) => {
    setPhase('showing');
    setPlayerIdx(0);
    await new Promise(r => setTimeout(r, 500));
    const speed = Math.max(280, 650 - seq.length * 25);
    for (const id of seq) {
      if (useSimonStore.getState().phase !== 'showing') return;
      await flash(id, speed);
    }
    if (useSimonStore.getState().phase !== 'showing') return;
    setPhase('input');
    setPlayerIdx(0);
  };

  const startGame = () => {
    initGame();
    const { sequence: seq } = useSimonStore.getState();
    runSequence(seq);
  };

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

  const handleTap = (id: string) => {
    const { phase: currentPhase, playerIdx: idx, sequence: seq } = useSimonStore.getState();
    if (currentPhase !== 'input') return;

    setActiveColor(id as ButtonId);
    setTimeout(() => setActiveColor(null), 180);

    if (id !== seq[idx]) {
      setPhase('dead');
      updateBest(seq.length - 1);
      setRoundScore(seq.length - 1);
      return;
    }

    const next = idx + 1;
    setPlayerIdx(next);

    if (next >= seq.length) {
      setRoundScore(seq.length);
      const nextBtn = BUTTONS[Math.floor(Math.random() * BUTTONS.length)]!.id;
      const newSeq = [...seq, nextBtn];
      setSequence(newSeq);
      setTimeout(() => runSequence(newSeq), 900);
    }
  };

  return { phase, activeColor, playerIdx, best, roundScore, sequenceLength: sequence.length, startGame, handleTap };
}

export type { Phase };
