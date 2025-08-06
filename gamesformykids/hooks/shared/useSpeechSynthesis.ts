'use client';

import { useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const speak = useCallback((text: string, options?: {
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
  }) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // עצור דיבור נוכחי אם קיים
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options?.lang || 'he-IL';
    utterance.rate = options?.rate || 0.8;
    utterance.pitch = options?.pitch || 1;
    utterance.volume = options?.volume || 1;

    window.speechSynthesis.speak(utterance);
  }, []);

  const speakLetter = useCallback((letterName: string, pronunciation: string) => {
    speak(`האות ${letterName}, נקראת ${pronunciation}`, { rate: 0.7 });
  }, [speak]);

  const speakEncouragement = useCallback((message: string) => {
    speak(message, { rate: 0.9, pitch: 1.2 });
  }, [speak]);

  return {
    speak,
    speakLetter,
    speakEncouragement
  };
};
