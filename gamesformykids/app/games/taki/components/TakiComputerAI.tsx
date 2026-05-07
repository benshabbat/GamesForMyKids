'use client';

import { useEffect, useRef } from 'react';
import { useTakiGame } from '../useTakiGame';

export default function TakiComputerAI() {
  const { phase, currentTurn, turnId, inTakiSequence, computerTurn } = useTakiGame();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phase !== 'playing' || currentTurn !== 'computer') return;
    const delay = inTakiSequence ? 600 : 1100;
    timerRef.current = setTimeout(() => computerTurn(), delay);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, currentTurn, turnId, inTakiSequence, computerTurn]);

  return null;
}
