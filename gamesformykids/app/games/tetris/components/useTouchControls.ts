'use client';

import { useTetrisStore } from '../store/tetrisStore';

export function useTouchControls() {
  const isGameRunning = useTetrisStore(s => s.phase === 'playing');
  const movePiece = useTetrisStore(s => s.movePiece);
  const handleRotateAction = useTetrisStore(s => s.handleRotate);

  const handleMove = (dx: number, dy: number) => {
    if (!isGameRunning) return;
    movePiece(dx, dy);
  };

  const handleRotate = () => {
    if (!isGameRunning) return;
    handleRotateAction();
  };

  return { handleMove, handleRotate };
}
