'use client';

import { useState, useEffect } from 'react';
import { useHebrewLettersStore, getStepMessage } from '@/lib/stores/hebrewLettersStore';

interface UseLetterEncouragementParams {
  isCompleted: boolean;
}

export function useLetterEncouragement({ isCompleted }: UseLetterEncouragementParams) {
  const [showCompletion, setShowCompletion] = useState(false);
  const encouragementState = useHebrewLettersStore((s) => s.encouragementState);
  const practiceState = useHebrewLettersStore((s) => s.practiceState);
  const { showEncouragement, playEncouragementSound } = useHebrewLettersStore();

  useEffect(() => {
    if (isCompleted) {
      setShowCompletion(true);
      showEncouragement();
      playEncouragementSound();

      const timer = setTimeout(() => setShowCompletion(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, showEncouragement, playEncouragementSound]);

  return {
    showCompletion,
    encouragementState,
    getStepMessage: (stepIndex: number) => getStepMessage(practiceState, stepIndex),
  };
}
