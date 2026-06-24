import type { GameSession } from '@/lib/types/hooks/progress';

export interface AchievementDef {
  type: string;
  name: string;
  icon: string;
  description: string;
  /** gameType stored on the Supabase row (empty string for cross-game achievements) */
  gameType: string;
}

const LOCAL_KEY = 'gfk_achievements_local';

export function getLocalAchievementTypes(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return new Set();
    return new Set((JSON.parse(raw) as string[]));
  } catch {
    return new Set();
  }
}

export function saveLocalAchievementType(type: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getLocalAchievementTypes();
    existing.add(type);
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...existing]));
  } catch {}
}

function getStreakCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    return parseInt(localStorage.getItem('gfk_streak_count') ?? '0', 10);
  } catch {
    return 0;
  }
}

function uniqueGameTypes(sessions: GameSession[]): Set<string> {
  return new Set(sessions.map((s) => String(s.gameType)));
}

interface CheckFn {
  (allSessions: GameSession[], newSession: GameSession): boolean;
}

interface AchievementSpec extends AchievementDef {
  check: CheckFn;
}

const SPECS: AchievementSpec[] = [
  {
    type: 'first_game',
    name: 'משחקן ראשון',
    icon: '🎮',
    description: 'סיימת את המשחק הראשון שלך!',
    gameType: '',
    check: (sessions) => sessions.length >= 1,
  },
  {
    type: 'ten_unique_games',
    name: 'עשרה משחקים',
    icon: '🔟',
    description: 'שיחקת ב-10 משחקים שונים!',
    gameType: '',
    check: (sessions) => uniqueGameTypes(sessions).size >= 10,
  },
  {
    type: 'perfect_accuracy',
    name: 'מושלם!',
    icon: '🎯',
    description: 'דיוק מושלם — כל התשובות נכונות!',
    gameType: '',
    check: (_sessions, newSession) =>
      newSession.totalAnswers >= 5 &&
      newSession.correctAnswers === newSession.totalAnswers,
  },
  {
    type: 'animals_expert',
    name: 'מומחה חיות',
    icon: '🦁',
    description: 'שיחקת במשחק החיות 3 פעמים!',
    gameType: 'animals',
    check: (sessions) =>
      sessions.filter((s) => String(s.gameType) === 'animals').length >= 3,
  },
  {
    type: 'math_score',
    name: 'מחשבון',
    icon: '➕',
    description: 'השגת דיוק מעל 80% במתמטיקה!',
    gameType: 'math',
    check: (_sessions, newSession) =>
      String(newSession.gameType) === 'math' &&
      newSession.totalAnswers >= 5 &&
      newSession.correctAnswers / newSession.totalAnswers >= 0.8,
  },
  {
    type: 'ten_sessions',
    name: 'כוכב',
    icon: '⭐',
    description: 'השלמת 10 סשנים של משחק!',
    gameType: '',
    check: (sessions) => sessions.length >= 10,
  },
  {
    type: 'geographer',
    name: 'גיאוגרף',
    icon: '🌍',
    description: 'שיחקת ב-3 משחקי גאוגרפיה!',
    gameType: '',
    check: (sessions) => {
      const geoGames = ['flags', 'capitals', 'continents', 'israel'];
      const played = uniqueGameTypes(sessions);
      return geoGames.filter((g) => played.has(g)).length >= 3;
    },
  },
  {
    type: 'perfect_counting',
    name: 'אלוף הספירה',
    icon: '🏆',
    description: 'דיוק מושלם בספירה!',
    gameType: 'counting',
    check: (_sessions, newSession) =>
      String(newSession.gameType) === 'counting' &&
      newSession.totalAnswers >= 5 &&
      newSession.correctAnswers === newSession.totalAnswers,
  },
  {
    type: 'reader',
    name: 'קורא',
    icon: '📚',
    description: 'שיחקת במשחקי שפה!',
    gameType: '',
    check: (sessions) => {
      const langGames = ['letters', 'phonics', 'rhyming'];
      const played = uniqueGameTypes(sessions);
      return langGames.filter((g) => played.has(g)).length >= 2;
    },
  },
  {
    type: 'streak_5',
    name: 'בוער!',
    icon: '🔥',
    description: '5 ימים של משחק ברציפות!',
    gameType: '',
    check: () => getStreakCount() >= 5,
  },
];

/**
 * Returns the list of newly unlocked achievements given the full session history
 * and the latest session. Already-earned types (in `alreadyEarned`) are excluded.
 */
export function checkAchievements(
  allSessions: GameSession[],
  newSession: GameSession,
  alreadyEarned: Set<string>,
): AchievementDef[] {
  const result: AchievementDef[] = [];
  for (const spec of SPECS) {
    if (alreadyEarned.has(spec.type)) continue;
    if (spec.check(allSessions, newSession)) {
      result.push({
        type: spec.type,
        name: spec.name,
        icon: spec.icon,
        description: spec.description,
        gameType: spec.gameType,
      });
    }
  }
  return result;
}
