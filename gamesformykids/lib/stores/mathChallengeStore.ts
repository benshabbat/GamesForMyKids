/**
 * mathChallengeStore — stores the current MathChallenge for visual rendering.
 * Written by useMathGame; read by MathChallengeBox.
 */
import type { MathChallenge } from '@/lib/types';
import { createChallengeStore } from './utils/createChallengeStore';

export const useMathChallengeStore = createChallengeStore<MathChallenge>('mathChallenge');
