'use client';
import { useState, useCallback, useEffect } from 'react';
import { setSlowModeActive } from '@/lib/audio/slowSpeechMode';

export function useSlowSpeech() {
  const [slowMode, setSlowMode] = useState(false);

  const toggle = useCallback(() => {
    setSlowMode(prev => {
      const next = !prev;
      setSlowModeActive(next);
      return next;
    });
  }, []);

  // Reset slow mode when the game session unmounts
  useEffect(() => {
    return () => setSlowModeActive(false);
  }, []);

  return { slowMode, toggle };
}
