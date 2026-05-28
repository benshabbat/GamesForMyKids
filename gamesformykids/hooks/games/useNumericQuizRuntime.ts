'use client';

import { useState, useCallback, useEffect, useRef } from "react";
import { BaseGameItem } from "@/lib/types/core/base";
import type { GameType } from "@/lib/types";
import { speakHebrew } from "@/lib/utils/speech/enhancedSpeechUtils";
import { useGameAudio } from "@/hooks/shared/audio/useGameAudio";
import {
  delay,
  playSuccessSound as playSound,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage,
} from "@/lib/utils/game/gameUtils";
import { GAME_CONSTANTS } from "@/lib/constants";
import { useGameProgressStore } from "@/lib/stores/gameProgressStore";
import { useGameSessionStore } from "@/lib/stores/gameSessionStore";
import { useGameCompletion } from "@/hooks/shared/progress/useGameCompletion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NumericQuizState<TChallenge> {
  currentChallenge: TChallenge | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: number[];
}

export interface NumericQuizCallbacks<TChallenge extends { answer: number }> {
  /** The GameType identifier used to persist the score to Supabase on unmount. */
  gameType: GameType;
  /** Generate a new challenge. Receives current level for difficulty scaling. */
  generateChallenge: (level: number) => TChallenge;
  /** Generate numeric answer options. Receives the correct answer and current level. */
  generateOptions: (correctAnswer: number, level: number) => number[];
  /** Speak the current challenge aloud. Should guard on speechEnabled internally. */
  speakQuestion: (challenge: TChallenge) => Promise<void>;
  /** Map a challenge to the universal BaseGameItem format for the session store. */
  toChallengeItem: (challenge: TChallenge) => BaseGameItem;
  /** Map a numeric option to the universal BaseGameItem format. */
  toOptionItem: (n: number) => BaseGameItem;
  /** Called each time a new challenge is applied (e.g. to update a per-game store). */
  onChallengeChange?: (challenge: TChallenge) => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Shared runtime hook for numeric quiz games (math, counting).
 *
 * Owns the common async flow:
 *   startGame → answer handling → celebration → next challenge → session/progress bridge
 *
 * Game-specific logic (challenge generation, speech text, option pool) is
 * injected via `callbacks` so each game remains independently testable.
 */
export function useNumericQuizRuntime<TChallenge extends { answer: number }>(
  callbacks: NumericQuizCallbacks<TChallenge>,
) {
  const {
    gameType,
    generateChallenge,
    generateOptions,
    speakQuestion,
    toChallengeItem,
    toOptionItem,
    onChallengeChange,
  } = callbacks;

  const [gameState, setGameState] = useState<NumericQuizState<TChallenge>>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
  });

  const { audioContext, speechEnabled } = useGameAudio();
  const { saveGameResultRef } = useGameCompletion(gameType);
  const startTimeRef = useRef(0);

  // Save score to Supabase on unmount (user navigates away from the game).
  useEffect(() => {
    // Capture ref value at effect setup time so the cleanup closure doesn't
    // read a potentially-changed ref (satisfies react-hooks/exhaustive-deps).
    const save = saveGameResultRef.current;
    return () => {
      const { score, level } = useGameProgressStore.getState();
      if (score > 0) {
        const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        save({ score, level, durationSeconds });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------

  /** Apply a new challenge: update local state + sync Zustand session store. */
  const _applyChallenge = useCallback((challenge: TChallenge, level: number) => {
    const options = generateOptions(challenge.answer, level);
    setGameState(prev => ({ ...prev, currentChallenge: challenge, options }));
    useGameSessionStore.getState().setChallengeAndOptions(
      toChallengeItem(challenge),
      options.map(toOptionItem),
    );
    onChallengeChange?.(challenge);
  }, [generateOptions, toChallengeItem, toOptionItem, onChallengeChange]);

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  const startGame = useCallback(async () => {
    try {
      startTimeRef.current = Date.now();
      setGameState({
        currentChallenge: null,
        score: 0,
        level: 1,
        isPlaying: true,
        showCelebration: false,
        options: [],
      });

      const progressStore = useGameProgressStore.getState();
      progressStore.resetProgress();
      progressStore.setGameActive(true);
      useGameSessionStore.getState().resetSession();

      await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
      await speakStartMessage();

      const challenge = generateChallenge(1);
      _applyChallenge(challenge, 1);

      await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
      await speakQuestion(challenge);
    } catch (error) {
      console.error("Error in startGame:", error);
    }
  }, [_applyChallenge, generateChallenge, speakQuestion]);

  const handleNumberClick = useCallback(async (selectedNumber: number) => {
    if (!gameState.currentChallenge) return;

    if (selectedNumber === gameState.currentChallenge.answer) {
      playSound(audioContext);

      // Capture level before any awaits to avoid stale closure issues.
      const level = gameState.level;
      const nextChallenge = generateChallenge(level);
      const nextOptions = generateOptions(nextChallenge.answer, level);

      const onComplete = async () => {
        setGameState(prev => ({ ...prev, currentChallenge: nextChallenge, options: nextOptions }));
        useGameSessionStore.getState().setChallengeAndOptions(
          toChallengeItem(nextChallenge),
          nextOptions.map(toOptionItem),
        );
        onChallengeChange?.(nextChallenge);

        await delay(300);
        await speakQuestion(nextChallenge);
      };

      await handleCorrectGameAnswer(
        (v) => {
          setGameState(prev => ({ ...prev, showCelebration: v }));
          useGameSessionStore.getState().setShowCelebration(v);
        },
        onComplete,
      );
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakQuestion(gameState.currentChallenge);
        }
      });
    }
  }, [gameState, generateChallenge, generateOptions, toChallengeItem, toOptionItem, onChallengeChange, speakQuestion, audioContext]);

  /** Bridge for the universal card-click system (UltimateGamePage). */
  const handleItemClick = useCallback(async (item: BaseGameItem) => {
    await handleNumberClick(Number(item.name));
  }, [handleNumberClick]);

  /** Speak an arbitrary item name — used by GameLogicSync. */
  const speakItemName = useCallback(async (itemName: string): Promise<void> => {
    if (!speechEnabled) return;
    try {
      await speakHebrew(itemName);
    } catch {
      // ignore speech errors
    }
  }, [speechEnabled]);

  const resetGame = () =>
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
      options: [],
    });

  return {
    gameState,
    startGame,
    handleNumberClick,
    handleItemClick,
    speakItemName,
    resetGame,
  };
}
