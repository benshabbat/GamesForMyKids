'use client';

import { useEffect, useRef } from 'react';
import { useTakiStore } from '../takiGameStore';

export default function TakiComputerAI() {
  const phase = useTakiStore(s => s.phase);
  const currentTurn = useTakiStore(s => s.currentTurn);
  const turnId = useTakiStore(s => s.turnId);
  const inTakiSequence = useTakiStore(s => s.inTakiSequence);
  const computerTurn = useTakiStore(s => s.computerTurn);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phase !== 'playing' || currentTurn !== 'computer') return;
    const delay = inTakiSequence ? 600 : 1100;
    timerRef.current = setTimeout(() => computerTurn(), delay);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, currentTurn, turnId, inTakiSequence, computerTurn]);

  return null;
}
