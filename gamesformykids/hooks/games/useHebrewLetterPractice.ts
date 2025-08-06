import { useCallback } from 'react';
import { useHebrewLetters } from '@/contexts';
import { HebrewLetter } from '@/lib/constants/gameData/hebrewLetters';

export const useHebrewLetterPractice = (letterData: HebrewLetter) => {
  const {
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
    setCurrentLetter(letterData);
  }, [setCurrentLetter, letterData]);

  // Check if current step is completed
  const isStepCompleted = (stepIndex: number) => {
    return practiceState.completedSteps.has(stepIndex);
  };

  // Get current step info
  const getCurrentStepInfo = () => {
    const currentStep = practiceState.currentStep;
    return {
      stepIndex: currentStep,
      stepName: practiceSteps[currentStep],
      isCompleted: isStepCompleted(currentStep),
      isFirst: currentStep === 0,
      isLast: currentStep === practiceSteps.length - 1
    };
  };

  // Complete current step and move to next
  const completeCurrentStep = () => {
    markStepCompleted(practiceState.currentStep);
    if (practiceState.currentStep < practiceSteps.length - 1) {
      nextStep();
    } else {
      // Mark entire letter as completed
      markLetterCompleted(letterData.name);
    }
  };

  // Get practice instructions for current step
  const getCurrentInstructions = () => {
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
  };

  // Calculate overall progress percentage
  const getOverallProgress = () => {
    return Math.round((practiceState.completedSteps.size / practiceSteps.length) * 100);
  };

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
