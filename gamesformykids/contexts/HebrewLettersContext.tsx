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

interface EncouragementState {
  showEncouragement: boolean;
  currentMessage: string;
  isStepCompleted: boolean;
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
  goToStep: (step: number) => void;
  
  // Practice logic
  initializeLetter: (letterData: HebrewLetter) => void;
  completeCurrentStep: () => void;
  isStepCompleted: (stepIndex: number) => boolean;
  getCurrentStepInfo: () => {
    stepIndex: number;
    stepName: string;
    isCompleted: boolean;
    isFirst: boolean;
    isLast: boolean;
  };
  getCurrentInstructions: () => string[];
  getOverallProgress: () => number;
  
  // Encouragement state
  encouragementState: EncouragementState;
  showStepEncouragement: () => void;
  hideEncouragement: () => void;
  
  // Canvas operations
  saveCanvasState: (imageData: ImageData) => void;
  undoLastAction: () => void;
  
  // Settings and constants
  strokeColors: string[];
  strokeWidths: number[];
  practiceSteps: string[];
  encouragementMessages: string[];
  stepMessages: Record<number, string>;
  
  // Helper functions
  getStepMessage: (stepIndex: number) => string;
  getCompletionMessage: (letterName: string) => string;
  getStepTabStyle: (stepIndex: number) => string;
  getStepTabIcon: (stepIndex: number) => string;
  
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

const defaultEncouragementState: EncouragementState = {
  showEncouragement: false,
  currentMessage: '',
  isStepCompleted: false,
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
  'תרגול עקיבה וכתיבה מודרכת',
  'כתיבה חופשית ויצירתית'
];

const encouragementMessages = [
  "כל הכבוד! 🌟",
  "מעולה! 👏", 
  "איזה יופי! 🎉",
  "פנטסטי! ✨",
  "מדהים! 🚀",
  "יש לך זה! 💪",
  "מושלם! 🎯",
  "ברבו! 👑"
];

const stepMessages = {
  0: "התבוננו באות יפה! 👀",
  1: "עכשיו בואו נעקוב עליה! ✏️", 
  2: "זמן לכתוב בעצמנו! 🎨"
};

interface HebrewLettersProviderProps {
  children: ReactNode;
}

export const HebrewLettersProvider: React.FC<HebrewLettersProviderProps> = ({ children }) => {
  const [currentLetter, setCurrentLetter] = useState<HebrewLetter | null>(null);
  const [drawingState, setDrawingState] = useState<DrawingState>(defaultDrawingState);
  const [practiceState, setPracticeState] = useState<PracticeState>(defaultPracticeState);
  const [encouragementState, setEncouragementState] = useState<EncouragementState>(defaultEncouragementState);
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

  const goToStep = useCallback((step: number) => {
    setPracticeState(prev => ({
      ...prev,
      currentStep: step
    }));
  }, []);

  // Encouragement functions
  const showStepEncouragement = useCallback(() => {
    const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
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
    }, 3000);
  }, []);

  const hideEncouragement = useCallback(() => {
    setEncouragementState(prev => ({
      ...prev,
      showEncouragement: false
    }));
  }, []);

  // Helper functions
  const getStepMessage = useCallback((stepIndex: number) => {
    const baseMessage = stepMessages[stepIndex as keyof typeof stepMessages] || "כל הכבוד!";
    const isStepCompleted = practiceState.completedSteps.has(stepIndex);
    
    if (isStepCompleted) {
      return `✅ ${baseMessage} השלב הושלם!`;
    }
    
    // הודעה מותאמת לפי מצב התרגול
    if (practiceState.practiceMode === 'tracing') {
      return `${baseMessage} עקוב אחר הקווים בעדינות`;
    } else if (practiceState.practiceMode === 'freewriting') {
      return `${baseMessage} כתוב את האות בחופשיות`;
    }
    
    return baseMessage;
  }, [practiceState.completedSteps, practiceState.practiceMode]);

  const getCompletionMessage = useCallback((letterName: string) => {
    const letterDisplayName = currentLetter?.letter || letterName;
    const stepsCompleted = practiceState.completedSteps.size;
    const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
    
    return stepsCompleted > 1 ? 
      `${randomMessage} סיימת ${stepsCompleted} שלבים של האות ${letterDisplayName}!` :
      `${randomMessage} סיימת את השלב של האות ${letterDisplayName}!`;
  }, [currentLetter, practiceState.completedSteps]);

  // Letter progress tracking
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
      stepName: practiceSteps[currentStep],
      isCompleted: isStepCompleted(currentStep),
      isFirst: currentStep === 0,
      isLast: currentStep === practiceSteps.length - 1
    };
  }, [practiceState.currentStep, isStepCompleted]);

  const completeCurrentStep = useCallback(() => {
    const currentStep = practiceState.currentStep;
    markStepCompleted(currentStep);
    
    if (currentStep < practiceSteps.length - 1) {
      nextStep();
    } else {
      // Mark entire letter as completed
      if (currentLetter) {
        markLetterCompleted(currentLetter.name);
      }
    }
  }, [practiceState.currentStep, markStepCompleted, nextStep, currentLetter, markLetterCompleted]);

  const getCurrentInstructions = useCallback(() => {
    if (!currentLetter) return ['בחר אות לתרגול'];
    
    const stepIndex = practiceState.currentStep;
    switch (stepIndex) {
      case 0:
        return [
          `התבונני באות ${currentLetter.letter} הגדולה למעלה`,
          `האות ${currentLetter.letter} נקראת "${currentLetter.pronunciation}"`,
          `למד על צורת האות ואיך היא נכתבת`
        ];
      case 1:
        return [
          `עקבי באצבע על האותיות המנוקדות`,
          `התחילי מהנקודה העליונה של האות`,
          `עקבי לאט ובזהירות על הקווים`,
          `או תרגלי כתיבה על הקנבס עם המדריך`
        ];
      case 2:
        return [
          `עכשיו תרגלי לכתוב את האות ${currentLetter.letter} בעצמך בחופשיות`,
          `בלי מדריך - תהיי יצירתית!`,
          `השתמשי בעכבר או במגע על המסך`,
          `זכרי לכתוב מימין לשמאל`,
          `נסי צבעים וגדלים שונים`
        ];
      default:
        return [`תרגלי את האות ${currentLetter.letter}`];
    }
  }, [currentLetter, practiceState.currentStep]);

  const getOverallProgress = useCallback(() => {
    return Math.round((practiceState.completedSteps.size / practiceSteps.length) * 100);
  }, [practiceState.completedSteps.size]);

  // UI Helper functions
  const getStepTabStyle = useCallback((stepIndex: number) => {
    const isCurrentStep = stepIndex === practiceState.currentStep;
    const isCompleted = practiceState.completedSteps.has(stepIndex);
    
    if (isCurrentStep) {
      return 'bg-green-500 text-white shadow-lg';
    } else if (isCompleted) {
      return 'bg-green-200 text-green-800 hover:bg-green-300';
    } else {
      return 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300';
    }
  }, [practiceState.currentStep, practiceState.completedSteps]);

  const getStepTabIcon = useCallback((stepIndex: number) => {
    return practiceState.completedSteps.has(stepIndex) ? '✓' : '';
  }, [practiceState.completedSteps]);

  // Letter progress tracking was moved above

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

    // Settings and constants
    strokeColors,
    strokeWidths,
    practiceSteps,
    encouragementMessages,
    stepMessages,

    // Helper functions
    getStepMessage,
    getCompletionMessage,
    getStepTabStyle,
    getStepTabIcon,

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
