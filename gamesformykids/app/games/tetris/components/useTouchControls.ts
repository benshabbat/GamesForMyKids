import { useCallback } from 'react';
import { TouchControlsProps } from '../types';

type UseTouchControlsParams = Pick<TouchControlsProps, 'isGameRunning' | 'onMove' | 'onRotate'>;

export function useTouchControls({ isGameRunning, onMove, onRotate }: UseTouchControlsParams) {
  const handleMove = useCallback(
    (dx: number, dy: number) => {
      if (!isGameRunning) return;
      onMove(dx, dy);
    },
    [isGameRunning, onMove]
  );

  const handleRotate = useCallback(() => {
    if (!isGameRunning) return;
    onRotate();
  }, [isGameRunning, onRotate]);

  return { handleMove, handleRotate };
}
