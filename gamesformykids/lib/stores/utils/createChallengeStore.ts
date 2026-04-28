/**
 * createChallengeStore — factory function for single-challenge stores.
 *
 * Usage:
 *   export const useCountingChallengeStore = createChallengeStore<CountingChallenge>('countingChallenge');
 *   export const useMathChallengeStore     = createChallengeStore<MathChallenge>('mathChallenge');
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ChallengeStoreState<T> {
  challenge: T | null;
  setChallenge: (challenge: T | null) => void;
}

export function createChallengeStore<T>(storeName: string) {
  return create<ChallengeStoreState<T>>()(
    devtools(
      (set) => ({
        challenge: null,
        setChallenge: (challenge) =>
          set({ challenge }, false, `${storeName}/setChallenge`),
      }),
      { name: `${storeName}Store` },
    ),
  );
}
