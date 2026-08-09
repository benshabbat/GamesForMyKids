/**
 * ===============================================
 * Safe localStorage access
 * ===============================================
 *
 * `localStorage` throws in more situations than it looks:
 *
 * - It doesn't exist during SSR or in the Vitest node environment.
 * - `setItem` throws `QuotaExceededError` when storage is full — and Safari in
 *   private mode reports a zero-byte quota, so *every* write throws there.
 * - Reading back JSON that a previous version wrote can throw on parse.
 *
 * A throw from any of those takes out whatever called it. That matters here
 * because progress tracking, engagement counters and audio settings all write
 * on the hot path of finishing a game — a failed write should cost the child a
 * saved streak, not the screen they're looking at.
 *
 * These helpers never throw. A failed read returns the fallback; a failed write
 * returns false. Callers that care can check, and the ones that don't stay
 * readable.
 */

import { logWarning } from './errorUtils';

function getStorage(): Storage | null {
  // `typeof window` rather than a try/catch: on the server the reference itself
  // is a ReferenceError, which a try/catch would catch but at a cost on every
  // call in a hot path.
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage;
  } catch {
    // Some browsers throw on the property access itself when storage is
    // disabled by policy, rather than on first use.
    return null;
  }
}

/** Reads a raw string. Returns null when absent or unavailable. */
export function safeGetItem(key: string): string | null {
  const storage = getStorage();
  if (!storage) return null;

  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

/** Writes a raw string. Returns false when the write didn't happen. */
export function safeSetItem(key: string, value: string): boolean {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.setItem(key, value);
    return true;
  } catch (error) {
    // Quota exceeded or storage disabled. Worth knowing about in dev, never
    // worth breaking the page over.
    logWarning(`[safeStorage] Could not write "${key}"`, error);
    return false;
  }
}

/** Removes a key. Returns false when the removal didn't happen. */
export function safeRemoveItem(key: string): boolean {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Reads and JSON-parses a key, falling back when it's missing or unparseable.
 *
 * The fallback covers the "shape changed between releases" case too: a child's
 * browser can be holding data written by any earlier version of the site, and
 * `JSON.parse` succeeding says nothing about whether the result still matches
 * `T`. Pass a `validate` predicate when a wrong shape would be worse than
 * starting fresh.
 */
export function safeGetJSON<T>(
  key: string,
  fallback: T,
  validate?: (value: unknown) => value is T,
): T {
  const raw = safeGetItem(key);
  if (raw === null) return fallback;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (validate && !validate(parsed)) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

/**
 * JSON-stringifies and writes a value. Returns false when the write didn't
 * happen — including when the value itself can't be serialised (a cycle, or a
 * `Set`/`Map`, which stringify to `{}` rather than throwing, so check your
 * types).
 */
export function safeSetJSON(key: string, value: unknown): boolean {
  try {
    return safeSetItem(key, JSON.stringify(value));
  } catch (error) {
    logWarning(`[safeStorage] Could not serialise "${key}"`, error);
    return false;
  }
}
