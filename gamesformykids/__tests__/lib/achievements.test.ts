import { describe, it, expect, vi, beforeEach } from 'vitest';

type Call = [string, ...unknown[]];

// Chainable query builder that records every call; single()/maybeSingle() resolve.
const calls: Call[] = [];
let terminalResult: { data: unknown; error: unknown } = { data: null, error: null };

function makeBuilder() {
  const builder: Record<string, unknown> = {};
  for (const name of ['select', 'eq', 'is', 'limit', 'insert']) {
    builder[name] = (...args: unknown[]) => {
      calls.push([name, ...args]);
      return builder;
    };
  }
  for (const name of ['single', 'maybeSingle']) {
    builder[name] = (...args: unknown[]) => {
      calls.push([name, ...args]);
      return Promise.resolve(terminalResult);
    };
  }
  return builder;
}

vi.mock('@/lib/supabase/client', () => {
  const supabase = { from: vi.fn(() => makeBuilder()) };
  return { supabase, default: supabase, isSupabaseConfigured: true };
});

import { findAchievement, insertAchievement } from '@/lib/supabase/achievements';

const NEW_ACHIEVEMENT = {
  achievement_type: 'first_win',
  achievement_name: 'first win',
  description: 'd',
  icon: 'i',
  game_type: null,
  metadata: {},
};

beforeEach(() => {
  calls.length = 0;
  terminalResult = { data: null, error: null };
});

describe('findAchievement', () => {
  it('uses limit(1) + maybeSingle() so duplicate rows never raise an error', async () => {
    terminalResult = { data: { id: 'a1' }, error: null };
    const row = await findAchievement('u1', 'first_win', 'animals');

    expect(row).toEqual({ id: 'a1' });
    const names = calls.map(([n]) => n);
    expect(names).toContain('maybeSingle');
    expect(names).not.toContain('single');
    expect(calls).toContainEqual(['limit', 1]);
  });

  it('filters by game_type equality for game-specific achievements', async () => {
    await findAchievement('u1', 'animals_3', 'animals');
    expect(calls).toContainEqual(['eq', 'game_type', 'animals']);
    expect(calls.find(([n]) => n === 'is')).toBeUndefined();
  });

  it('matches NULL game_type for cross-game achievements (empty gameType)', async () => {
    await findAchievement('u1', 'first_win', '');
    expect(calls).toContainEqual(['is', 'game_type', null]);
    expect(calls).not.toContainEqual(['eq', 'game_type', '']);
  });

  it('returns null when no row exists', async () => {
    expect(await findAchievement('u1', 'x', 'animals')).toBeNull();
  });
});

describe('insertAchievement', () => {
  it('returns the inserted row', async () => {
    terminalResult = { data: { id: 'a1', ...NEW_ACHIEVEMENT }, error: null };
    await expect(insertAchievement('u1', NEW_ACHIEVEMENT)).resolves.toMatchObject({ id: 'a1' });
  });

  it('treats a unique violation (23505) as already unlocked and returns null', async () => {
    terminalResult = { data: null, error: { code: '23505', message: 'duplicate key' } };
    await expect(insertAchievement('u1', NEW_ACHIEVEMENT)).resolves.toBeNull();
  });

  it('still throws other insert errors', async () => {
    const error = { code: '42501', message: 'rls' };
    terminalResult = { data: null, error };
    await expect(insertAchievement('u1', NEW_ACHIEVEMENT)).rejects.toBe(error);
  });
});
