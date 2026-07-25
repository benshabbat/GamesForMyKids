export type GameOverrideStatus = 'visible' | 'hidden' | 'featured';
export type GameOverridesMap = Record<string, GameOverrideStatus>;

// Global site config (which games are hidden/featured), not per-user data —
// safe to hold as module-level state shared across requests.
let cache: GameOverridesMap = {};

export function setGameOverridesCache(overrides: GameOverridesMap): void {
  cache = overrides;
}

export function getGameOverridesCache(): GameOverridesMap {
  return cache;
}

/** Filters out hidden games and sorts featured games first. Order within each group is preserved. */
export function applyGameOverrides<T extends { id: string }>(games: T[], overrides: GameOverridesMap): T[] {
  const visible = games.filter((g) => overrides[g.id] !== 'hidden');
  const featured = visible.filter((g) => overrides[g.id] === 'featured');
  const rest = visible.filter((g) => overrides[g.id] !== 'featured');
  return [...featured, ...rest];
}
