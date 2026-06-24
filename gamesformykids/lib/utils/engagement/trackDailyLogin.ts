export interface LoginStreak {
  count: number;
  isNew: boolean;
}

/** Reads and updates the daily login streak in localStorage. Call once on home page mount. */
export function getDailyLoginStreak(profileId?: string | null): LoginStreak {
  if (typeof window === 'undefined') return { count: 0, isNew: false };
  const s = profileId ? `_${profileId}` : '';
  const STREAK_KEY = `gfk_login_streak${s}`;
  const LAST_DATE_KEY = `gfk_login_last_date${s}`;
  try {
    const today = new Date().toISOString().slice(0, 10);
    const lastDate = localStorage.getItem(LAST_DATE_KEY);
    const streak = parseInt(localStorage.getItem(STREAK_KEY) ?? '0', 10);

    if (lastDate === today) return { count: streak, isNew: false };

    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const newStreak = lastDate === yesterday ? streak + 1 : 1;

    localStorage.setItem(LAST_DATE_KEY, today);
    localStorage.setItem(STREAK_KEY, String(newStreak));
    return { count: newStreak, isNew: true };
  } catch {
    return { count: 0, isNew: false };
  }
}
