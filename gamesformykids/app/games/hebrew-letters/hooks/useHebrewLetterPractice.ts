import { useCallback, useEffect } from 'react';
import { useHebrewLetters } from '@/contexts';
import { HebrewLetter } from '../constants/hebrewLetters';

export const useHebrewLetterPractice = (letterData: HebrewLetter) => {
  const {
    practiceState,
    initializeLetter,
    completeCurrentStep,
    isStepCompleted,
    getCurrentStepInfo,
    getCurrentInstructions,
    getOverallProgress,
    getStepTabStyle,
    getStepTabIcon,
    nextStep,
    previousStep,
    goToStep,
    markStepCompleted,
    practiceSteps,
    startPracticeSession,
    endPracticeSession,
    playLetterSound,
    toggleAudio,
    isAudioEnabled,
  } = useHebrewLetters();

  // Initialize letter with current data
  const initialize = useCallback(() => {
    initializeLetter(letterData);
  }, [initializeLetter, letterData]);

  // הפעלת session בעת mount, ניקוי ב-unmount
  useEffect(() => {
    initialize();
    startPracticeSession(letterData.name);
    return () => {
      endPracticeSession();
    };
  }, [initialize, startPracticeSession, endPracticeSession, letterData.name]);

  return {
    // State
    practiceState,
    currentStepInfo: getCurrentStepInfo(),
    overallProgress: getOverallProgress(),
    
    // Actions
    initializeLetter: initialize,
    completeCurrentStep,
    nextStep,
    previousStep,
    goToStep,
    markStepCompleted,
    
    // Helpers
    isStepCompleted,
    getCurrentInstructions,
    getStepTabStyle,
    getStepTabIcon,
    
    // Audio
    playLetterSound,
    toggleAudio,
    isAudioEnabled,
    
    // Data
    practiceSteps,
    letterData,
  };
};

export default useHebrewLetterPractice;
