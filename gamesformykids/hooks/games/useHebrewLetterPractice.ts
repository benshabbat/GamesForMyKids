import { useCallback } from 'react';
import { useHebrewLetters } from '@/contexts';
import { HebrewLetter } from '@/lib/constants/gameData/hebrewLetters';

export const useHebrewLetterPractice = (letterData: HebrewLetter) => {
  const {
    currentLetter,
    practiceState,
    markStepCompleted,
    nextStep,
    previousStep,
    setCurrentLetter,
    markLetterCompleted,
    practiceSteps
  } = useHebrewLetters();

  // Initialize current letter
  const initializeLetter = useCallback(() => {
    // Only set current letter if it's different or not set
    if (!currentLetter || currentLetter.name !== letterData.name) {
      setCurrentLetter(letterData);
    }
  }, [setCurrentLetter, letterData, currentLetter]);

  // Check if current step is completed
  const isStepCompleted = useCallback((stepIndex: number) => {
    return practiceState.completedSteps.has(stepIndex);
  }, [practiceState.completedSteps]);

  // Get current step info
  const getCurrentStepInfo = useCallback(() => {
    const currentStep = practiceState.currentStep;
    return {
      stepIndex: currentStep,
      stepName: practiceSteps[currentStep],
      isCompleted: isStepCompleted(currentStep),
      isFirst: currentStep === 0,
      isLast: currentStep === practiceSteps.length - 1
    };
  }, [practiceState.currentStep, practiceSteps, isStepCompleted]);

  // Complete current step and move to next
  const completeCurrentStep = useCallback(() => {
    const currentStep = practiceState.currentStep;
    markStepCompleted(currentStep);
    
    if (currentStep < practiceSteps.length - 1) {
      nextStep();
    } else {
      // Mark entire letter as completed
      markLetterCompleted(letterData.name);
    }
  }, [practiceState.currentStep, markStepCompleted, nextStep, practiceSteps.length, markLetterCompleted, letterData.name]);

  // Get practice instructions for current step
  const getCurrentInstructions = useCallback(() => {
    const stepIndex = practiceState.currentStep;
    switch (stepIndex) {
      case 0:
        return [
          `התבונני באות ${letterData.letter} הגדולה למעלה`,
          `האות ${letterData.letter} נקראת "${letterData.pronunciation}"`,
          `למד על צורת האות ואיך היא נכתבת`
        ];
      case 1:
        return [
          `עקבי באצבע על האותיות המנוקדות`,
          `התחילי מהנקודה העליונה של האות`,
          `עקבי לאט ובזהירות על הקווים`
        ];
      case 2:
        return [
          `עכשיו תרגלי לכתוב את האות ${letterData.letter} בעצמך`,
          `השתמשי בעכבר או במגע על המסך`,
          `זכרי לכתוב מימין לשמאל`
        ];
      default:
        return [`תרגלי את האות ${letterData.letter}`];
    }
  }, [practiceState.currentStep, letterData.letter, letterData.pronunciation]);

  // Calculate overall progress percentage
  const getOverallProgress = useCallback(() => {
    return Math.round((practiceState.completedSteps.size / practiceSteps.length) * 100);
  }, [practiceState.completedSteps.size, practiceSteps.length]);

  return {
    // State
    practiceState,
    currentStepInfo: getCurrentStepInfo(),
    overallProgress: getOverallProgress(),
    
    // Actions
    initializeLetter,
    completeCurrentStep,
    nextStep,
    previousStep,
    markStepCompleted,
    
    // Helpers
    isStepCompleted,
    getCurrentInstructions,
    
    // Data
    practiceSteps,
    letterData
  };
};

export default useHebrewLetterPractice;
