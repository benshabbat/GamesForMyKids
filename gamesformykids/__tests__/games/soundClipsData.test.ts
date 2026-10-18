import { describe, expect, it } from 'vitest';
import { SOUND_CLIPS } from '@/app/games/sound-quiz/data/soundClips';

const byName = (name: string) => SOUND_CLIPS.find((c) => c.name === name);

describe('sound-quiz clip data', () => {
  it('uses proper Hebrew instrument names', () => {
    expect(byName('חליל')).toBeDefined();
    expect(byName('מרימבה')).toBeDefined();
    expect(byName('פלוט')).toBeUndefined();
    expect(byName('מרמבה')).toBeUndefined();
  });

  it('pairs the accordion emoji with the accordion, not the harmonica', () => {
    expect(byName('אקורדיון')?.emoji).toBe('🪗');
    expect(byName('מפוחית')?.emoji).not.toBe('🪗');
  });

  it('gives every clip its own emoji, since the answer buttons show them side by side', () => {
    const emojis = SOUND_CLIPS.map((c) => c.emoji);
    expect(new Set(emojis).size).toBe(emojis.length);
  });

  it('has unique ids and names', () => {
    expect(new Set(SOUND_CLIPS.map((c) => c.id)).size).toBe(SOUND_CLIPS.length);
    expect(new Set(SOUND_CLIPS.map((c) => c.name)).size).toBe(SOUND_CLIPS.length);
  });
});
