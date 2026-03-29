'use client';

import { useState, useEffect } from 'react';
import { useHebrewLetters } from '@/contexts';

interface UseLetterEncouragementParams {
  isCompleted: boolean;
}

export function useLetterEncouragement({ isCompleted }: UseLetterEncouragementParams) {
  const [showCompletion, setShowCompletion] = useState(false);
  const { encouragementState, getStepMessage, showStepEncouragement, playEncouragementSound } =
    useHebrewLetters();

  useEffect(() => {
    if (isCompleted) {
      setShowCompletion(true);
      showStepEncouragement();
      playEncouragementSound();

      const timer = setTimeout(() => setShowCompletion(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, showStepEncouragement, playEncouragementSound]);

  return { showCompletion, encouragementState, getStepMessage };
}
