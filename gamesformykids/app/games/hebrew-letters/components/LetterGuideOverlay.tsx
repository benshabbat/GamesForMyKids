'use client';

import { useLetterGuideOverlay } from './useLetterGuideOverlay';

interface LetterGuideOverlayProps {
  letter: string;
  width: number;
  height: number;
  opacity?: number;
  show?: boolean;
}

export default function LetterGuideOverlay({ 
  letter, 
  width, 
  height, 
  opacity = 0.3,
  show = true 
}: LetterGuideOverlayProps) {
  const { canvasRef, isAnimating } = useLetterGuideOverlay({ letter, width, height, opacity, show });

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`absolute top-0 left-0 pointer-events-none transition-all duration-1000 ${
        isAnimating ? 'scale-105 opacity-90' : 'scale-100'
      }`}
      style={{ 
        width: '100%', 
        height: '100%',
        borderRadius: '0.5rem',
        filter: isAnimating ? 'brightness(1.1)' : 'brightness(1)'
      }}
    />
  );
}
