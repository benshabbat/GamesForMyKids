/**
 * Card utilities — shuffling and memory card creation
 */

/**
 * מערבב מערך בצורה אקראית (Fisher-Yates)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i]!, a[j]!] = [a[j]!, a[i]!];
  }
  return a;
}

/** קיצור לייבוא נוח בקבצי משחק */
export const shuffle: <T>(arr: T[]) => T[] = shuffleArray;

/**
 * פונקציה לערבוב וייצור קלפים למשחק זיכרון
 */
export function createShuffledMemoryCards<T>(
  items: T[],
): { id: number; item: T; isFlipped: boolean; isMatched: boolean }[] {
  const shuffledCards = [...items, ...items]
    .map((item) => ({
      id: Math.random(),
      item,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);

  return shuffledCards.map((card, index) => ({
    ...card,
    id: index,
  }));
}
