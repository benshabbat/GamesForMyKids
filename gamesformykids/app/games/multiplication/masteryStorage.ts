const STORAGE_KEY = 'multiplication-mastery-v1';
const MASTERY_RATIO = 0.75;

function readMastered(): Set<number> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function isLevelMastered(level: number): boolean {
  return readMastered().has(level);
}

export function recordLevelResult(level: number, correct: number, total: number): void {
  if (typeof window === 'undefined' || total <= 0) return;
  if (correct / total < MASTERY_RATIO) return;
  const mastered = readMastered();
  mastered.add(level);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(mastered)));
}
