import { useCallback } from 'react';
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
    practiceSteps
  } = useHebrewLetters();

  // Initialize letter with current data
  const initialize = useCallback(() => {
    initializeLetter(letterData);
  }, [initializeLetter, letterData]);

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
    
    // Data
    practiceSteps,
    letterData
  };
};

export default useHebrewLetterPractice;
