'use client';

import { useRef, useEffect } from 'react';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!show) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // נקה את הקנבס
    ctx.clearRect(0, 0, width, height);

    // הגדר את הטקסט
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#4CAF50';
    ctx.font = `${Math.min(width, height) * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // צייר את האות במרכז
    ctx.fillText(letter, width / 2, height / 2);
    
    // אפס את השקיפות
    ctx.globalAlpha = 1;
  }, [letter, width, height, opacity, show]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ 
        width: '100%', 
        height: '100%',
        borderRadius: '0.5rem'
      }}
    />
  );
}
