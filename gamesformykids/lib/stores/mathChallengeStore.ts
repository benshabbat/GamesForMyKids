/**
 * mathChallengeStore — stores the current MathChallenge for visual rendering.
 * Written by useMathGame; read by MathChallengeBox.
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { MathChallenge } from '@/lib/types';

interface MathChallengeState {
  challenge: MathChallenge | null;
  setChallenge: (challenge: MathChallenge | null) => void;
}

export const useMathChallengeStore = create<MathChallengeState>()(
  devtools(
    (set) => ({
      challenge: null,
      setChallenge: (challenge) =>
        set({ challenge }, false, 'mathChallenge/setChallenge'),
    }),
    { name: 'MathChallengeStore' },
  ),
);
