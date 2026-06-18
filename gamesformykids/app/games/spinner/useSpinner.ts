'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSpinnerStore } from './spinnerStore';
import { speakHebrew } from '@/lib/utils/speech/speaker';

export const WHEEL_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
  '#BB8FCE', '#82E0AA', '#F0B27A', '#85C1E9',
];

const STORAGE_KEY = 'spinner-segments';

export function useSpinner() {
  const { segments, result, setResult, setSegments, isEditing, toggleEditing, addSegment, removeSegment, editSegment, applyPreset } =
    useSpinnerStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const animFrameRef = useRef<number | null>(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 2) {
          setSegments(parsed as string[]);
        }
      }
    } catch {
      /* ignore */
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || segments.length < 2) return;
    setResult(null);
    setIsSpinning(true);

    const n = segments.length;
    const segAngle = 360 / n;
    const winIndex = Math.floor(Math.random() * n);

    // We want: finalRotation % 360 === (winIndex + 0.5) * segAngle
    const targetAngle = (winIndex + 0.5) * segAngle;
    const currentMod = rotationRef.current % 360;
    const delta = (targetAngle - currentMod + 360) % 360;
    const fullSpins = (5 + Math.floor(Math.random() * 4)) * 360;
    const finalRotation = rotationRef.current + fullSpins + delta;

    const startTime = performance.now();
    const duration = 3800;
    const startRotation = rotationRef.current;

    function easeOut(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const current = startRotation + (finalRotation - startRotation) * easeOut(t);
      rotationRef.current = current;
      setRotation(current);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        rotationRef.current = finalRotation;
        setRotation(finalRotation);
        setIsSpinning(false);
        const winner = segments[winIndex] ?? '';
        setResult(winner);
        if (winner) speakHebrew(`קיבלת: ${winner}!`);
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isSpinning, segments, setResult]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const shareWhatsApp = useCallback(() => {
    if (!result) return;
    const text = encodeURIComponent(`הגלגל הראה: ${result}! 🎡`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }, [result]);

  return {
    segments,
    rotation,
    isSpinning,
    result,
    isEditing,
    spin,
    shareWhatsApp,
    toggleEditing,
    addSegment,
    removeSegment,
    editSegment,
    applyPreset,
  };
}
