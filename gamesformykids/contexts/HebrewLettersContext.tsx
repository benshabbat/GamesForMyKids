'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { HebrewLetter } from '@/lib/constants/gameData/hebrewLetters';

// Types for the context
interface DrawingState {
  isDrawing: boolean;
  paths: ImageData[];
  currentStrokeWidth: number;
  currentStrokeColor: string;
  showLetterGuide: boolean;
}

interface PracticeState {
  currentStep: number;
  completedSteps: Set<number>;
  practiceMode: 'tracing' | 'freewriting' | 'guided';
}

interface HebrewLettersContextType {
  // Current letter data
  currentLetter: HebrewLetter | null;
  setCurrentLetter: (letter: HebrewLetter | null) => void;

  // Drawing state
  drawingState: DrawingState;
  updateDrawingState: (updates: Partial<DrawingState>) => void;
  clearCanvas: () => void;
  
  // Practice state
  practiceState: PracticeState;
  updatePracticeState: (updates: Partial<PracticeState>) => void;
  nextStep: () => void;
  previousStep: () => void;
  markStepCompleted: (step: number) => void;
  
  // Canvas operations
  saveCanvasState: (imageData: ImageData) => void;
  undoLastAction: () => void;
  
  // Settings
  strokeColors: string[];
  strokeWidths: number[];
  practiceSteps: string[];
  
  // Achievements and progress
  completedLetters: Set<string>;
  markLetterCompleted: (letterName: string) => void;
  getLetterProgress: (letterName: string) => number;
}

const HebrewLettersContext = createContext<HebrewLettersContextType | undefined>(undefined);

// Default values
const defaultDrawingState: DrawingState = {
  isDrawing: false,
  paths: [],
  currentStrokeWidth: 12,
  currentStrokeColor: '#2E7D32',
  showLetterGuide: true,
};

const defaultPracticeState: PracticeState = {
  currentStep: 0,
  completedSteps: new Set(),
  practiceMode: 'guided',
};

const strokeColors = [
  '#2E7D32', // ירוק
  '#1976D2', // כחול
  '#D32F2F', // אדום
  '#7B1FA2', // סגול
  '#F57C00', // כתום
  '#795548', // חום
  '#424242', // אפור
  '#000000'  // שחור
];

const strokeWidths = [4, 8, 12, 16, 20];

const practiceSteps = [
  'הכרות עם האות',
  'תרגול עקיבה',
  'כתיבה חופשית'
];

interface HebrewLettersProviderProps {
  children: ReactNode;
}

export const HebrewLettersProvider: React.FC<HebrewLettersProviderProps> = ({ children }) => {
  const [currentLetter, setCurrentLetter] = useState<HebrewLetter | null>(null);
  const [drawingState, setDrawingState] = useState<DrawingState>(defaultDrawingState);
  const [practiceState, setPracticeState] = useState<PracticeState>(defaultPracticeState);
  const [completedLetters, setCompletedLetters] = useState<Set<string>>(new Set());

  // Drawing state updates
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

  // Practice state updates
  const updatePracticeState = useCallback((updates: Partial<PracticeState>) => {
    setPracticeState(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setPracticeState(prev => ({
      ...prev,
      currentStep: Math.min(practiceSteps.length - 1, prev.currentStep + 1)
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

  // Letter progress tracking
  const markLetterCompleted = useCallback((letterName: string) => {
    setCompletedLetters(prev => new Set([...prev, letterName]));
  }, []);

  const getLetterProgress = useCallback((letterName: string) => {
    if (completedLetters.has(letterName)) return 100;
    if (currentLetter?.name === letterName) {
      return Math.round((practiceState.completedSteps.size / practiceSteps.length) * 100);
    }
    return 0;
  }, [completedLetters, currentLetter, practiceState.completedSteps]);

  // Reset states when letter changes
  const handleSetCurrentLetter = useCallback((letter: HebrewLetter | null) => {
    // Only reset if it's a different letter
    if (!currentLetter || currentLetter.name !== letter?.name) {
      setCurrentLetter(letter);
      // Reset practice state for new letter
      setPracticeState(defaultPracticeState);
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

    // Canvas operations
    saveCanvasState,
    undoLastAction,

    // Settings
    strokeColors,
    strokeWidths,
    practiceSteps,

    // Progress tracking
    completedLetters,
    markLetterCompleted,
    getLetterProgress,
  };

  return (
    <HebrewLettersContext.Provider value={contextValue}>
      {children}
    </HebrewLettersContext.Provider>
  );
};

// Custom hook to use the context
export const useHebrewLetters = (): HebrewLettersContextType => {
  const context = useContext(HebrewLettersContext);
  if (context === undefined) {
    throw new Error('useHebrewLetters must be used within a HebrewLettersProvider');
  }
  return context;
};

export default HebrewLettersContext;
