import { describe, it, expect } from 'vitest';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';
import { GAME_ITEMS_MAP } from '@/lib/constants/gameItemsMap';

describe('GamesRegistry — structural integrity', () => {
  const registrations = GamesRegistry.getAllGameRegistrations();

  it('returns a non-empty array', () => {
    expect(registrations.length).toBeGreaterThan(0);
  });

  it('has no duplicate ids', () => {
    const ids = registrations.map(g => g.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates, `Duplicate ids found: ${duplicates}`).toHaveLength(0);
  });

  it('has no duplicate order values', () => {
    const orders = registrations.map(g => g.order);
    const duplicates = orders.filter((o, i) => orders.indexOf(o) !== i);
    expect(duplicates, `Duplicate order values found: ${duplicates}`).toHaveLength(0);
  });

  it('every registration has required fields', () => {
    for (const game of registrations) {
      expect(game.id, `game missing id`).toBeTruthy();
      expect(game.title, `"${game.id}" missing title`).toBeTruthy();
      expect(game.href, `"${game.id}" missing href`).toBeTruthy();
      expect(typeof game.available, `"${game.id}" available should be boolean`).toBe('boolean');
      expect(typeof game.order, `"${game.id}" order should be number`).toBe('number');
    }
  });

  it('every game whose id appears in gameItemsMap has non-empty data', () => {
    const mapKeys = Object.keys(GAME_ITEMS_MAP);
    for (const game of registrations) {
      if (mapKeys.includes(game.id)) {
        const items = GAME_ITEMS_MAP[game.id as keyof typeof GAME_ITEMS_MAP];
        expect(
          items?.length ?? 0,
          `"${game.id}" has no items in gameItemsMap`
        ).toBeGreaterThan(0);
      }
    }
  });

  it('total count matches getTotalGamesCount()', () => {
    expect(GamesRegistry.getTotalGamesCount()).toBe(registrations.length);
  });
});
