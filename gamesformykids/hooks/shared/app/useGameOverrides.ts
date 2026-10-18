'use client';

import { useSyncExternalStore } from 'react';
import {
  getGameOverridesCache,
  subscribeGameOverrides,
  NO_GAME_OVERRIDES,
  type GameOverridesMap,
  type GameOverrideStatus,
} from '@/lib/registry/gameOverrides';

/**
 * The admin game overrides (hidden/featured), re-rendering when GameOverridesProvider's
 * fetch resolves. Pass it to GamesRegistry.getAllGameRegistrations() inside a memo so
 * lists drop hidden games once they're known. Empty on the server and during hydration.
 */
export function useGameOverrides(): GameOverridesMap {
  return useSyncExternalStore(subscribeGameOverrides, getGameOverridesCache, () => NO_GAME_OVERRIDES);
}

/** The admin override for one game ('visible' until overrides have loaded). */
export function useGameOverrideStatus(gameId: string): GameOverrideStatus {
  return useGameOverrides()[gameId] ?? 'visible';
}
