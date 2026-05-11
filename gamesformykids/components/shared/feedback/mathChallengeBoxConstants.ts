import type { MathChallenge } from '@/lib/types';

// ─── קבועים ───────────────────────────────────────────────────────────────────

export const MAX_EMOJI_VISIBLE = 10;

export const MATH_BOX_LABELS = {
  title: 'פתור את התרגיל',
  equalsQuestion: '= ?',
} as const;

export const OPERATION_SYMBOLS: Record<MathChallenge['operator'], string> = {
  '+': '➕',
  '-': '➖',
  '*': '✖️',
  '/': '➗',
};

// ─── טייפים ───────────────────────────────────────────────────────────────────

export interface EmojiRowProps {
  count: number;
  emoji: string;
  crossed?: boolean;
}

export interface MathChallengeBoxViewModel {
  show: boolean;
  operand1: number;
  operand2: number;
  emoji: string;
  isAddition: boolean;
  opSymbol: string;
}
