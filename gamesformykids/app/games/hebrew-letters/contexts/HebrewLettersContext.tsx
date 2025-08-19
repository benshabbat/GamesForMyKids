/**
 * Hebrew Letters Context
 * 
 * A comprehensive context for managing Hebrew letter practice and drawing functionality.
 * This context handles:
 * - Letter selection and state management
 * - Drawing canvas operations
 * - Practice step progression
 * - Encouragement and feedback systems
 * - Progress tracking
 * 
 * @author Generated and cleaned up
 * @version 3.0 - Refactored into modular operations
 */

'use client';

import { createContext, useContext, useState } from 'react';
import { HebrewLetter } from '../constants/hebrewLetters';
import {
  DEFAULT_DRAWING_STATE,
  DEFAULT_PRACTICE_STATE,
  DEFAULT_ENCOURAGEMENT_STATE,
  DEFAULT_AUDIO_STATE,
  DEFAULT_LEARNING_STATS
} from '../constants/hebrewLettersConstants';
import {
  createGetStepMessage,
  createGetCompletionMessage,
  createGetCurrentInstructions,
  createGetOverallProgress,
  createGetStepTabStyle,
  createGetStepTabIcon
} from './hebrewLettersUtils';
import {
  DrawingState,
  PracticeState,
  EncouragementState,
  LearningStats,
  HebrewLettersContextType,
  HebrewLettersProviderProps
} from '../types/hebrew-letters';
import { 
  useDrawingOperations,
  useAudioOperations,
  usePracticeOperations
} from './operations';

// ========================================================================================
// CONTEXT CREATION
// ========================================================================================

const HebrewLettersContext = createContext<HebrewLettersContextType | undefined>(undefined);

// ========================================================================================
// MAIN PROVIDER COMPONENT
// ========================================================================================

/**
 * Hebrew Letters Provider Component
 * 
 * Provides context for Hebrew letter practice functionality across the application.
 * Manages state for drawing, practice progression, encouragement, and progress tracking.
 */
export const HebrewLettersProvider = ({ children }: HebrewLettersProviderProps) => {
  // ========================================================================================
  // STATE MANAGEMENT
  // ========================================================================================
  
  const [currentLetter, setCurrentLetter] = useState<HebrewLetter | null>(null);
  const [drawingState, setDrawingState] = useState<DrawingState>(DEFAULT_DRAWING_STATE);
  const [practiceState, setPracticeState] = useState<PracticeState>(DEFAULT_PRACTICE_STATE);
  const [encouragementState, setEncouragementState] = useState<EncouragementState>(DEFAULT_ENCOURAGEMENT_STATE);
  const [completedLetters, setCompletedLetters] = useState<Set<string>>(new Set());
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(DEFAULT_AUDIO_STATE.isAudioEnabled);
  const [learningStats, setLearningStats] = useState<LearningStats>({
    ...DEFAULT_LEARNING_STATS,
    lettersStarted: new Set(),
    lettersCompleted: new Set(),
    practiceHistory: []
  });

  // ========================================================================================
  // OPERATIONS HOOKS
  // ========================================================================================
  
  const drawingOperations = useDrawingOperations(drawingState, setDrawingState);
  
  const audioOperations = useAudioOperations(
    isAudioEnabled,
    setIsAudioEnabled,
    currentLetter,
    practiceState
  );
  
  const practiceOperations = usePracticeOperations(
    currentLetter,
    setCurrentLetter,
    practiceState,
    setPracticeState,
    encouragementState,
    setEncouragementState,
    completedLetters,
    setCompletedLetters,
    learningStats,
    setLearningStats
  );

  // ========================================================================================
  // UTILITY FUNCTIONS
  // ========================================================================================

  const getStepMessage = createGetStepMessage(practiceState);
  const getCompletionMessage = createGetCompletionMessage(currentLetter, practiceState);
  const getCurrentInstructions = createGetCurrentInstructions(currentLetter, practiceState);
  const getOverallProgress = createGetOverallProgress(practiceState);
  const getStepTabStyle = createGetStepTabStyle(practiceState);
  const getStepTabIcon = createGetStepTabIcon(practiceState);

  // ========================================================================================
  // CONTEXT VALUE
  // ========================================================================================

  const contextValue: HebrewLettersContextType = {
    // State
    currentLetter,
    drawingState,
    practiceState,
    encouragementState,
    completedLetters,
    learningStats,

    // Drawing operations
    ...drawingOperations,

    // Audio operations (includes isAudioEnabled)
    ...audioOperations,

    // Practice operations
    ...practiceOperations,

    // Legacy compatibility functions
    setCurrentLetter,
    initializeLetter: practiceOperations.selectLetter,
    markStepCompleted: practiceOperations.completeCurrentStep,
    goToStep: (stepIndex: number) => practiceOperations.jumpToStep(stepIndex),
    completeCurrentStep: practiceOperations.completeCurrentStep,
    isStepCompleted: (stepIndex: number) => practiceState.completedSteps.has(stepIndex),
    getCurrentStepInfo: () => ({
      stepIndex: practiceState.currentStep,
      stepName: practiceState.currentStep.toString(),
      isCompleted: practiceState.completedSteps.has(practiceState.currentStep),
      isFirst: practiceState.currentStep === 0,
      isLast: practiceState.currentStep === 4
    }),
    showStepEncouragement: practiceOperations.showEncouragement,
    hideEncouragement: practiceOperations.hideEncouragement,
    markLetterCompleted: (letterName: string) => {
      setCompletedLetters(prev => new Set([...prev, letterName]));
    },
    getLetterProgress: (letterName: string) => {
      if (completedLetters.has(letterName)) return 100;
      if (currentLetter?.letter === letterName) return practiceOperations.getCompletionPercentage();
      return 0;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logPracticeActivity: (_letter: string, _step: number, _timeSpent: number) => {
      // נוספה לתאימות אחורה - יכולה להישאר ריקה או לממש
    },
    getTotalPracticeTime: () => learningStats.totalPracticeTime,
    getLetterStats: (letterName: string) => ({
      timesStarted: learningStats.lettersStarted.has(letterName) ? 1 : 0,
      timesCompleted: learningStats.lettersCompleted.has(letterName) ? 1 : 0,
      totalTimeSpent: 0, // יכול להיחשב מההיסטוריה
      averageTimePerStep: 0
    }),
    exportLearningData: () => JSON.stringify(learningStats),
    resetAllStats: () => setLearningStats({
      ...DEFAULT_LEARNING_STATS,
      lettersStarted: new Set(),
      lettersCompleted: new Set(),
      practiceHistory: []
    }),

    // Constants and settings
    strokeColors: ['#000000', '#FF0000', '#0000FF', '#00FF00'] as const,
    strokeWidths: [2, 4, 6, 8] as const,
    practiceSteps: ['introduction', 'tracing', 'guided', 'freehand', 'completion'] as const,
    encouragementMessages: ['כל הכבוד!', 'מעולה!', 'נהדר!'] as const,
    stepMessages: {
      0: 'בואו נכיר את האות',
      1: 'עקוב אחר הקווים',
      2: 'כתוב עם הדרכה',
      3: 'כתוב בחופשיות',
      4: 'סיימת!'
    },

    // Utility functions
    getStepMessage,
    getCompletionMessage,
    getCurrentInstructions,
    getOverallProgress,
    getStepTabStyle,
    getStepTabIcon
  };

  return (
    <HebrewLettersContext.Provider value={contextValue}>
      {children}
    </HebrewLettersContext.Provider>
  );
};

// ========================================================================================
// CUSTOM HOOKS FOR CONTEXT ACCESS
// ========================================================================================

/**
 * Custom hook to access Hebrew Letters context
 * 
 * @returns HebrewLettersContextType - The complete context object
 * @throws Error if used outside of HebrewLettersProvider
 */
export const useHebrewLetters = (): HebrewLettersContextType => {
  const context = useContext(HebrewLettersContext);
  if (context === undefined) {
    throw new Error('useHebrewLetters must be used within a HebrewLettersProvider');
  }
  return context;
};
