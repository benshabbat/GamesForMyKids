import { useMathChallengeStore } from '@/lib/stores/mathChallengeStore';
import { useGameSessionStore } from '@/lib/stores/gameSessionStore';
import {
  OPERATION_SYMBOLS,
  type MathChallengeBoxViewModel,
} from './mathChallengeBoxConstants';

const EMPTY_VM: MathChallengeBoxViewModel = {
  show: false,
  operand1: 0,
  operand2: 0,
  emoji: '',
  isAddition: true,
  opSymbol: OPERATION_SYMBOLS['+'],
};

export function useMathChallengeBox(): MathChallengeBoxViewModel {
  const challenge       = useMathChallengeStore((s) => s.challenge);
  const showCelebration = useGameSessionStore((s) => s.showCelebration);

  if (!challenge || showCelebration) return EMPTY_VM;

  const { operand1, operand2, operator, emoji } = challenge;

  return {
    show: true,
    operand1,
    operand2,
    emoji,
    isAddition: operator === '+',
    opSymbol:   OPERATION_SYMBOLS[operator],
  };
}
