import { describe, it, expect } from 'vitest';
import { getSafeRedirectPath } from '@/lib/utils/safeRedirect';

describe('getSafeRedirectPath', () => {
  it('allows same-origin absolute paths', () => {
    expect(getSafeRedirectPath('/')).toBe('/');
    expect(getSafeRedirectPath('/profile')).toBe('/profile');
    expect(getSafeRedirectPath('/games/animals?level=2#top')).toBe('/games/animals?level=2#top');
  });

  it('falls back to / when next is missing or empty', () => {
    expect(getSafeRedirectPath(null)).toBe('/');
    expect(getSafeRedirectPath(undefined)).toBe('/');
    expect(getSafeRedirectPath('')).toBe('/');
  });

  it('rejects userinfo / host smuggling (no leading slash)', () => {
    expect(getSafeRedirectPath('@evil.com')).toBe('/');
    expect(getSafeRedirectPath('.evil.com')).toBe('/');
    expect(getSafeRedirectPath('evil.com')).toBe('/');
    expect(getSafeRedirectPath(':8080@evil.com')).toBe('/');
  });

  it('rejects absolute and scheme URLs', () => {
    expect(getSafeRedirectPath('https://evil.com')).toBe('/');
    expect(getSafeRedirectPath('http://evil.com/x')).toBe('/');
    expect(getSafeRedirectPath('javascript:alert(1)')).toBe('/');
  });

  it('rejects protocol-relative and backslash variants', () => {
    expect(getSafeRedirectPath('//evil.com')).toBe('/');
    expect(getSafeRedirectPath('/\\evil.com')).toBe('/');
    expect(getSafeRedirectPath('///evil.com')).toBe('/');
  });

  it('rejects control characters that URL parsers strip', () => {
    expect(getSafeRedirectPath('/\t/evil.com')).toBe('/');
    expect(getSafeRedirectPath('/\n/evil.com')).toBe('/');
    expect(getSafeRedirectPath('/\r\\evil.com')).toBe('/');
  });

  it('honors a custom fallback', () => {
    expect(getSafeRedirectPath('//evil.com', '/login')).toBe('/login');
    expect(getSafeRedirectPath('/ok', '/login')).toBe('/ok');
  });

  it('never yields a different origin when concatenated onto the origin', () => {
    const origin = 'https://app.example.com';
    const attempts = ['@evil.com', '//evil.com', '/\\evil.com', 'https://evil.com', '/\t/evil.com', '/ok'];
    for (const attempt of attempts) {
      const target = new URL(`${origin}${getSafeRedirectPath(attempt)}`);
      expect(target.origin).toBe(origin);
    }
  });
});
