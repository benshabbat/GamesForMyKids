'use client';
import { useEffect } from 'react';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import type { PhonicsQuestion } from '@/lib/quiz/data/phonics';

export function usePhonicsInteraction(current: PhonicsQuestion) {
  const speak = () => {
    speakHebrew(current.sound).catch(() => {});
  };

  // Auto-play on each new question so pre-readers don't need to tap first
  useEffect(() => {
    speakHebrew(current.sound).catch(() => {});
  }, [current.sound]);

  return { speak };
}
