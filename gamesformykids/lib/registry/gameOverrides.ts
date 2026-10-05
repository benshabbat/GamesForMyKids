export type GameOverrideStatus = 'visible' | 'hidden' | 'featured';
export type GameOverridesMap = Record<string, GameOverrideStatus>;

// Global site config (which games are hidden/featured), not per-user data —
// safe to hold as module-level state shared across requests.
// The cache starts as this shared empty map, which is also the server snapshot in
// useGameOverrides, so hydration matches and lists only re-render once overrides arrive.
export const NO_GAME_OVERRIDES: GameOverridesMap = Object.freeze({});
let cache: GameOverridesMap = NO_GAME_OVERRIDES;
const listeners = new Set<() => void>();

export function setGameOverridesCache(overrides: GameOverridesMap): void {
  cache = overrides;
  listeners.forEach((listener) => listener());
}

export function getGameOverridesCache(): GameOverridesMap {
  return cache;
}

export function subscribeGameOverrides(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

/** Filters out hidden games and sorts featured games first. Order within each group is preserved. */
export function applyGameOverrides<T extends { id: string }>(games: T[], overrides: GameOverridesMap): T[] {
  const visible = games.filter((g) => overrides[g.id] !== 'hidden');
  const featured = visible.filter((g) => overrides[g.id] === 'featured');
  const rest = visible.filter((g) => overrides[g.id] !== 'featured');
  return [...featured, ...rest];
}
