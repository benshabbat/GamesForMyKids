import { createClient } from './server';
import type { GameOverridesMap, GameOverrideStatus } from '@/lib/registry/gameOverrides';

/**
 * Server-side loader for game_overrides, used by server components that read
 * GamesRegistry directly (it doesn't fetch on its own — the cache must be
 * populated first via setGameOverridesCache()).
 */
export async function fetchGameOverridesServer(): Promise<GameOverridesMap> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('game_overrides').select('game_id, status');
  if (error || !data) return {};

  const map: GameOverridesMap = {};
  for (const row of data) {
    map[row.game_id as string] = row.status as GameOverrideStatus;
  }
  return map;
}
