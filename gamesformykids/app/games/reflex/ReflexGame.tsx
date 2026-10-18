'use client';

import { useEffect } from 'react';
import { useReflexStore } from './reflexStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
import { usePhaseGameCompletion } from '@/hooks/shared/progress/usePhaseGameCompletion';
import ReflexMenuScreen from './components/ReflexMenuScreen';
import ReflexPlayScreen from './components/ReflexPlayScreen';
import ReflexResultScreen from './components/ReflexResultScreen';

export default function ReflexGame() {
  const phase = useReflexStore((s) => s.phase);

  // Save the result here, not in useReflexGame: that hook only runs inside ReflexPlayScreen,
  // which unmounts at the very moment the phase becomes 'result', so it never saw the end.
  const { saveGameResultRef } = useGameCompletion('reflex');
  usePhaseGameCompletion(phase, saveGameResultRef, () => ({ score: useReflexStore.getState().score, level: 1 }));

  // The countdown interval lives at module level — stop it (and reset to the menu) when the
  // player leaves, or it finishes silently and the next visit opens on a stale result.
  useEffect(() => () => useReflexStore.getState().abandonGame(), []);

  if (phase === 'menu')    return <ReflexMenuScreen />;
  if (phase === 'playing') return <ReflexPlayScreen />;
  return <ReflexResultScreen />;
}
