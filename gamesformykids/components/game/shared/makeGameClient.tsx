'use client';
import dynamic, { type DynamicOptions } from 'next/dynamic';
import type { ComponentType } from 'react';

/**
 * Factory that creates the standard game client wrapper:
 *   'use client' boundary + next/dynamic with ssr: false.
 *
 * Usage (replace the entire XxxClient.tsx body):
 *   import { makeGameClient } from '@/components/game/shared/makeGameClient';
 *   export default makeGameClient(() => import('./XxxGame'));
 */
export function makeGameClient(
  importFn: () => Promise<{ default: ComponentType }>,
  options?: Omit<DynamicOptions, 'ssr'>,
) {
  const Game = dynamic(importFn, { ssr: false, ...options });
  return function GameClient() {
    return <Game />;
  };
}
