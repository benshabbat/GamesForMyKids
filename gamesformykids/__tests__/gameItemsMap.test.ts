import { describe, it, expect } from 'vitest';
import { GAME_ITEMS_MAP } from '@/lib/constants/gameItemsMap';

describe('GAME_ITEMS_MAP — data integrity', () => {
  it('every game type maps to a non-empty array', () => {
    for (const [key, items] of Object.entries(GAME_ITEMS_MAP)) {
      expect(items, `"${key}" should be defined`).toBeDefined();
      expect(Array.isArray(items), `"${key}" should be an array`).toBe(true);
      expect(items.length, `"${key}" should not be empty`).toBeGreaterThan(0);
    }
  });

  it('every item has required fields: name and hebrew', () => {
    for (const [key, items] of Object.entries(GAME_ITEMS_MAP)) {
      for (const item of items) {
        expect(item.name, `item in "${key}" missing name`).toBeTruthy();
        expect(item.hebrew, `item in "${key}" missing hebrew`).toBeTruthy();
      }
    }
  });

  it('every item name is unique within its game type', () => {
    for (const [key, items] of Object.entries(GAME_ITEMS_MAP)) {
      const names = items.map(i => i.name);
      const duplicates = names.filter((n, i) => names.indexOf(n) !== i);
      expect(duplicates, `"${key}" has duplicate item names: ${duplicates}`).toHaveLength(0);
    }
  });
});
