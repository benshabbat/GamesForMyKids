import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  safeGetItem,
  safeSetItem,
  safeRemoveItem,
  safeGetJSON,
  safeSetJSON,
} from '@/lib/utils/safeStorage';

/** Minimal in-memory Storage stand-in; `failOn` makes chosen methods throw. */
function createStorage(failOn: Array<'get' | 'set' | 'remove'> = []) {
  const map = new Map<string, string>();

  return {
    getItem(key: string) {
      if (failOn.includes('get')) throw new Error('read blocked');
      return map.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      if (failOn.includes('set')) {
        const error = new Error('QuotaExceededError');
        error.name = 'QuotaExceededError';
        throw error;
      }
      map.set(key, value);
    },
    removeItem(key: string) {
      if (failOn.includes('remove')) throw new Error('remove blocked');
      map.delete(key);
    },
  } as unknown as Storage;
}

function installWindow(storage: Storage | null, throwOnAccess = false) {
  const win = {};
  Object.defineProperty(win, 'localStorage', {
    get() {
      if (throwOnAccess) throw new Error('storage disabled by policy');
      return storage;
    },
    configurable: true,
  });
  vi.stubGlobal('window', win);
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('safeStorage without a window (SSR)', () => {
  beforeEach(() => {
    vi.stubGlobal('window', undefined);
  });

  it('reads return null and the fallback', () => {
    expect(safeGetItem('k')).toBeNull();
    expect(safeGetJSON('k', { a: 1 })).toEqual({ a: 1 });
  });

  it('writes report failure instead of throwing', () => {
    expect(safeSetItem('k', 'v')).toBe(false);
    expect(safeSetJSON('k', { a: 1 })).toBe(false);
    expect(safeRemoveItem('k')).toBe(false);
  });
});

describe('safeStorage when storage access itself throws', () => {
  beforeEach(() => {
    installWindow(null, true);
  });

  it('degrades rather than propagating the error', () => {
    expect(safeGetItem('k')).toBeNull();
    expect(safeSetItem('k', 'v')).toBe(false);
    expect(safeRemoveItem('k')).toBe(false);
  });
});

describe('safeStorage with working storage', () => {
  beforeEach(() => {
    installWindow(createStorage());
  });

  it('round-trips raw strings', () => {
    expect(safeSetItem('k', 'hello')).toBe(true);
    expect(safeGetItem('k')).toBe('hello');
  });

  it('round-trips JSON', () => {
    expect(safeSetJSON('k', { score: 5, name: 'דני' })).toBe(true);
    expect(safeGetJSON('k', null)).toEqual({ score: 5, name: 'דני' });
  });

  it('removes keys', () => {
    safeSetItem('k', 'v');
    expect(safeRemoveItem('k')).toBe(true);
    expect(safeGetItem('k')).toBeNull();
  });

  it('returns the fallback for a missing key', () => {
    expect(safeGetJSON('nope', 'fallback')).toBe('fallback');
  });

  it('returns the fallback for unparseable JSON rather than throwing', () => {
    safeSetItem('k', '{not json');
    expect(safeGetJSON('k', 'fallback')).toBe('fallback');
  });

  it('returns the fallback when the parsed value fails validation', () => {
    // The shape a previous release wrote.
    safeSetItem('k', JSON.stringify({ legacy: true }));

    const isScore = (v: unknown): v is { score: number } =>
      typeof v === 'object' && v !== null && typeof (v as { score?: unknown }).score === 'number';

    expect(safeGetJSON('k', { score: 0 }, isScore)).toEqual({ score: 0 });
  });

  it('accepts a parsed value that passes validation', () => {
    safeSetItem('k', JSON.stringify({ score: 42 }));

    const isScore = (v: unknown): v is { score: number } =>
      typeof v === 'object' && v !== null && typeof (v as { score?: unknown }).score === 'number';

    expect(safeGetJSON('k', { score: 0 }, isScore)).toEqual({ score: 42 });
  });

  it('reports failure for values that cannot be serialised', () => {
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;

    expect(safeSetJSON('k', cyclic)).toBe(false);
  });
});

describe('safeStorage when the quota is exhausted', () => {
  beforeEach(() => {
    installWindow(createStorage(['set']));
  });

  it('reports a failed write instead of throwing (Safari private mode)', () => {
    expect(safeSetItem('k', 'v')).toBe(false);
    expect(safeSetJSON('k', { a: 1 })).toBe(false);
  });
});

describe('safeStorage when reads throw', () => {
  beforeEach(() => {
    installWindow(createStorage(['get']));
  });

  it('returns null and the fallback', () => {
    expect(safeGetItem('k')).toBeNull();
    expect(safeGetJSON('k', 'fallback')).toBe('fallback');
  });
});
