// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGameOptions } from '@/hooks/shared/game-state/useGameOptions';
import type { BaseGameItem } from '@/lib/types/core/base';

const makeItems = (count: number): BaseGameItem[] =>
  Array.from({ length: count }, (_, i) => ({
    name: `item${i}`,
    hebrew: `פריט${i}`,
    english: `item${i}`,
    emoji: '🔵',
    color: 'blue',
  }));

describe('useGameOptions', () => {
  describe('availableItems', () => {
    it('starts with baseCount items at level 1', () => {
      const items = makeItems(10);
      const { result } = renderHook(() =>
        useGameOptions({ allItems: items, level: 1, baseCount: 4 })
      );
      expect(result.current.availableItems).toHaveLength(4);
    });

    it('adds items as level increases past levelThreshold', () => {
      const items = makeItems(10);
      const { result: r1 } = renderHook(() =>
        useGameOptions({ allItems: items, level: 4, baseCount: 4, increment: 1, levelThreshold: 3 })
      );
      expect(r1.current.availableItems).toHaveLength(5);
    });

    it('never exceeds the total number of items', () => {
      const items = makeItems(3);
      const { result } = renderHook(() =>
        useGameOptions({ allItems: items, level: 100, baseCount: 10 })
      );
      expect(result.current.availableItems).toHaveLength(3);
    });
  });

  describe('getRandomChallenge', () => {
    it('returns an item from availableItems', () => {
      const items = makeItems(6);
      const { result } = renderHook(() =>
        useGameOptions({ allItems: items, level: 1, baseCount: 4 })
      );
      const challenge = result.current.getRandomChallenge();
      expect(result.current.availableItems).toContainEqual(challenge);
    });
  });

  describe('getOptionsForChallenge', () => {
    it('always includes the correct challenge in options', () => {
      const items = makeItems(8);
      const { result } = renderHook(() =>
        useGameOptions({ allItems: items, level: 1, baseCount: 6 })
      );
      const challenge = result.current.availableItems[0]!;
      const options = result.current.getOptionsForChallenge(challenge);
      expect(options).toContainEqual(challenge);
    });

    it('returns no duplicate names in options', () => {
      const items = makeItems(8);
      const { result } = renderHook(() =>
        useGameOptions({ allItems: items, level: 1, baseCount: 6 })
      );
      const challenge = result.current.availableItems[0]!
      const options = result.current.getOptionsForChallenge(challenge);
      const names = options.map((o) => o.name);
      expect(new Set(names).size).toBe(names.length);
    });
  });
});
