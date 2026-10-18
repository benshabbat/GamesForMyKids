// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup, act } from '@testing-library/react';
import type { GameSession } from '@/lib/types/hooks/progress';

const useAuthMock = vi.fn();
const findAchievementMock = vi.fn();
const insertAchievementMock = vi.fn();

vi.mock('@/hooks/shared/auth/useAuth', () => ({ useAuth: () => useAuthMock() }));
vi.mock('@/lib/supabase/achievements', () => ({
  findAchievement: (...args: unknown[]) => findAchievementMock(...args),
  insertAchievement: (...args: unknown[]) => insertAchievementMock(...args),
}));

import GameAchievementSync from '@/components/game/shared/GameAchievementSync';
import { useProgressTrackingStore } from '@/lib/stores/progressTrackingStore';
import { useAchievementsStore } from '@/lib/stores/achievementsStore';
import { useUIStore } from '@/lib/stores/uiStore';

const USER = { id: 'user-1' };
const FIRST_GAME_TOAST = 'משחקן ראשון';

const SESSION = {
  id: 's1',
  gameType: 'animals',
  startTime: new Date(),
  score: 10,
  level: 1,
  correctAnswers: 0,
  totalAnswers: 0,
  duration: 5,
  accuracy: 0,
  mistakes: [],
  completed: true,
} as GameSession;

const ROW = { id: 'row-1', user_id: USER.id, achievement_type: 'first_game' };

const toasts = () => useUIStore.getState().notifications.map((n) => n.message);
const firstGameToasts = () => toasts().filter((m) => m.includes(FIRST_GAME_TOAST));

async function winOneGame() {
  await act(async () => {
    useProgressTrackingStore.getState().addSession(SESSION);
  });
  // let the find -> insert promise chain settle
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
}

beforeEach(() => {
  localStorage.clear();
  useProgressTrackingStore.setState({ allSessions: [] });
  useAchievementsStore.setState({ achievements: [] });
  useUIStore.setState({ notifications: [] });
  findAchievementMock.mockReset();
  insertAchievementMock.mockReset();
  useAuthMock.mockReset();
});

afterEach(() => {
  cleanup();
});

describe('GameAchievementSync notifications', () => {
  it('logged-in: toasts once after a successful insert and adds the row to the store', async () => {
    useAuthMock.mockReturnValue({ user: USER });
    findAchievementMock.mockResolvedValue(null);
    insertAchievementMock.mockResolvedValue(ROW);
    render(<GameAchievementSync />);

    await winOneGame();

    expect(insertAchievementMock).toHaveBeenCalledTimes(1);
    expect(firstGameToasts()).toHaveLength(1);
    expect(useAchievementsStore.getState().achievements).toEqual([ROW]);
  });

  it('logged-in: no toast and no insert when the achievement already exists', async () => {
    useAuthMock.mockReturnValue({ user: USER });
    findAchievementMock.mockResolvedValue({ id: 'existing' });
    render(<GameAchievementSync />);

    await winOneGame();

    expect(insertAchievementMock).not.toHaveBeenCalled();
    expect(toasts()).toHaveLength(0);
    expect(useAchievementsStore.getState().achievements).toEqual([]);
  });

  it('logged-in: no toast when the insert reports it already existed (unique violation -> null)', async () => {
    useAuthMock.mockReturnValue({ user: USER });
    findAchievementMock.mockResolvedValue(null);
    insertAchievementMock.mockResolvedValue(null);
    render(<GameAchievementSync />);

    await winOneGame();

    expect(insertAchievementMock).toHaveBeenCalledTimes(1);
    expect(toasts()).toHaveLength(0);
    expect(useAchievementsStore.getState().achievements).toEqual([]);
  });

  it('logged-in: no toast when the insert fails', async () => {
    useAuthMock.mockReturnValue({ user: USER });
    findAchievementMock.mockResolvedValue(null);
    insertAchievementMock.mockRejectedValue(new Error('rls'));
    render(<GameAchievementSync />);

    await winOneGame();

    expect(toasts()).toHaveLength(0);
  });

  it('guest: toasts immediately and remembers the achievement locally (unchanged behavior)', async () => {
    useAuthMock.mockReturnValue({ user: null });
    render(<GameAchievementSync />);

    await winOneGame();

    expect(findAchievementMock).not.toHaveBeenCalled();
    expect(insertAchievementMock).not.toHaveBeenCalled();
    expect(firstGameToasts()).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('gfk_achievements_local') ?? '[]')).toContain('first_game');
  });
});
