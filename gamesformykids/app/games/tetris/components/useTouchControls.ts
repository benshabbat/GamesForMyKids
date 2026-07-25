'use client';

import { useEffect, useRef } from 'react';
import { useTetrisStore } from '../store/tetrisStore';

// How often the piece steps down, in ms, while the down button is held.
const SOFT_DROP_HOLD_INTERVAL_MS = 80;

export function useTouchControls() {
  const isGameRunning = useTetrisStore(s => s.phase === 'playing');
  const movePiece = useTetrisStore(s => s.movePiece);
  const handleRotateAction = useTetrisStore(s => s.handleRotate);
  const togglePauseAction = useTetrisStore(s => s.togglePause);
  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const handleMove = (dx: number, dy: number) => {
    if (!isGameRunning) return;
    movePiece(dx, dy);
  };

  const handleRotate = () => {
    if (!isGameRunning) return;
    handleRotateAction();
  };

  // Single press moves one row down; holding keeps stepping down until released.
  const startSoftDropHold = () => {
    if (!isGameRunning || holdIntervalRef.current) return;
    movePiece(0, 1);
    holdIntervalRef.current = setInterval(() => movePiece(0, 1), SOFT_DROP_HOLD_INTERVAL_MS);
  };

  const stopSoftDropHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  const handleTogglePause = () => {
    togglePauseAction();
  };

  return { handleMove, handleRotate, startSoftDropHold, stopSoftDropHold, handleTogglePause };
}
