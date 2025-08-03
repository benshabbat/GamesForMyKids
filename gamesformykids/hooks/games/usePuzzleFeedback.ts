import { useState, useEffect, useCallback } from 'react';
import { speakHebrew, initSpeechAndAudio } from '@/lib/utils/enhancedSpeechUtils';
import { playSuccessSound } from '@/lib/utils/gameUtils';

export interface FeedbackHook {
  feedbackMessage: string;
  feedbackType: 'success' | 'error' | '';
  showFeedback: (message: string, type: 'success' | 'error') => void;
  speak: (message: string) => void;
}

/**
 * Custom hook for handling puzzle feedback (audio + visual)
 */
export const usePuzzleFeedback = (): FeedbackHook => {
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  // Initialize Audio and Speech
  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  const showFeedback = useCallback((message: string, type: 'success' | 'error') => {
    setFeedbackMessage(message);
    setFeedbackType(type);
    
    // Play success sound for success type
    if (type === 'success') {
      playSuccessSound(audioContext);
    }
    
    // Clear feedback after duration
    const SUCCESS_FEEDBACK_DURATION_MS = 2000;
    const ERROR_FEEDBACK_DURATION_MS = 1500;
    
    setTimeout(() => {
      setFeedbackMessage('');
      setFeedbackType('');
    }, type === 'success' ? SUCCESS_FEEDBACK_DURATION_MS : ERROR_FEEDBACK_DURATION_MS);
  }, [audioContext]);

  const speak = useCallback(async (message: string) => {
    if (speechEnabled) {
      await speakHebrew(message);
    }
  }, [speechEnabled]);

  return {
    feedbackMessage,
    feedbackType,
    showFeedback,
    speak
  };
};
