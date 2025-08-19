/**
 * ===============================================
 * Audio Operations - פעולות אודיו
 * ===============================================
 * 
 * מכיל את כל הפעולות הקשורות לאודיו ודיבור
 */

import { useCallback } from 'react';
import { HebrewLetter } from '../../constants/hebrewLetters';
import { PracticeState } from '../../types/hebrew-letters';
import { 
  ENCOURAGEMENT_MESSAGES, 
  STEP_MESSAGES,
  DEFAULT_AUDIO_STATE 
} from '../../constants/hebrewLettersConstants';

export const useAudioOperations = (
  isAudioEnabled: boolean,
  setIsAudioEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  currentLetter: HebrewLetter | null,
  practiceState: PracticeState
) => {

  // ========================================================================================
  // BASIC AUDIO OPERATIONS
  // ========================================================================================

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled(prev => !prev);
  }, [setIsAudioEnabled]);

  const speakText = useCallback((text: string, customSettings?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    lang?: string;
  }) => {
    if (!isAudioEnabled || !('speechSynthesis' in window)) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = customSettings?.lang || 'he-IL';
    utterance.rate = customSettings?.rate || DEFAULT_AUDIO_STATE.speechRate;
    utterance.pitch = customSettings?.pitch || DEFAULT_AUDIO_STATE.speechPitch;
    utterance.volume = customSettings?.volume || DEFAULT_AUDIO_STATE.volume;
    
    speechSynthesis.speak(utterance);
  }, [isAudioEnabled]);

  // ========================================================================================
  // LETTER-SPECIFIC AUDIO OPERATIONS
  // ========================================================================================

  const playLetterSound = useCallback((letter?: string) => {
    if (!isAudioEnabled) return;
    
    const letterToSpeak = letter || currentLetter?.letter || '';
    const pronunciation = currentLetter?.pronunciation || letter || '';
    
    speakText(`האות ${letterToSpeak}, ${pronunciation}`);
  }, [isAudioEnabled, currentLetter, speakText]);

  const playLetterName = useCallback((letter?: string) => {
    if (!isAudioEnabled) return;
    
    const letterToSpeak = letter || currentLetter?.letter || '';
    speakText(letterToSpeak);
  }, [isAudioEnabled, currentLetter, speakText]);

  const playLetterPronunciation = useCallback((letter?: string) => {
    if (!isAudioEnabled) return;
    
    const letterToUse = letter || currentLetter?.letter;
    if (!letterToUse) return;
    
    const letterData = currentLetter;
    if (letterData?.pronunciation) {
      speakText(letterData.pronunciation);
    }
  }, [isAudioEnabled, currentLetter, speakText]);

  // ========================================================================================
  // ENCOURAGEMENT AND FEEDBACK AUDIO
  // ========================================================================================

  const playEncouragementSound = useCallback(() => {
    if (!isAudioEnabled) return;
    
    const randomMessage = ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
    speakText(randomMessage);
  }, [isAudioEnabled, speakText]);

  const playStepCompletionSound = useCallback(() => {
    if (!isAudioEnabled) return;
    
    const currentStep = practiceState.currentStep;
    const stepMessage = STEP_MESSAGES[currentStep as keyof typeof STEP_MESSAGES];
    
    if (stepMessage) {
      speakText(stepMessage);
    }
  }, [isAudioEnabled, practiceState.currentStep, speakText]);

  const playSuccessSound = useCallback(() => {
    if (!isAudioEnabled) return;
    
    const successMessages = [
      'כל הכבוד!',
      'מעולה!', 
      'יפה מאוד!',
      'נהדר!',
      'פנטסטי!'
    ];
    
    const randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
    speakText(randomMessage);
  }, [isAudioEnabled, speakText]);

  const playCompletionSound = useCallback(() => {
    if (!isAudioEnabled) return;
    
    speakText('סיימת! כל הכבוד על העבודה הנהדרת!');
  }, [isAudioEnabled, speakText]);

  // ========================================================================================
  // INSTRUCTION AUDIO
  // ========================================================================================

  const playInstructions = useCallback((instructions: string) => {
    if (!isAudioEnabled) return;
    
    speakText(instructions);
  }, [isAudioEnabled, speakText]);

  const playWelcomeMessage = useCallback(() => {
    if (!isAudioEnabled) return;
    
    const letterName = currentLetter?.letter || '';
    speakText(`ברוכים הבאים לתרגול האות ${letterName}. בואו נתחיל!`);
  }, [isAudioEnabled, currentLetter, speakText]);

  // ========================================================================================
  // AUDIO CONTROL UTILITIES
  // ========================================================================================

  const stopSpeech = useCallback(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }, []);

  const pauseSpeech = useCallback(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.pause();
    }
  }, []);

  const resumeSpeech = useCallback(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.resume();
    }
  }, []);

  const isSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      return speechSynthesis.speaking;
    }
    return false;
  }, []);

  return {
    // Basic audio control
    toggleAudio,
    speakText,
    
    // Letter-specific audio
    playLetterSound,
    playLetterName,
    playLetterPronunciation,
    
    // Encouragement and feedback
    playEncouragementSound,
    playStepCompletionSound,
    playSuccessSound,
    playCompletionSound,
    
    // Instructions
    playInstructions,
    playWelcomeMessage,
    
    // Audio control utilities
    stopSpeech,
    pauseSpeech,
    resumeSpeech,
    isSpeaking,
    
    // State
    isAudioEnabled
  };
};
