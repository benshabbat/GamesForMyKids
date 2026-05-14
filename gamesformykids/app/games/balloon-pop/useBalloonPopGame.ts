'use client';
import { useShallow } from 'zustand/react/shallow';
import { useBalloonPopStore } from './balloonPopStore';
import { useGameCompletion, usePhaseGameCompletion } from '@/hooks/shared/progress';

export function useBalloonPopGame() {
  const state = useBalloonPopStore(useShallow((s) => s));
  const { saveGameResultRef } = useGameCompletion('balloon-pop');

  usePhaseGameCompletion(state.phase, saveGameResultRef, () => ({ score: state.score, level: 1 }), ['result']);

  return state;
}
