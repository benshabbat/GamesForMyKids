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
 * @version 2.0 - Refactored for better maintainability
 */

'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { HebrewLetter } from '@/lib/constants/gameData/hebrewLetters';
import {
  STROKE_COLORS,
  STROKE_WIDTHS,
  PRACTICE_STEPS,
  ENCOURAGEMENT_MESSAGES,
  STEP_MESSAGES,
  DEFAULT_DRAWING_STATE,
  DEFAULT_PRACTICE_STATE,
  DEFAULT_ENCOURAGEMENT_STATE,
  DEFAULT_AUDIO_STATE,
  DEFAULT_LEARNING_STATS,
  ENCOURAGEMENT_DURATION
} from '@/lib/constants/hebrewLettersConstants';
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
} from '@/lib/types/contexts/hebrew-letters';

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
export const HebrewLettersProvider= ({ children }: HebrewLettersProviderProps) => {
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
  // DRAWING STATE OPERATIONS
  // ========================================================================================
  const updateDrawingState = useCallback((updates: Partial<DrawingState>) => {
    setDrawingState(prev => ({ ...prev, ...updates }));
  }, []);

  const clearCanvas = useCallback(() => {
    setDrawingState(prev => ({
      ...prev,
      paths: [],
      isDrawing: false
    }));
  }, []);

  const saveCanvasState = useCallback((imageData: ImageData) => {
    setDrawingState(prev => ({
      ...prev,
      paths: [...prev.paths, imageData]
    }));
  }, []);

  const undoLastAction = useCallback(() => {
    setDrawingState(prev => ({
      ...prev,
      paths: prev.paths.slice(0, -1)
    }));
  }, []);

  // ========================================================================================
  // ADVANCED CANVAS OPERATIONS
  // ========================================================================================

  const initializeCanvas = useCallback((width: number, height: number, backgroundColor = '#ffffff') => {
    updateDrawingState({
      canvasWidth: width,
      canvasHeight: height,
      backgroundColor,
      paths: [],
      isDrawing: false,
      lastDrawPosition: null
    });
  }, [updateDrawingState]);

  const startDrawing = useCallback((x: number, y: number) => {
    updateDrawingState({
      isDrawing: true,
      lastDrawPosition: { x, y }
    });
  }, [updateDrawingState]);

  const continueDrawing = useCallback((x: number, y: number) => {
    if (!drawingState.isDrawing) return;
    updateDrawingState({
      lastDrawPosition: { x, y }
    });
  }, [drawingState.isDrawing, updateDrawingState]);

  const stopDrawing = useCallback(() => {
    updateDrawingState({
      isDrawing: false,
      lastDrawPosition: null
    });
  }, [updateDrawingState]);

  const downloadCanvas = useCallback((filename = 'hebrew-letter-practice.png') => {
    // This would be implemented by the component using the context
  }, []);

  const getCanvasPosition = useCallback((event: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.touches[0]?.clientX || 0;
      clientY = event.touches[0]?.clientY || 0;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }, []);

  const resetCanvas = useCallback(() => {
    setDrawingState(DEFAULT_DRAWING_STATE);
  }, []);

  // ========================================================================================
  // AUDIO AND SPEECH OPERATIONS
  // ========================================================================================

  const playLetterSound = useCallback((letter?: string) => {
    if (!isAudioEnabled) return;
    
    const letterToSpeak = letter || currentLetter?.letter || '';
    const pronunciation = currentLetter?.pronunciation || letter || '';
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`האות ${letterToSpeak}, ${pronunciation}`);
      utterance.lang = 'he-IL';
      utterance.rate = DEFAULT_AUDIO_STATE.speechRate;
      utterance.pitch = DEFAULT_AUDIO_STATE.speechPitch;
      utterance.volume = DEFAULT_AUDIO_STATE.volume;
      speechSynthesis.speak(utterance);
    }
  }, [isAudioEnabled, currentLetter]);

  const playEncouragementSound = useCallback(() => {
    if (!isAudioEnabled) return;
    
    const randomMessage = ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(randomMessage);
      utterance.lang = 'he-IL';
      utterance.rate = DEFAULT_AUDIO_STATE.speechRate;
      utterance.pitch = DEFAULT_AUDIO_STATE.speechPitch;
      utterance.volume = DEFAULT_AUDIO_STATE.volume;
      speechSynthesis.speak(utterance);
    }
  }, [isAudioEnabled]);

  const playStepCompletionSound = useCallback(() => {
    if (!isAudioEnabled) return;
    
    const currentStep = practiceState.currentStep;
    const stepMessage = STEP_MESSAGES[currentStep as keyof typeof STEP_MESSAGES];
    
    if (stepMessage && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(stepMessage);
      utterance.lang = 'he-IL';
      utterance.rate = DEFAULT_AUDIO_STATE.speechRate;
      utterance.pitch = DEFAULT_AUDIO_STATE.speechPitch;
      utterance.volume = DEFAULT_AUDIO_STATE.volume;
      speechSynthesis.speak(utterance);
    }
  }, [isAudioEnabled, practiceState.currentStep]);

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled(prev => !prev);
  }, []);

  // ========================================================================================
  // ANALYTICS AND STATISTICS OPERATIONS
  // ========================================================================================

  const startPracticeSession = useCallback((letterName: string) => {
    setLearningStats(prev => ({
      ...prev,
      lettersStarted: new Set([...prev.lettersStarted, letterName]),
      sessionStartTime: Date.now()
    }));
  }, []);

  const endPracticeSession = useCallback(() => {
    setLearningStats(prev => ({
      ...prev,
      sessionStartTime: 0
    }));
  }, []);

  const logPracticeActivity = useCallback((letter: string, step: number, timeSpent: number) => {
    setLearningStats(prev => ({
      ...prev,
      totalPracticeTime: prev.totalPracticeTime + timeSpent,
      practiceHistory: [
        ...prev.practiceHistory,
        {
          letter,
          stepCompleted: step,
          timeSpent,
          timestamp: Date.now()
        }
      ]
    }));
  }, []);

  const getTotalPracticeTime = useCallback(() => {
    return learningStats.totalPracticeTime;
  }, [learningStats.totalPracticeTime]);

  const getLetterStats = useCallback((letterName: string) => {
    const letterHistory = learningStats.practiceHistory.filter(h => h.letter === letterName);
    const timesStarted = learningStats.lettersStarted.has(letterName) ? 1 : 0;
    const timesCompleted = learningStats.lettersCompleted.has(letterName) ? 1 : 0;
    const totalTimeSpent = letterHistory.reduce((sum, h) => sum + h.timeSpent, 0);
    const averageTimePerStep = letterHistory.length > 0 ? totalTimeSpent / letterHistory.length : 0;

    return {
      timesStarted,
      timesCompleted,
      totalTimeSpent,
      averageTimePerStep
    };
  }, [learningStats]);

  const exportLearningData = useCallback(() => {
    return JSON.stringify({
      ...learningStats,
      lettersStarted: Array.from(learningStats.lettersStarted),
      lettersCompleted: Array.from(learningStats.lettersCompleted),
      exportDate: new Date().toISOString()
    }, null, 2);
  }, [learningStats]);

  const resetAllStats = useCallback(() => {
    setLearningStats({
      totalPracticeTime: 0,
      lettersStarted: new Set(),
      lettersCompleted: new Set(),
      totalStrokes: 0,
      sessionStartTime: 0,
      practiceHistory: []
    });
  }, []);

  // ========================================================================================
  // PRACTICE STATE OPERATIONS
  // ========================================================================================

  const updatePracticeState = useCallback((updates: Partial<PracticeState>) => {
    setPracticeState(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setPracticeState(prev => ({
      ...prev,
      currentStep: Math.min(PRACTICE_STEPS.length - 1, prev.currentStep + 1)
    }));
  }, []);

  const previousStep = useCallback(() => {
    setPracticeState(prev => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1)
    }));
  }, []);

  const markStepCompleted = useCallback((step: number) => {
    setPracticeState(prev => ({
      ...prev,
      completedSteps: new Set([...prev.completedSteps, step])
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setPracticeState(prev => ({
      ...prev,
      currentStep: step
    }));
  }, []);

  // ========================================================================================
  // ENCOURAGEMENT SYSTEM
  // ========================================================================================
  const showStepEncouragement = useCallback(() => {
    const randomMessage = ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
    setEncouragementState({
      showEncouragement: true,
      currentMessage: randomMessage,
      isStepCompleted: true
    });

    // הסתר אחרי 3 שניות
    setTimeout(() => {
      setEncouragementState(prev => ({
        ...prev,
        showEncouragement: false
      }));
    }, ENCOURAGEMENT_DURATION);
  }, []);

  const hideEncouragement = useCallback(() => {
    setEncouragementState(prev => ({
      ...prev,
      showEncouragement: false
    }));
  }, []);

  // ========================================================================================
  // HELPER FUNCTIONS (using utility functions for cleaner code)
  // ========================================================================================
  
  const getStepMessage = useCallback((stepIndex: number) => 
    createGetStepMessage(practiceState)(stepIndex), 
    [practiceState]
  );

  const getCompletionMessage = useCallback((letterName: string) => 
    createGetCompletionMessage(currentLetter, practiceState)(letterName), 
    [currentLetter, practiceState]
  );

  // ========================================================================================
  // PROGRESS TRACKING FUNCTIONS
  // ========================================================================================
  const markLetterCompleted = useCallback((letterName: string) => {
    setCompletedLetters(prev => new Set([...prev, letterName]));
  }, []);

  // Practice logic functions
  const initializeLetter = useCallback((letterData: HebrewLetter) => {
    // Only set current letter if it's different or not set
    if (!currentLetter || currentLetter.name !== letterData.name) {
      setCurrentLetter(letterData);
    }
  }, [currentLetter, setCurrentLetter]);

  const isStepCompleted = useCallback((stepIndex: number) => {
    return practiceState.completedSteps.has(stepIndex);
  }, [practiceState.completedSteps]);

  const getCurrentStepInfo = useCallback(() => {
    const currentStep = practiceState.currentStep;
    return {
      stepIndex: currentStep,
      stepName: PRACTICE_STEPS[currentStep],
      isCompleted: isStepCompleted(currentStep),
      isFirst: currentStep === 0,
      isLast: currentStep === PRACTICE_STEPS.length - 1
    };
  }, [practiceState.currentStep, isStepCompleted]);

  const completeCurrentStep = useCallback(() => {
    const currentStep = practiceState.currentStep;
    markStepCompleted(currentStep);
    
    if (currentStep < PRACTICE_STEPS.length - 1) {
      nextStep();
    } else {
      // Mark entire letter as completed
      if (currentLetter) {
        markLetterCompleted(currentLetter.name);
      }
    }
  }, [practiceState.currentStep, markStepCompleted, nextStep, currentLetter, markLetterCompleted]);

  const getCurrentInstructions = useCallback(() => 
    createGetCurrentInstructions(currentLetter, practiceState)(), 
    [currentLetter, practiceState]
  );

  const getOverallProgress = useCallback(() => 
    createGetOverallProgress(practiceState)(), 
    [practiceState]
  );

  // ========================================================================================
  // UI HELPER FUNCTIONS
  // ========================================================================================
  
  const getStepTabStyle = useCallback((stepIndex: number) => 
    createGetStepTabStyle(practiceState)(stepIndex), 
    [practiceState]
  );

  const getStepTabIcon = useCallback((stepIndex: number) => 
    createGetStepTabIcon(practiceState)(stepIndex), 
    [practiceState]
  );

  // ========================================================================================
  // ADVANCED FUNCTIONS
  // ========================================================================================

  // Letter progress tracking was moved above

  const getLetterProgress = useCallback((letterName: string) => {
    if (completedLetters.has(letterName)) return 100;
    if (currentLetter?.name === letterName) {
      return Math.round((practiceState.completedSteps.size / PRACTICE_STEPS.length) * 100);
    }
    return 0;
  }, [completedLetters, currentLetter, practiceState.completedSteps]);

  // Reset states when letter changes
  const handleSetCurrentLetter = useCallback((letter: HebrewLetter | null) => {
    // Only reset if it's a different letter
    if (!currentLetter || currentLetter.name !== letter?.name) {
      setCurrentLetter(letter);
      // Reset practice state for new letter
      setPracticeState(DEFAULT_PRACTICE_STATE);
      // Clear drawing canvas
      clearCanvas();
    }
  }, [clearCanvas, currentLetter]);

  const contextValue: HebrewLettersContextType = {
    // Current letter
    currentLetter,
    setCurrentLetter: handleSetCurrentLetter,

    // Drawing state
    drawingState,
    updateDrawingState,
    clearCanvas,

    // Practice state
    practiceState,
    updatePracticeState,
    nextStep,
    previousStep,
    markStepCompleted,
    goToStep,

    // Practice logic
    initializeLetter,
    completeCurrentStep,
    isStepCompleted,
    getCurrentStepInfo,
    getCurrentInstructions,
    getOverallProgress,

    // Encouragement state
    encouragementState,
    showStepEncouragement,
    hideEncouragement,

    // Canvas operations
    saveCanvasState,
    undoLastAction,
    initializeCanvas,
    startDrawing,
    continueDrawing,
    stopDrawing,
    downloadCanvas,
    getCanvasPosition,
    resetCanvas,

    // Audio and speech
    playLetterSound,
    playEncouragementSound,
    playStepCompletionSound,
    toggleAudio,
    isAudioEnabled,

    // Settings and constants
    strokeColors: STROKE_COLORS,
    strokeWidths: STROKE_WIDTHS,
    practiceSteps: PRACTICE_STEPS,
    encouragementMessages: ENCOURAGEMENT_MESSAGES,
    stepMessages: STEP_MESSAGES,

    // Helper functions
    getStepMessage,
    getCompletionMessage,
    getStepTabStyle,
    getStepTabIcon,

    // Progress tracking
    completedLetters,
    markLetterCompleted,
    getLetterProgress,

    // Analytics and statistics
    learningStats,
    startPracticeSession,
    endPracticeSession,
    logPracticeActivity,
    getTotalPracticeTime,
    getLetterStats,
    exportLearningData,
    resetAllStats,
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
 * 
 * @example
 * ```tsx
 * const { currentLetter, setCurrentLetter } = useHebrewLetters();
 * ```
 */
export const useHebrewLetters = (): HebrewLettersContextType => {
  const context = useContext(HebrewLettersContext);
  if (context === undefined) {
    throw new Error('useHebrewLetters must be used within a HebrewLettersProvider');
  }
  return context;
};

export default HebrewLettersContext;
