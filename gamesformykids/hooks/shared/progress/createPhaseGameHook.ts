'use client';

import type { StoreApi, UseBoundStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { GameType } from '@/lib/types';
import { useGameCompletion, type GameResult } from './useGameCompletion';
import { usePhaseGameCompletion } from './usePhaseGameCompletion';

/**
 * Factory for game hooks that use phase-based completion tracking.
 * Eliminates the repeated useShallow + useGameCompletion + usePhaseGameCompletion
 * boilerplate found in balloon-pop, color-tap, emoji-math, and word-scramble.
 */
export function createPhaseGameHook<S extends { phase: string; score: number }>(
  store: UseBoundStore<StoreApi<S>>,
  gameId: GameType,
  getPayload: (state: S) => Omit<GameResult, 'durationSeconds'>,
  completionPhases?: string[],
): () => S {
  return function useGameHook() {
    const state = store(useShallow((s) => s));
    const { saveGameResultRef } = useGameCompletion(gameId);
    usePhaseGameCompletion(state.phase, saveGameResultRef, () => getPayload(state), completionPhases);
    return state;
  };
}
