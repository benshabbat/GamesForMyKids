'use client';

import { useCallback } from 'react';
import { AUDIO_CONSTANTS } from '../../../lib/constants/core';

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
    utterance.rate = options?.rate || AUDIO_CONSTANTS.SPEECH.HEBREW_RATE;
    utterance.pitch = options?.pitch || AUDIO_CONSTANTS.SPEECH.DEFAULT_PITCH;
    utterance.volume = options?.volume || AUDIO_CONSTANTS.SPEECH.DEFAULT_VOLUME;

    window.speechSynthesis.speak(utterance);
  }, []);

  const speakLetter = useCallback((letterName: string, pronunciation: string) => {
    speak(`האות ${letterName}, נקראת ${pronunciation}`, { rate: AUDIO_CONSTANTS.SPEECH.HEBREW_RATE });
  }, [speak]);

  const speakEncouragement = useCallback((message: string) => {
    speak(message, { 
      rate: AUDIO_CONSTANTS.SPEECH.HEBREW_RATE * 1.06, // קצת יותר מהיר לעידוד
      pitch: AUDIO_CONSTANTS.SPEECH.DEFAULT_PITCH 
    });
  }, [speak]);

  return {
    speak,
    speakLetter,
    speakEncouragement
  };
};
