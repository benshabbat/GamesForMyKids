'use client';

import { useTetrisStore } from '../store/tetrisStore';

export function useTouchControls() {
  const isGameRunning = useTetrisStore(s => s.phase === 'playing');
  const movePiece = useTetrisStore(s => s.movePiece);
  const handleRotateAction = useTetrisStore(s => s.handleRotate);
  const hardDropAction = useTetrisStore(s => s.hardDrop);
  const togglePauseAction = useTetrisStore(s => s.togglePause);

  const handleMove = (dx: number, dy: number) => {
    if (!isGameRunning) return;
    movePiece(dx, dy);
  };

  const handleRotate = () => {
    if (!isGameRunning) return;
    handleRotateAction();
  };

  const handleHardDrop = () => {
    if (!isGameRunning) return;
    hardDropAction();
  };

  const handleTogglePause = () => {
    togglePauseAction();
  };

  return { handleMove, handleRotate, handleHardDrop, handleTogglePause };
}
