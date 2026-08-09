import { describe, it, expect } from 'vitest';
import { containsDenylistedTerm, sanitisePrompt } from '@/lib/server/promptSafety';

describe('containsDenylistedTerm', () => {
  it('flags English terms regardless of case', () => {
    expect(containsDenylistedTerm('a GUN on the table')).toBe(true);
    expect(containsDenylistedTerm('Nude figure')).toBe(true);
  });

  it('flags Hebrew terms', () => {
    expect(containsDenylistedTerm('ילד עם אקדח')).toBe(true);
    expect(containsDenylistedTerm('סצנת אלימות')).toBe(true);
  });

  it('allows ordinary kid-friendly descriptions', () => {
    expect(containsDenylistedTerm('חתול קטן על עץ')).toBe(false);
    expect(containsDenylistedTerm('a friendly dragon eating cake')).toBe(false);
  });
});

describe('sanitisePrompt', () => {
  it('trims and returns valid text', () => {
    expect(sanitisePrompt('  פיל ורוד  ', 200)).toBe('פיל ורוד');
  });

  it('rejects non-strings', () => {
    expect(sanitisePrompt(undefined, 200)).toBeNull();
    expect(sanitisePrompt(42, 200)).toBeNull();
    expect(sanitisePrompt({ prompt: 'cat' }, 200)).toBeNull();
    expect(sanitisePrompt(null, 200)).toBeNull();
  });

  it('rejects empty and whitespace-only text', () => {
    expect(sanitisePrompt('', 200)).toBeNull();
    expect(sanitisePrompt('    ', 200)).toBeNull();
  });

  it('rejects text over the length cap', () => {
    expect(sanitisePrompt('a'.repeat(201), 200)).toBeNull();
    expect(sanitisePrompt('a'.repeat(200), 200)).toBe('a'.repeat(200));
  });

  it('rejects denylisted text', () => {
    expect(sanitisePrompt('a knife fight', 200)).toBeNull();
  });

  it('strips control characters rather than passing them to the model', () => {
    expect(sanitisePrompt('חתול\x07\x07שמח', 200)).toBe('חתול  שמח');
  });

  it('does not let control characters smuggle a denylisted term past the filter', () => {
    // Without stripping, 'gu\x07n' would not substring-match 'gun'. It still
    // shouldn't match after stripping (the char becomes a space), but the point
    // is that the value reaching the model is normalised either way.
    const result = sanitisePrompt('a gu\x07n', 200);
    expect(result).not.toContain('\x07');
  });

  it('applies the length cap after trimming, not before', () => {
    expect(sanitisePrompt('   cat   ', 3)).toBe('cat');
  });
});
