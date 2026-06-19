'use client';
import { useEffect } from 'react';
import { useTypingRaceStore } from './typingRaceStore';
import { speakHebrew } from '@/lib/utils/speech/speaker';

export function useTypingRaceGame() {
  const phase         = useTypingRaceStore(s => s.phase);
  const words         = useTypingRaceStore(s => s.words);
  const currentIndex  = useTypingRaceStore(s => s.currentIndex);
  const typedCount    = useTypingRaceStore(s => s.typedCount);
  const errorCount    = useTypingRaceStore(s => s.errorCount);
  const wordTimes     = useTypingRaceStore(s => s.wordTimes);
  const hasError      = useTypingRaceStore(s => s.hasError);
  const level         = useTypingRaceStore(s => s.level);
  const { startGame, typeKey, clearError, restart, goToMenu } = useTypingRaceStore();

  const currentWord = words[currentIndex] ?? '';

  useEffect(() => {
    if (phase === 'playing' && currentWord) {
      speakHebrew(currentWord);
    }
  }, [phase, currentWord, currentIndex]);

  useEffect(() => {
    if (!hasError) return;
    const t = setTimeout(clearError, 350);
    return () => clearTimeout(t);
  }, [hasError, clearError]);

  const avgTimeMs = wordTimes.length > 0
    ? wordTimes.reduce((a, b) => a + b, 0) / wordTimes.length
    : 0;

  const medal: 'gold' | 'silver' | 'bronze' = avgTimeMs < 4000 ? 'gold' : avgTimeMs < 8000 ? 'silver' : 'bronze';

  return {
    phase, words, currentIndex, currentWord, typedCount,
    errorCount, wordTimes, hasError, level, avgTimeMs, medal,
    startGame, typeKey, restart, goToMenu,
  };
}
