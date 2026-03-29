'use client';

import { useRef, useEffect, useState } from 'react';

interface UseLetterGuideOverlayParams {
  letter: string;
  width: number;
  height: number;
  opacity: number;
  show: boolean;
}

export function useLetterGuideOverlay({
  letter,
  width,
  height,
  opacity,
  show,
}: UseLetterGuideOverlayParams) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // ציור האות על הקנבס
  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    const fontSize = Math.min(width, height) * 0.6;

    ctx.globalAlpha = opacity;
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(0.5, '#66BB6A');
    gradient.addColorStop(1, '#81C784');

    ctx.fillStyle = gradient;
    ctx.font = `bold ${fontSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, width / 2, height / 2);

    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    ctx.globalAlpha = opacity * 0.5;
    ctx.strokeText(letter, width / 2, height / 2);

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }, [letter, width, height, opacity, show]);

  // אנימציית פעימות
  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => setIsAnimating(prev => !prev), 2000);
    return () => clearInterval(interval);
  }, [show]);

  return { canvasRef, isAnimating };
}
