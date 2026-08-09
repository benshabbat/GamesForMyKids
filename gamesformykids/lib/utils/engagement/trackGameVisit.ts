import { useChildProfileStore } from '@/lib/stores/childProfileStore';
import { safeGetJSON, safeSetJSON } from '@/lib/utils/safeStorage';

export interface LastPlayedData {
  gameType: string;
  timestamp: number;
}

export interface RecentGameEntry {
  gameType: string;
  timestamp: number;
}

export interface TodayCountData {
  date: string;
  count: number;
}

function profileKeys(profileId: string | null) {
  const s = profileId ? `_${profileId}` : '';
  return {
    recent: `gfk_recent${s}`,
    lastPlayed: `gfk_last_played${s}`,
    todayCount: `gfk_today_count${s}`,
  };
}

function activeId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return useChildProfileStore.getState().activeProfileId;
  } catch {
    return null;
  }
}

export function trackGameVisit(gameType: string): void {
  const keys = profileKeys(activeId());
  const now = Date.now();

  safeSetJSON(keys.lastPlayed, { gameType, timestamp: now } as LastPlayedData);

  const prev = getRecentGames().filter((g) => g.gameType !== gameType);
  prev.unshift({ gameType, timestamp: now });
  safeSetJSON(keys.recent, prev.slice(0, 5));

  const today = new Date().toISOString().slice(0, 10);
  let todayData = safeGetJSON<TodayCountData>(keys.todayCount, { date: '', count: 0 });
  if (todayData.date === today) {
    todayData.count += 1;
  } else {
    todayData = { date: today, count: 1 };
  }
  safeSetJSON(keys.todayCount, todayData);
}

export function getLastPlayed(profileId?: string | null): LastPlayedData | null {
  const id = profileId !== undefined ? profileId : activeId();
  return safeGetJSON<LastPlayedData | null>(profileKeys(id).lastPlayed, null);
}

export function getRecentGames(profileId?: string | null): RecentGameEntry[] {
  const id = profileId !== undefined ? profileId : activeId();
  return safeGetJSON<RecentGameEntry[]>(profileKeys(id).recent, []);
}

export function getGamesTodayCount(profileId?: string | null): number {
  const id = profileId !== undefined ? profileId : activeId();
  const data = safeGetJSON<TodayCountData>(profileKeys(id).todayCount, { date: '', count: 0 });
  const today = new Date().toISOString().slice(0, 10);
  return data.date === today ? (data.count ?? 0) : 0;
}
