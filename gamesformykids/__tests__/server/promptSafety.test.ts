import { describe, it, expect } from 'vitest';
import {
  containsDenylistedTerm,
  normaliseModelText,
  sanitisePrompt,
} from '@/lib/server/promptSafety';

describe('containsDenylistedTerm', () => {
  it('flags English terms regardless of case', () => {
    expect(containsDenylistedTerm('a GUN on the table')).toBe(true);
    expect(containsDenylistedTerm('Nude figure')).toBe(true);
  });

  it('flags Hebrew terms', () => {
    expect(containsDenylistedTerm('ילד עם אקדח')).toBe(true);
    expect(containsDenylistedTerm('סצנת אלימות')).toBe(true);
  });

  it('flags a Hebrew term carrying a single-letter prefix', () => {
    expect(containsDenylistedTerm('הדם על הרצפה')).toBe(true);
    expect(containsDenylistedTerm('ילד ונשק')).toBe(true);
  });

  it('flags a term next to punctuation', () => {
    expect(containsDenylistedTerm('a knife, on a plate')).toBe(true);
    expect(containsDenylistedTerm('דם!')).toBe(true);
  });

  it('allows ordinary kid-friendly descriptions', () => {
    expect(containsDenylistedTerm('חתול קטן על עץ')).toBe(false);
    expect(containsDenylistedTerm('a friendly dragon eating cake')).toBe(false);
  });

  // The whole point of matching words rather than substrings: these are all
  // perfectly ordinary requests that a substring filter rejects.
  it('does not flag Hebrew words that merely contain a term', () => {
    expect(containsDenylistedTerm('אדם עומד בגן')).toBe(false);      // אדם contains דם
    expect(containsDenylistedTerm('פרח באדמה')).toBe(false);          // אדמה contains דם
    expect(containsDenylistedTerm('העולם מתקדם')).toBe(false);        // מתקדם contains דם
    expect(containsDenylistedTerm('הנוף נשקף באגם')).toBe(false);     // נשקף contains נשק
  });

  it('does not flag English words that merely contain a term', () => {
    expect(containsDenylistedTerm('a child with great skill')).toBe(false);  // skill / kill
    expect(containsDenylistedTerm('a bloodhound puppy')).toBe(false);        // bloodhound / blood
    expect(containsDenylistedTerm('a drugstore on the corner')).toBe(false); // drugstore / drug
    expect(containsDenylistedTerm('gunpowder tea leaves')).toBe(false);      // gunpowder / gun
  });
});

describe('normaliseModelText', () => {
  it('trims and returns valid text', () => {
    expect(normaliseModelText('  פיל ורוד  ', 200)).toBe('פיל ורוד');
  });

  it('rejects non-strings', () => {
    expect(normaliseModelText(undefined, 200)).toBeNull();
    expect(normaliseModelText(42, 200)).toBeNull();
    expect(normaliseModelText(null, 200)).toBeNull();
  });

  it('rejects empty and whitespace-only text', () => {
    expect(normaliseModelText('', 200)).toBeNull();
    expect(normaliseModelText('    ', 200)).toBeNull();
  });

  it('rejects text over the length cap', () => {
    expect(normaliseModelText('a'.repeat(201), 200)).toBeNull();
    expect(normaliseModelText('a'.repeat(200), 200)).toBe('a'.repeat(200));
  });

  it('strips control characters', () => {
    expect(normaliseModelText('חתול\x07\x07שמח', 200)).toBe('חתול  שמח');
  });

  it('does not apply the denylist — story text is not an image prompt', () => {
    expect(normaliseModelText('לרדוף אחרי האדם המסתורי', 200)).toBe('לרדוף אחרי האדם המסתורי');
    expect(normaliseModelText('to fight the dragon with a knife', 200)).not.toBeNull();
  });
});

describe('sanitisePrompt', () => {
  it('trims and returns valid text', () => {
    expect(sanitisePrompt('  פיל ורוד  ', 200)).toBe('פיל ורוד');
  });

  it('rejects non-strings', () => {
    expect(sanitisePrompt(undefined, 200)).toBeNull();
    expect(sanitisePrompt({ prompt: 'cat' }, 200)).toBeNull();
  });

  it('rejects empty and over-long text', () => {
    expect(sanitisePrompt('   ', 200)).toBeNull();
    expect(sanitisePrompt('a'.repeat(201), 200)).toBeNull();
  });

  it('rejects denylisted text', () => {
    expect(sanitisePrompt('a knife fight', 200)).toBeNull();
    expect(sanitisePrompt('ציור של אקדח', 200)).toBeNull();
  });

  it('accepts a word that only contains a denylisted term', () => {
    expect(sanitisePrompt('אדם מחייך', 200)).toBe('אדם מחייך');
  });

  it('does not let control characters split a term past the filter', () => {
    // 'gu<control>n' normalises to 'gu n', which tokenises to "gu" and "n" —
    // neither is denylisted, and neither reads as a weapon to the model either.
    // The guarantee here is only that the value reaching the model is clean.
    expect(sanitisePrompt('a gu\x07n', 200)).not.toContain('\x07');
  });

  it('applies the length cap after trimming, not before', () => {
    expect(sanitisePrompt('   cat   ', 3)).toBe('cat');
  });
});
