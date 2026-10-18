import { shuffle } from '@/lib/utils';

export interface ShuffledOptions<T> {
  /** The options in display order. */
  options: T[];
  /** Index of the correct option within `options`. */
  correctIndex: number;
  /** order[i] is the index in the original array of the option shown at position i. */
  order: number[];
}

/**
 * Shuffles answer options and tracks where the correct one ended up. Remaps by position
 * (not by value), so duplicate option texts can't confuse which one is correct.
 * Call it once per question (e.g. in a useState initializer), not on every render.
 */
export function shuffleOptions<T>(options: readonly T[], correctIndex: number): ShuffledOptions<T> {
  const order = shuffle(options.map((_, i) => i));
  return {
    options: order.map((i) => options[i]!),
    correctIndex: order.indexOf(correctIndex),
    order,
  };
}
