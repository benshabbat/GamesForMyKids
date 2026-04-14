import { useMathChallengeStore } from '@/lib/stores/mathChallengeStore';
import { useGameSessionStore } from '@/lib/stores/gameSessionStore';
import {
  OPERATION_SYMBOLS,
  type MathChallengeBoxViewModel,
} from './mathChallengeBoxConstants';

const EMPTY_VM: MathChallengeBoxViewModel = {
  show: false,
  firstNumber: 0,
  secondNumber: 0,
  emoji: '',
  isAddition: true,
  opSymbol: OPERATION_SYMBOLS.addition,
};

export function useMathChallengeBox(): MathChallengeBoxViewModel {
  const challenge       = useMathChallengeStore((s) => s.challenge);
  const showCelebration = useGameSessionStore((s) => s.showCelebration);

  if (!challenge || showCelebration) return EMPTY_VM;

  const { firstNumber, secondNumber, operation, emoji } = challenge;

  return {
    show: true,
    firstNumber,
    secondNumber,
    emoji,
    isAddition: operation === 'addition',
    opSymbol:   OPERATION_SYMBOLS[operation],
  };
}
