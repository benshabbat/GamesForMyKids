'use client';

import { useCallback } from 'react';
import { useTetrisStore } from '@/lib/stores/tetrisStore';

export function useTouchControls() {
  const isGameRunning = useTetrisStore(s => s.isGameRunning);
  const movePiece = useTetrisStore(s => s.movePiece);
  const handleRotateAction = useTetrisStore(s => s.handleRotate);

  const handleMove = useCallback(
    (dx: number, dy: number) => {
      if (!isGameRunning) return;
      movePiece(dx, dy);
    },
    [isGameRunning, movePiece]
  );

  const handleRotate = useCallback(() => {
    if (!isGameRunning) return;
    handleRotateAction();
  }, [isGameRunning, handleRotateAction]);

  return { handleMove, handleRotate };
}
