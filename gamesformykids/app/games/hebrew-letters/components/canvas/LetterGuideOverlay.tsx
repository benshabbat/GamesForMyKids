'use client';

import { useLetterGuideOverlay } from './useLetterGuideOverlay';
import { useWritingCanvasContext } from './WritingCanvasContext';

const OVERLAY_BASE_STYLE = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
} as const;

const GUIDE_OPACITY = 0.3;

export default function LetterGuideOverlay() {
  const { guideLetter, drawingState } = useWritingCanvasContext();
  const { canvasWidth: width, canvasHeight: height } = drawingState;

  const { canvasRef, isAnimating } = useLetterGuideOverlay({
    letter: guideLetter ?? '',
    width,
    height,
    opacity: GUIDE_OPACITY,
  });

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`absolute top-0 left-0 pointer-events-none transition-all duration-1000 ${
        isAnimating ? 'scale-105 opacity-90' : 'scale-100'
      }`}
      style={{ ...OVERLAY_BASE_STYLE, filter: isAnimating ? 'brightness(1.1)' : 'brightness(1)' }}
    />
  );
}
