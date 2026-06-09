'use client';

import { useEffect, useRef } from "react";
import { useMemoryStore } from "./stores/useMemoryStore";
import { MEMORY_GAME_CONSTANTS } from "@/lib/constants";
import { playMemorySuccessSound } from "@/lib/utils/game/gameUtils";
import { useGameCompletion } from "@/hooks/shared/progress/useGameCompletion";
import { useAuth } from "@/hooks/shared/auth/useAuth";

export interface UseMemoryGameContentReturn {
  phase: import('./stores/memoryStoreTypes').MemoryPhase;
}

/**
 * לוגיקת עדכון ניקוד, רמה וזמן משחק בסיום.
 * מכיל גם את ה-side-effects של הטיימר.
 * מחזיר רק את הערכים שה-UI צריך לצרוך.
 */
export function useMemoryGameContent(): UseMemoryGameContentReturn {
  const {
    phase,
    gameStats,
    timer,
    difficulty,
    isGamePaused,
    timeLeft,
    flippedCards,
    lastMatchWasSuccess,
    incrementTimer,
    decrementTimeLeft,
    setPhase,
    resolveMatch,
  } = useMemoryStore();

  const audioContextRef = useRef<AudioContext | null>(null);

  // Create AudioContext once on first user interaction (browser policy requires this)
  useEffect(() => {
    if (audioContextRef.current || typeof window === 'undefined') return;
    try {
      const AC = window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AC) audioContextRef.current = new AC();
    } catch {
      // AudioContext unavailable — sounds will be silent
    }
  }, []);

  // Cancel speech on new game so old utterances don't play into the new game
  useEffect(() => {
    if (phase === 'playing' && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [phase]);

  // Resolve card match after flip animation delay
  useEffect(() => {
    if (flippedCards.length !== 2) return;
    const [first, second] = flippedCards;
    const id = setTimeout(
      () => resolveMatch(first!, second!),
      MEMORY_GAME_CONSTANTS.FLIP_DURATION * 0.6,
    );
    return () => clearTimeout(id);
  // flippedCards reference changes on every flip; we only want to re-run when length reaches 2
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flippedCards.length, resolveMatch]);

  // Play success sound when a match is confirmed — audio stays out of the store
  useEffect(() => {
    if (!lastMatchWasSuccess) return;
    playMemorySuccessSound(audioContextRef.current);
  }, [lastMatchWasSuccess]);

  // ── Timer ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing' || isGamePaused) return;
    const id = setInterval(() => {
      incrementTimer();
      decrementTimeLeft();
    }, 1000);
    return () => clearInterval(id);
  }, [phase, isGamePaused, incrementTimer, decrementTimeLeft]);

  // ── Time-up check ────────────────────────────────────────────────────────
  useEffect(() => {
    if (timeLeft <= 0 && phase === 'playing') {
      setPhase('timeout');
    }
  }, [timeLeft, phase, setPhase]);

  const { user } = useAuth();
  const { saveGameResultRef } = useGameCompletion("memory");

  useEffect(() => {
    if (phase !== 'won' || !user || gameStats.score <= 0) return;

    const levelMap: Record<string, number> = { EASY: 1, MEDIUM: 2, HARD: 3 };
    const currentLevel = levelMap[difficulty] ?? 1;

    saveGameResultRef.current({
      score: gameStats.score,
      level: currentLevel,
      durationSeconds: timer,
    });
  }, [
    phase,
    user,
    gameStats.score,
    timer,
    difficulty,
    saveGameResultRef,
  ]);

  return { phase };
}
