import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logError } from '@/lib/utils/errorUtils';
import type { GameOverridesMap, GameOverrideStatus } from '@/lib/registry/gameOverrides';

export interface GameOverridesResponse {
  overrides: GameOverridesMap;
}

export async function GET(): Promise<NextResponse<GameOverridesResponse>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('game_overrides').select('game_id, status');
    if (error) throw error;

    const overrides: GameOverridesMap = {};
    for (const row of data ?? []) {
      overrides[row.game_id as string] = row.status as GameOverrideStatus;
    }

    return NextResponse.json(
      { overrides },
      { headers: { 'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300' } },
    );
  } catch (error) {
    logError('[Game Overrides] Error:', error);
    return NextResponse.json({ overrides: {} }, { status: 500 });
  }
}
