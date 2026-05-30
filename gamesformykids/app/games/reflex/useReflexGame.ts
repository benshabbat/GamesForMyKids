'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useReflexStore } from './reflexStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
import { usePhaseGameCompletion } from '@/hooks/shared/progress/usePhaseGameCompletion';
import { TARGET_EMOJIS, getLifetime, getSpawnInterval } from './data/targets';

export type { Target } from './reflexStore';

const _useStore = createShallowHook(useReflexStore);

export function useReflexGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('reflex');
  const nextIdRef  = useRef(0);
  const spawnIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  usePhaseGameCompletion(state.phase, saveGameResultRef, () => ({ score: state.score, level: 1 }));

  // Target spawner — runs while phase === 'playing'
  useEffect(() => {
    if (state.phase !== 'playing') {
      if (spawnIdRef.current) { clearTimeout(spawnIdRef.current); spawnIdRef.current = null; }
      return;
    }

    nextIdRef.current = 0;

    function spawnNext() {
      const store = useReflexStore.getState();
      if (store.phase !== 'playing') return;

      const id      = nextIdRef.current++;
      const score   = store.score;
      const target  = {
        id,
        x:        5 + Math.random() * 80,
        y:        10 + Math.random() * 70,
        emoji:    TARGET_EMOJIS[Math.floor(Math.random() * TARGET_EMOJIS.length)]!,
        lifetime: getLifetime(score),
        born:     Date.now(),
      };
      store.addTarget(target);

      setTimeout(() => useReflexStore.getState().expireTarget(id), target.lifetime);

      spawnIdRef.current = setTimeout(spawnNext, getSpawnInterval(useReflexStore.getState().score));
    }

    spawnIdRef.current = setTimeout(spawnNext, 600);

    return () => {
      if (spawnIdRef.current) { clearTimeout(spawnIdRef.current); spawnIdRef.current = null; }
    };
  }, [state.phase]);

  return state;
}
