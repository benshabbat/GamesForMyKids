'use client';

import { useEffect } from 'react';
import { HebrewLetter } from '../constants/hebrewLetters';
import {
  useHebrewLettersStore,
  getCurrentInstructions,
  getOverallProgress,
  getStepTabStyle,
  getStepTabIcon,
} from '../store/hebrewLettersStore';
import { PRACTICE_STEPS } from '../constants/hebrewLettersConstants';

export const useHebrewLetterPractice = (letterData: HebrewLetter) => {
  const practiceState = useHebrewLettersStore((s) => s.practiceState);
  const isAudioEnabled = useHebrewLettersStore((s) => s.isAudioEnabled);
  const {
    startPracticeSession,
    endPracticeSession,
    selectLetter,
    completeCurrentStep,
    nextStep,
    previousStep,
    jumpToStep,
    playLetterSound,
    toggleAudio,
  } = useHebrewLettersStore();

  // הפעלת session בעת mount, ניקוי ב-unmount
  useEffect(() => {
    selectLetter(letterData);
    startPracticeSession(letterData.name);
    return () => {
      endPracticeSession();
    };
    // intentionally omit selectLetter/startPracticeSession/endPracticeSession — they are
    // stable Zustand store actions; letterData object is omitted to avoid re-running when
    // other fields change — only the letter name triggers a new practice session
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letterData.name]);

  return {
    // State
    practiceState,
    currentStepInfo: {
      stepIndex: practiceState.currentStep,
      stepName: practiceState.currentStep.toString(),
      isCompleted: practiceState.completedSteps.has(practiceState.currentStep),
      isFirst: practiceState.currentStep === 0,
      isLast: practiceState.currentStep === PRACTICE_STEPS.length - 1,
    },
    overallProgress: getOverallProgress(practiceState),

    // Actions
    completeCurrentStep,
    nextStep,
    previousStep,
    goToStep: jumpToStep,

    // Helpers
    isStepCompleted: (i: number) => practiceState.completedSteps.has(i),
    getCurrentInstructions: () => getCurrentInstructions(letterData, practiceState),
    getStepTabStyle: (i: number) => getStepTabStyle(practiceState, i),
    getStepTabIcon: (i: number) => getStepTabIcon(practiceState, i),

    // Audio
    playLetterSound,
    toggleAudio,
    isAudioEnabled,

    // Data
    practiceSteps: PRACTICE_STEPS,
    letterData,
  };
};

export default useHebrewLetterPractice;

