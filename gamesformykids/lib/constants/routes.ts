/**
 * ROUTES — כל נתיבי הניווט במקום אחד
 * השתמש בקבועים אלה בכל מקום שצריך URL של דף
 */

export const ROUTES = {
  HOME: '/',
  GAMES: '/games',
  AUTH: {
    LOGIN: '/login',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    CALLBACK: '/auth/callback',
    ERROR: '/auth/auth-code-error',
  },
  ANALYTICS: '/analytics',
  SITEMAP: '/sitemap-page',

  /** מחזיר את הנתיב לדף משחק ספציפי */
  game: (gameType: string) => `/games/${gameType}` as const,
} as const;
