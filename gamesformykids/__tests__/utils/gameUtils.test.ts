import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  shuffleArray,
  randInt,
  getRandomItem,
  generateOptions,
  delay,
  getRandomFeedbackMessage,
} from '@/lib/utils/game/gameUtils';

// ── shuffleArray ──────────────────────────────────────────────────────────────

describe('shuffleArray', () => {
  it('returns a new array with the same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result).toHaveLength(input.length);
    expect(result).toEqual(expect.arrayContaining(input));
  });

  it('does not mutate the original array', () => {
    const input = [1, 2, 3];
    const copy = [...input];
    shuffleArray(input);
    expect(input).toEqual(copy);
  });

  it('returns an empty array when given an empty array', () => {
    expect(shuffleArray([])).toEqual([]);
  });

  it('returns a single-element array unchanged', () => {
    expect(shuffleArray([42])).toEqual([42]);
  });

  it('works with strings', () => {
    const input = ['a', 'b', 'c'];
    const result = shuffleArray(input);
    expect(result).toHaveLength(3);
    expect(result).toEqual(expect.arrayContaining(['a', 'b', 'c']));
  });
});

// ── randInt ───────────────────────────────────────────────────────────────────

describe('randInt', () => {
  it('returns a value within [min, max]', () => {
    for (let i = 0; i < 100; i++) {
      const value = randInt(1, 10);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(10);
    }
  });

  it('returns exactly min when Math.random returns 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(randInt(5, 10)).toBe(5);
    vi.restoreAllMocks();
  });

  it('returns exactly max when Math.random returns close to 1', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9999);
    expect(randInt(5, 10)).toBe(10);
    vi.restoreAllMocks();
  });

  it('works when min equals max', () => {
    expect(randInt(7, 7)).toBe(7);
  });

  it('returns an integer', () => {
    for (let i = 0; i < 20; i++) {
      expect(Number.isInteger(randInt(0, 100))).toBe(true);
    }
  });
});

// ── getRandomItem ─────────────────────────────────────────────────────────────

describe('getRandomItem', () => {
  it('returns an element from the array', () => {
    const items = ['apple', 'banana', 'cherry'];
    const result = getRandomItem(items);
    expect(items).toContain(result);
  });

  it('returns the only element of a single-item array', () => {
    expect(getRandomItem([99])).toBe(99);
  });

  it('throws when the array is empty', () => {
    expect(() => getRandomItem([])).toThrow();
  });

  it('works with objects', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = getRandomItem(items);
    expect(items).toContain(result);
  });
});

// ── generateOptions ───────────────────────────────────────────────────────────

describe('generateOptions', () => {
  const allItems = [
    { name: 'cat' },
    { name: 'dog' },
    { name: 'fish' },
    { name: 'bird' },
    { name: 'lion' },
  ];

  it('always includes the correct item', () => {
    const correct = allItems[0];
    const options = generateOptions(correct, allItems, 4);
    expect(options).toContainEqual(correct);
  });

  it('returns exactly `count` items', () => {
    const correct = allItems[0];
    const options = generateOptions(correct, allItems, 3);
    expect(options).toHaveLength(3);
  });

  it('returns no duplicate items', () => {
    const correct = allItems[0];
    const options = generateOptions(correct, allItems, 4);
    const names = options.filter((o): o is NonNullable<typeof o> => o !== undefined).map((o) => o.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('uses a custom idField', () => {
    const customItems = [
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' },
      { id: 'c', label: 'C' },
    ];
    const correct = customItems[0];
    const options = generateOptions(correct, customItems, 2, 'id' as keyof typeof correct);
    expect(options).toContainEqual(correct);
  });

  it('returns all items when count equals total items', () => {
    const correct = allItems[0];
    const options = generateOptions(correct, allItems, allItems.length);
    expect(options).toHaveLength(allItems.length);
  });
});

// ── delay ─────────────────────────────────────────────────────────────────────

describe('delay', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('resolves after the specified milliseconds', async () => {
    let resolved = false;
    const promise = delay(500).then(() => { resolved = true; });
    expect(resolved).toBe(false);
    await vi.advanceTimersByTimeAsync(500);
    await promise;
    expect(resolved).toBe(true);
  });

  it('resolves immediately for 0ms', async () => {
    let resolved = false;
    const promise = delay(0).then(() => { resolved = true; });
    await vi.advanceTimersByTimeAsync(0);
    await promise;
    expect(resolved).toBe(true);
  });
});

// ── getRandomFeedbackMessage ──────────────────────────────────────────────────

describe('getRandomFeedbackMessage', () => {
  it('returns a non-empty string for SUCCESS', () => {
    const msg = getRandomFeedbackMessage('SUCCESS');
    expect(typeof msg).toBe('string');
    expect(msg.length).toBeGreaterThan(0);
  });

  it('returns a non-empty string for WRONG', () => {
    const msg = getRandomFeedbackMessage('WRONG');
    expect(typeof msg).toBe('string');
    expect(msg.length).toBeGreaterThan(0);
  });

  it('returns a non-empty string for START', () => {
    const msg = getRandomFeedbackMessage('START');
    expect(typeof msg).toBe('string');
    expect(msg.length).toBeGreaterThan(0);
  });
});
