'use client';

import { useRef, useEffect, useState } from 'react';

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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!show) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // נקה את הקנבס
    ctx.clearRect(0, 0, width, height);

    // חשב גודל פונט דינמי
    const fontSize = Math.min(width, height) * 0.6;

    // הגדר את הטקסט עם אפקט מיוחד
    ctx.globalAlpha = opacity;
    
    // צל לטקסט
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // מילוי גרדיאנט
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(0.5, '#66BB6A');
    gradient.addColorStop(1, '#81C784');
    
    ctx.fillStyle = gradient;
    ctx.font = `bold ${fontSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // צייר את האות במרכז
    ctx.fillText(letter, width / 2, height / 2);
    
    // מסגרת דקיקה סביב האות
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    ctx.globalAlpha = opacity * 0.5;
    ctx.strokeText(letter, width / 2, height / 2);
    
    // אפס הגדרות
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }, [letter, width, height, opacity, show]);

  // אנימציה של פעימות
  useEffect(() => {
    if (!show) return;
    
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, [show]);

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
