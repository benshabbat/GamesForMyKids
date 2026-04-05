'use client';

import { useState, useCallback, useRef } from 'react';

export const BUTTONS = [
  { id: 'red',    bg: 'bg-red-500',    active: 'bg-red-200',    label: '' },
  { id: 'blue',   bg: 'bg-blue-500',   active: 'bg-blue-200',   label: '' },
  { id: 'green',  bg: 'bg-green-500',  active: 'bg-green-200',  label: '' },
  { id: 'yellow', bg: 'bg-yellow-400', active: 'bg-yellow-100', label: '' },
] as const;

export type ButtonId = typeof BUTTONS[number]['id'];
import type { PhaseSimon as Phase } from '@/lib/types';

export function useSimonGame() {
  const [phase, setPhase]             = useState<Phase>('menu');
  const [activeColor, setActiveColor] = useState<ButtonId | null>(null);
  const [playerIdx, setPlayerIdx]     = useState(0);
  const [best, setBest]               = useState(0);
  const [roundScore, setRoundScore]   = useState(0);

  const phaseRef     = useRef<Phase>('menu');
  const sequenceRef  = useRef<ButtonId[]>([]);
  const playerIdxRef = useRef(0);

  const flash = useCallback((id: ButtonId, ms: number) =>
    new Promise<void>(resolve => {
      setActiveColor(id);
      setTimeout(() => { setActiveColor(null); setTimeout(resolve, 120); }, ms);
    }), []);

  const showSequence = useCallback(async (seq: ButtonId[]) => {
    phaseRef.current = 'showing';
    setPhase('showing');
    setPlayerIdx(0);
    await new Promise(r => setTimeout(r, 500));
    const speed = Math.max(280, 650 - seq.length * 25);
    for (const id of seq) {
      if (phaseRef.current !== 'showing') return;
      await flash(id, speed);
    }
    if (phaseRef.current !== 'showing') return;
    phaseRef.current = 'input';
    setPhase('input');
    playerIdxRef.current = 0;
    setPlayerIdx(0);
  }, [flash]);

  const startGame = useCallback(() => {
    const first = BUTTONS[Math.floor(Math.random() * BUTTONS.length)].id;
    const seq: ButtonId[] = [first];
    sequenceRef.current = seq;
    setRoundScore(0);
    showSequence(seq);
  }, [showSequence]);

  const handleTap = useCallback((id: ButtonId) => {
    if (phaseRef.current !== 'input') return;
    setActiveColor(id);
    setTimeout(() => setActiveColor(null), 180);

    const seq = sequenceRef.current;
    const idx = playerIdxRef.current;

    if (id !== seq[idx]) {
      phaseRef.current = 'dead';
      setPhase('dead');
      setBest(b => Math.max(b, seq.length - 1));
      setRoundScore(seq.length - 1);
      return;
    }

    const next = idx + 1;
    playerIdxRef.current = next;
    setPlayerIdx(next);

    if (next >= seq.length) {
      setRoundScore(seq.length);
      const nextBtn = BUTTONS[Math.floor(Math.random() * BUTTONS.length)].id;
      const newSeq: ButtonId[] = [...seq, nextBtn];
      sequenceRef.current = newSeq;
      setTimeout(() => showSequence(newSeq), 900);
    }
  }, [showSequence]);

  return { phase, activeColor, playerIdx, best, roundScore, sequenceRef, startGame, handleTap };
}
