import { Metadata } from 'next';
import { requireAdmin } from '@/lib/supabase/requireAdmin';
import { GAMES_REGISTRY } from '@/lib/registry/gamesRegistryData';
import type { GameOverrideStatus } from '@/lib/registry/gameOverrides';
import { GamesTable, type AdminGameRow } from './GamesTable';

export const metadata: Metadata = {
  title: 'ניהול משחקים | GamesForMyKids',
  robots: { index: false, follow: false },
};

export default async function AdminGamesPage() {
  const { supabase } = await requireAdmin();

  const [{ data: overrides }, { data: progress }] = await Promise.all([
    supabase.from('game_overrides').select('game_id, status'),
    supabase.from('game_progress').select('game_type'),
  ]);

  const overrideMap = new Map<string, GameOverrideStatus>(
    (overrides ?? []).map((o) => [o.game_id, o.status as GameOverrideStatus])
  );
  const playCounts = new Map<string, number>();
  for (const p of progress ?? []) {
    playCounts.set(p.game_type, (playCounts.get(p.game_type) ?? 0) + 1);
  }

  const rows: AdminGameRow[] = [...GAMES_REGISTRY]
    .sort((a, b) => a.order - b.order)
    .map((game) => ({
      id: game.id,
      title: game.title,
      emoji: game.emoji,
      available: game.available,
      status: overrideMap.get(game.id) ?? 'visible',
      playerCount: playCounts.get(game.id) ?? 0,
    }));

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">🎮 משחקים ({rows.length})</h2>
      <GamesTable games={rows} />
    </div>
  );
}
