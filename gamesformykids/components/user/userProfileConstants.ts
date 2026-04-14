export const AVATAR_BG_COLOR = '8b5cf6';
export const AVATAR_TEXT_COLOR = 'fff';
export const AVATAR_API_BASE = 'https://ui-avatars.com/api/';

export const USER_PROFILE_LABELS = {
  loading: '',
  guest: 'משתמש אורח',
  login: 'התחבר',
  profile: 'פרופיל',
  settings: 'הגדרות',
  signOut: 'התנתק',
  guestEmoji: '🎮',
  defaultName: 'משתמש',
} as const;

export const USER_PROFILE_ROUTES = {
  login: '/login',
  profile: '/profile',
  settings: '/settings',
} as const;

export function buildAvatarUrl(email?: string | null): string {
  const name = email || 'User';
  return `${AVATAR_API_BASE}?name=${encodeURIComponent(name)}&background=${AVATAR_BG_COLOR}&color=${AVATAR_TEXT_COLOR}`;
}
