'use client';

import { useEffect, useRef } from 'react';
import { useTetrisStore } from '../store/tetrisStore';

// A press moves one row at once; only if the button is still held after this delay
// (longer than a normal tap) does the piece start repeating.
const SOFT_DROP_HOLD_DELAY_MS = 250;
// How often the piece steps down, in ms, once the down button is being held.
const SOFT_DROP_HOLD_INTERVAL_MS = 80;

export function useTouchControls() {
  const isGameRunning = useTetrisStore(s => s.phase === 'playing');
  const movePiece = useTetrisStore(s => s.movePiece);
  const handleRotateAction = useTetrisStore(s => s.handleRotate);
  const togglePauseAction = useTetrisStore(s => s.togglePause);
  const holdDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (holdDelayRef.current) clearTimeout(holdDelayRef.current);
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
    if (!isGameRunning || holdDelayRef.current || holdIntervalRef.current) return;
    movePiece(0, 1);
    holdDelayRef.current = setTimeout(() => {
      holdDelayRef.current = null;
      holdIntervalRef.current = setInterval(() => movePiece(0, 1), SOFT_DROP_HOLD_INTERVAL_MS);
    }, SOFT_DROP_HOLD_DELAY_MS);
  };

  const stopSoftDropHold = () => {
    if (holdDelayRef.current) {
      clearTimeout(holdDelayRef.current);
      holdDelayRef.current = null;
    }
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
