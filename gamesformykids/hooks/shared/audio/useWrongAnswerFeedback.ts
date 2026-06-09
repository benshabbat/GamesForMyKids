'use client';

import { useState, useEffect } from 'react';
import { useHaptic } from '@/hooks/shared/haptic/useHaptic';
import { speakHebrew } from '@/lib/utils/speech/speaker';

const WRONG_PHRASES = ['כמעט!', 'נסה שוב!', 'לא נורא, תנסה שוב!'] as const;

export function useWrongAnswerFeedback(
  selected: string | null,
  correctValue: string,
) {
  const [shakingChoice, setShakingChoice] = useState<string | null>(null);
  const { wrong: hapticWrong } = useHaptic();

  useEffect(() => {
    if (selected !== null && selected !== correctValue) {
      hapticWrong();
      const phrase = WRONG_PHRASES[Math.floor(Math.random() * WRONG_PHRASES.length)]!;
      void speakHebrew(phrase);
      setShakingChoice(selected);
      const id = setTimeout(() => setShakingChoice(null), 600);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return { shakingChoice };
}
