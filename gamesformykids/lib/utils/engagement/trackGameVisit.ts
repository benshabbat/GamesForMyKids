const LAST_PLAYED_KEY = 'gfk_last_played';
const RECENT_KEY = 'gfk_recent';
const TODAY_COUNT_KEY = 'gfk_today_count';

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

export function trackGameVisit(gameType: string): void {
  if (typeof window === 'undefined') return;
  const now = Date.now();

  // Last played
  const entry: LastPlayedData = { gameType, timestamp: now };
  localStorage.setItem(LAST_PLAYED_KEY, JSON.stringify(entry));

  // Recent list (max 5, deduplicated)
  const prev = getRecentGames().filter((g) => g.gameType !== gameType);
  prev.unshift({ gameType, timestamp: now });
  localStorage.setItem(RECENT_KEY, JSON.stringify(prev.slice(0, 5)));

  // Games played today
  const today = new Date().toISOString().slice(0, 10);
  let todayData: TodayCountData;
  try {
    todayData = JSON.parse(localStorage.getItem(TODAY_COUNT_KEY) ?? '{}') as TodayCountData;
  } catch {
    todayData = { date: '', count: 0 };
  }
  if (todayData.date === today) {
    todayData.count += 1;
  } else {
    todayData = { date: today, count: 1 };
  }
  localStorage.setItem(TODAY_COUNT_KEY, JSON.stringify(todayData));
}

export function getLastPlayed(): LastPlayedData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LAST_PLAYED_KEY);
    return raw ? (JSON.parse(raw) as LastPlayedData) : null;
  } catch {
    return null;
  }
}

export function getRecentGames(): RecentGameEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]') as RecentGameEntry[];
  } catch {
    return [];
  }
}

export function getGamesTodayCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const data = JSON.parse(localStorage.getItem(TODAY_COUNT_KEY) ?? '{}') as TodayCountData;
    const today = new Date().toISOString().slice(0, 10);
    return data.date === today ? (data.count ?? 0) : 0;
  } catch {
    return 0;
  }
}
