import { ROUTES } from '@/lib/constants/routes';

/**
 * Validates a user-supplied post-login redirect target (`?next=...`).
 * Only same-origin absolute paths are allowed: the value must start with a
 * single '/', must not start with '//' or '/\' (protocol-relative), and must
 * not contain control characters (URL parsers strip tabs/newlines, which can
 * turn '/<TAB>/evil.com' into '//evil.com'). Anything else falls back to
 * `fallback`, so `?next=@evil.com` can never produce `https://host@evil.com`.
 */
export function getSafeRedirectPath(
  next: string | null | undefined,
  fallback: string = ROUTES.HOME,
): string {
  if (!next || !next.startsWith('/')) return fallback;
  if (next.startsWith('//') || next.startsWith('/\\')) return fallback;
  if (/\p{Cc}/u.test(next)) return fallback;
  return next;
}
