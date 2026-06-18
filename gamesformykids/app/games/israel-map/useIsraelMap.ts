'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useMapStore } from './mapStore';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

export function useIsraelMap() {
  const {
    phase, current, foundIds, score, total, lastResult,
    startGame, checkTap, nextLocation, resetGame,
  } = useMapStore();

  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (current && phase === 'playing') {
      speakHebrew(`לחץ על ${current.name}`);
    }
  }, [current, phase]);

  const handleTap = useCallback((svgX: number, svgY: number) => {
    if (!current || lastResult !== null) return;
    const hit = checkTap(svgX, svgY);

    if (hit) {
      useMapStore.setState((s) => ({
        score: s.score + 1,
        total: s.total + 1,
        foundIds: [...s.foundIds, current.id],
        lastResult: 'correct',
      }));
      setFeedback('correct');
      speakHebrew(`נכון! ${current.fact}`);
      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
        nextLocation();
      }, 2500);
    } else {
      useMapStore.setState((s) => ({ total: s.total + 1, lastResult: 'wrong' }));
      setFeedback('wrong');
      speakHebrew(`נסה שוב — לחץ על ${current.name}`);
      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
        useMapStore.setState({ lastResult: null });
      }, 1200);
    }
  }, [current, lastResult, checkTap, nextLocation]);

  useEffect(() => () => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  }, []);

  return { phase, current, foundIds, score, total, lastResult, feedback, startGame, handleTap, resetGame };
}
