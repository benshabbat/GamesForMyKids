/**
 * countingChallengeStore — stores the current CountingChallenge for visual rendering.
 * Written by useCountingGame; read by CountingChallengeBox.
 */
import type { CountingChallenge } from '@/lib/types';
import { createChallengeStore } from './utils/createChallengeStore';

export const useCountingChallengeStore = createChallengeStore<CountingChallenge>('countingChallenge');
