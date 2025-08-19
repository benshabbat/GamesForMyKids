/**
 * ===============================================
 * Practice Operations - פעולות תרגול
 * ===============================================
 * 
 * מכיל את כל הפעולות הקשורות לתרגול ומעקב אחר התקדמות
 */

import { useCallback } from 'react';
import { HebrewLetter } from '../../constants/hebrewLetters';
import { PracticeState, EncouragementState, LearningStats } from '../../types/hebrew-letters';
import { 
  PRACTICE_STEPS,
  DEFAULT_PRACTICE_STATE,
  DEFAULT_ENCOURAGEMENT_STATE,
  ENCOURAGEMENT_DURATION
} from '../../constants/hebrewLettersConstants';

export const usePracticeOperations = (
  currentLetter: HebrewLetter | null,
  setCurrentLetter: React.Dispatch<React.SetStateAction<HebrewLetter | null>>,
  practiceState: PracticeState,
  setPracticeState: React.Dispatch<React.SetStateAction<PracticeState>>,
  encouragementState: EncouragementState,
  setEncouragementState: React.Dispatch<React.SetStateAction<EncouragementState>>,
  completedLetters: Set<string>,
  setCompletedLetters: React.Dispatch<React.SetStateAction<Set<string>>>,
  learningStats: LearningStats,
  setLearningStats: React.Dispatch<React.SetStateAction<LearningStats>>
) => {

  // ========================================================================================
  // LETTER SELECTION AND MANAGEMENT
  // ========================================================================================

  const selectLetter = useCallback((letter: HebrewLetter) => {
    setCurrentLetter(letter);
    setPracticeState(DEFAULT_PRACTICE_STATE);
    setEncouragementState(DEFAULT_ENCOURAGEMENT_STATE);
    
    // עדכון סטטיסטיקות - התחלת תרגול
    setLearningStats(prev => ({
      ...prev,
      lettersStarted: new Set([...prev.lettersStarted, letter.letter]),
      sessionStartTime: Date.now()
    }));
  }, [setCurrentLetter, setPracticeState, setEncouragementState, setLearningStats]);

  const resetCurrentLetter = useCallback(() => {
    setCurrentLetter(null);
    setPracticeState(DEFAULT_PRACTICE_STATE);
    setEncouragementState(DEFAULT_ENCOURAGEMENT_STATE);
  }, [setCurrentLetter, setPracticeState, setEncouragementState]);

  // ========================================================================================
  // PRACTICE STEP MANAGEMENT
  // ========================================================================================

  const updatePracticeState = useCallback((updates: Partial<PracticeState>) => {
    setPracticeState(prev => ({ ...prev, ...updates }));
  }, [setPracticeState]);

  const nextStep = useCallback(() => {
    setPracticeState(prev => {
      const currentStepIndex = prev.currentStep;
      const nextStepIndex = Math.min(currentStepIndex + 1, PRACTICE_STEPS.length - 1);
      return {
        ...prev,
        currentStep: nextStepIndex,
        completedSteps: new Set([...prev.completedSteps, prev.currentStep])
      };
    });
  }, [setPracticeState]);

  const previousStep = useCallback(() => {
    setPracticeState(prev => {
      const currentStepIndex = prev.currentStep;
      const prevStepIndex = Math.max(currentStepIndex - 1, 0);
      return {
        ...prev,
        currentStep: prevStepIndex
      };
    });
  }, [setPracticeState]);

  const jumpToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < PRACTICE_STEPS.length) {
      setPracticeState(prev => ({
        ...prev,
        currentStep: stepIndex
      }));
    }
  }, [setPracticeState]);

  const showEncouragement = useCallback((message?: string, duration = ENCOURAGEMENT_DURATION) => {
    setEncouragementState({
      showEncouragement: true,
      currentMessage: message || '',
      isStepCompleted: false
    });

    setTimeout(() => {
      setEncouragementState(prev => ({
        ...prev,
        showEncouragement: false
      }));
    }, duration);
  }, [setEncouragementState]);

  const completeCurrentStep = useCallback(() => {
    setPracticeState(prev => {
      const isStepAlreadyCompleted = prev.completedSteps.has(prev.currentStep);
      if (isStepAlreadyCompleted) return prev;

      return {
        ...prev,
        completedSteps: new Set([...prev.completedSteps, prev.currentStep])
      };
    });
    
    // הצגת עידוד
    showEncouragement();
  }, [setPracticeState, showEncouragement]);

  const hideEncouragement = useCallback(() => {
    setEncouragementState(prev => ({
      ...prev,
      showEncouragement: false
    }));
  }, [setEncouragementState]);

  const resetPracticeProgress = useCallback(() => {
    setPracticeState(DEFAULT_PRACTICE_STATE);
  }, [setPracticeState]);

  const updateEncouragementState = useCallback((updates: Partial<EncouragementState>) => {
    setEncouragementState(prev => ({ ...prev, ...updates }));
  }, [setEncouragementState]);

  // ========================================================================================
  // COMPLETION AND PROGRESS TRACKING
  // ========================================================================================

  const completeLetter = useCallback(() => {
    if (!currentLetter) return;

    const letterName = currentLetter.letter;
    
    // עדכון רשימת אותיות שהושלמו
    setCompletedLetters(prev => new Set([...prev, letterName]));
    
    // עדכון סטטיסטיקות
    setLearningStats(prev => {
      const sessionTime = prev.sessionStartTime ? Date.now() - prev.sessionStartTime : 0;
      
      return {
        ...prev,
        lettersCompleted: new Set([...prev.lettersCompleted, letterName]),
        totalPracticeTime: prev.totalPracticeTime + sessionTime,
        practiceHistory: [
          ...prev.practiceHistory,
          {
            letter: letterName,
            stepCompleted: practiceState.completedSteps.size,
            timeSpent: sessionTime,
            timestamp: Date.now()
          }
        ],
        sessionStartTime: 0
      };
    });

    // עדכון מצב התרגול
    setPracticeState(prev => ({
      ...prev,
      isCompleted: true
    }));

    // הצגת הודעת סיום
    showEncouragement('כל הכבוד! סיימת את התרגול בהצלחה!', 3000);
  }, [currentLetter, setCompletedLetters, setLearningStats, practiceState.completedSteps.size, setPracticeState, showEncouragement]);

  const isLetterCompleted = useCallback((letterName: string) => {
    return completedLetters.has(letterName);
  }, [completedLetters]);

  const getCompletionPercentage = useCallback(() => {
    if (!currentLetter) return 0;
    
    const totalSteps = PRACTICE_STEPS.length;
    const completedStepsCount = practiceState.completedSteps.size;
    
    return Math.round((completedStepsCount / totalSteps) * 100);
  }, [currentLetter, practiceState.completedSteps.size]);

  // ========================================================================================
  // STATISTICS AND ANALYTICS
  // ========================================================================================

  const startPracticeSession = useCallback((letterName: string) => {
    setLearningStats(prev => ({
      ...prev,
      lettersStarted: new Set([...prev.lettersStarted, letterName]),
      sessionStartTime: Date.now()
    }));
  }, [setLearningStats]);

  const endPracticeSession = useCallback(() => {
    setLearningStats(prev => ({
      ...prev,
      sessionStartTime: 0
    }));
  }, [setLearningStats]);

  const getSessionDuration = useCallback(() => {
    if (!learningStats.sessionStartTime) return 0;
    return Date.now() - learningStats.sessionStartTime;
  }, [learningStats.sessionStartTime]);

  const getTotalLettersStarted = useCallback(() => {
    return learningStats.lettersStarted.size;
  }, [learningStats.lettersStarted.size]);

  const getTotalLettersCompleted = useCallback(() => {
    return learningStats.lettersCompleted.size;
  }, [learningStats.lettersCompleted.size]);

  return {
    // Letter management
    selectLetter,
    resetCurrentLetter,
    
    // Practice step management
    updatePracticeState,
    nextStep,
    previousStep,
    jumpToStep,
    completeCurrentStep,
    resetPracticeProgress,
    
    // Encouragement system
    updateEncouragementState,
    showEncouragement,
    hideEncouragement,
    
    // Completion and progress
    completeLetter,
    isLetterCompleted,
    getCompletionPercentage,
    
    // Statistics and analytics
    startPracticeSession,
    endPracticeSession,
    getSessionDuration,
    getTotalLettersStarted,
    getTotalLettersCompleted
  };
};
