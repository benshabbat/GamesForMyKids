'use client';

import { useState, useCallback, useEffect, useRef } from "react";
import { BaseGameItem } from "@/lib/types/core/base";
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
import type {
  NumericQuizState,
  NumericQuizCallbacks,
} from "./useNumericQuizRuntime.types";

export type { NumericQuizState, NumericQuizCallbacks } from "./useNumericQuizRuntime.types";

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
  // Read saveGameResultRef.current at cleanup time (like useBaseGame) so we call the latest
  // version — auth may finish loading after this effect mounted, and a copy captured at
  // setup would still have user === null and silently skip the save.
  useEffect(() => {
    return () => {
      const { score, level } = useGameProgressStore.getState();
      // startTimeRef is 0 until startGame() ran: a score left in the shared progress store by
      // another game must not be saved here (duration would be ~Date.now()/1000 seconds).
      if (score > 0 && startTimeRef.current > 0) {
        const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        saveGameResultRef.current({ score, level, durationSeconds });
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

      const onComplete = async () => {
        // handleCorrectGameAnswer has just raised the level in the progress store (where the
        // level is tracked), so read it here: generating the next challenge from the stale
        // local gameState.level would keep the game at level 1 forever.
        const level = useGameProgressStore.getState().level;
        const nextChallenge = generateChallenge(level);
        const nextOptions = generateOptions(nextChallenge.answer, level);

        setGameState(prev => ({ ...prev, level, currentChallenge: nextChallenge, options: nextOptions }));
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
