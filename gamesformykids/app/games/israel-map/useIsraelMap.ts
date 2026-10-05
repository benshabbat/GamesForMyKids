'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useMapStore } from './mapStore';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

export function useIsraelMap() {
  const {
    phase, current, foundIds, score, total, lastResult,
    startGame, checkTap, markFound, markMissed, nextLocation, resetGame,
  } = useMapStore();

  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (current && phase === 'playing') {
      speakHebrew(`לְחַץ עַל ${current.name}`);
    }
  }, [current, phase]);

  const handleTap = useCallback((svgX: number, svgY: number) => {
    if (!current || lastResult !== null) return;
    const hit = checkTap(svgX, svgY);

    if (hit) {
      markFound();
      setFeedback('correct');
      speakHebrew(`נָכוֹן! ${current.fact}`);
      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
        nextLocation();
      }, 2500);
    } else {
      markMissed();
      setFeedback('wrong');
      speakHebrew(`נַסֵּה שׁוּב — לְחַץ עַל ${current.name}`);
      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
        useMapStore.setState({ lastResult: null });
      }, 1200);
    }
  }, [current, lastResult, checkTap, markFound, markMissed, nextLocation]);

  useEffect(() => () => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  }, []);

  // Leaving mid-feedback must cancel the pending nextLocation(): after a reset the queue is
  // empty, so it would jump from the menu straight to the result screen.
  const handleReset = useCallback(() => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedback(null);
    resetGame();
  }, [resetGame]);

  return { phase, current, foundIds, score, total, lastResult, feedback, startGame, handleTap, resetGame: handleReset };
}
