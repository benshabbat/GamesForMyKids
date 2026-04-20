/**
 * countingChallengeStore — stores the current CountingChallenge for visual rendering.
 * Written by useCountingGame; read by CountingChallengeBox.
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { CountingChallenge } from '@/lib/types';

interface CountingChallengeState {
  challenge: CountingChallenge | null;
  setChallenge: (challenge: CountingChallenge | null) => void;
}

export const useCountingChallengeStore = create<CountingChallengeState>()(
  devtools(
    (set) => ({
      challenge: null,
      setChallenge: (challenge) =>
        set({ challenge }, false, 'countingChallenge/setChallenge'),
    }),
    { name: 'CountingChallengeStore' },
  ),
);
