import { useChildProfileStore } from '@/lib/stores/childProfileStore';

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
  if (typeof window === 'undefined') return;
  const keys = profileKeys(activeId());
  const now = Date.now();

  localStorage.setItem(keys.lastPlayed, JSON.stringify({ gameType, timestamp: now } as LastPlayedData));

  const prev = getRecentGames().filter((g) => g.gameType !== gameType);
  prev.unshift({ gameType, timestamp: now });
  localStorage.setItem(keys.recent, JSON.stringify(prev.slice(0, 5)));

  const today = new Date().toISOString().slice(0, 10);
  let todayData: TodayCountData;
  try {
    todayData = JSON.parse(localStorage.getItem(keys.todayCount) ?? '{}') as TodayCountData;
  } catch {
    todayData = { date: '', count: 0 };
  }
  if (todayData.date === today) {
    todayData.count += 1;
  } else {
    todayData = { date: today, count: 1 };
  }
  localStorage.setItem(keys.todayCount, JSON.stringify(todayData));
}

export function getLastPlayed(profileId?: string | null): LastPlayedData | null {
  if (typeof window === 'undefined') return null;
  const id = profileId !== undefined ? profileId : activeId();
  try {
    const raw = localStorage.getItem(profileKeys(id).lastPlayed);
    return raw ? (JSON.parse(raw) as LastPlayedData) : null;
  } catch {
    return null;
  }
}

export function getRecentGames(profileId?: string | null): RecentGameEntry[] {
  if (typeof window === 'undefined') return [];
  const id = profileId !== undefined ? profileId : activeId();
  try {
    return JSON.parse(localStorage.getItem(profileKeys(id).recent) ?? '[]') as RecentGameEntry[];
  } catch {
    return [];
  }
}

export function getGamesTodayCount(profileId?: string | null): number {
  if (typeof window === 'undefined') return 0;
  const id = profileId !== undefined ? profileId : activeId();
  try {
    const data = JSON.parse(localStorage.getItem(profileKeys(id).todayCount) ?? '{}') as TodayCountData;
    const today = new Date().toISOString().slice(0, 10);
    return data.date === today ? (data.count ?? 0) : 0;
  } catch {
    return 0;
  }
}
