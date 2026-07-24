'use client';
import { useEffect, useRef } from 'react';
import { useNumberSlideStore } from './numberSlideStore';
import { speak } from '@/lib/utils/speech/enhancedSpeechUtils';
import { useKeyboardControls } from '@/hooks/shared/game-controls';

export function useNumberSlide() {
  const store = useNumberSlideStore();
  const { slide, lastMerges } = store;
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Speak merged values
  useEffect(() => {
    if (lastMerges.length === 0) return;
    const unique = [...new Set(lastMerges)];
    unique.forEach((v, i) => {
      setTimeout(() => speak(String(v)), i * 400);
    });
  }, [lastMerges]);

  // Keyboard input
  useKeyboardControls({
    ArrowLeft: () => slide('left'), ArrowRight: () => slide('right'),
    ArrowUp: () => slide('up'), ArrowDown: () => slide('down'),
  });

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (Math.max(absDx, absDy) < 30) return;
    if (absDx > absDy) slide(dx > 0 ? 'right' : 'left');
    else               slide(dy > 0 ? 'down' : 'up');
  };

  return { ...store, onTouchStart, onTouchEnd };
}
