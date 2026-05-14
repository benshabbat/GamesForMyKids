'use client';
import { useEffect, useRef } from 'react';
import type { GameResult } from './useGameCompletion';

type SaveFn = (result: GameResult) => void;

/**
 * Tracks phase transitions (menu → playing → dead/result/results) and calls
 * `saveResult` once when the game completes. Eliminates the repeated 15-line
 * startTimeRef / prevPhaseRef boilerplate found in multiple game hooks.
 *
 * @param phase        - current game phase string
 * @param saveResult   - stable ref or callback to persist the result
 * @param getPayload   - returns { score, level } at the moment of completion
 * @param completionPhases - phase strings that indicate game-over (default: common set)
 */
export function usePhaseGameCompletion(
  phase: string,
  saveResult: React.MutableRefObject<SaveFn>,
  getPayload: () => Omit<GameResult, 'durationSeconds'>,
  completionPhases: string[] = ['dead', 'result', 'results'],
) {
  const startTimeRef = useRef(0);
  const prevPhaseRef = useRef(phase);

  useEffect(() => {
    const prev = prevPhaseRef.current;
    const curr = phase;
    prevPhaseRef.current = curr;

    if (curr === 'playing' && prev !== 'playing') {
      startTimeRef.current = Date.now();
    } else if (prev === 'playing' && completionPhases.includes(curr)) {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveResult.current({ ...getPayload(), durationSeconds: elapsed });
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps
}
