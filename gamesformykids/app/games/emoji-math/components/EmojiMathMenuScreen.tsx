import { createDifficultyMenuScreen } from '@/components/game/shared/createDifficultyMenuScreen';
import { useEmojiMathGame } from '../useEmojiMathGame';

const LIVES_BY_DIFF = { easy: 5, medium: 3, hard: 2 } as const;
const TIME_BY_DIFF  = { easy: 12, medium: 8, hard: 5 } as const;

export default createDifficultyMenuScreen(
  {
    emoji: '🧮',
    title: "מתמטיקה עם אמוג'י",
    description: "ספור את האמוג'י ופתור את התרגיל!",
    hintFn: (d) => `${LIVES_BY_DIFF[d]} חיים · ${TIME_BY_DIFF[d]} שניות · רצף מנצח = +20 נקודות`,
    gradientClass: 'from-yellow-100 to-orange-200',
    buttonClass: 'from-yellow-400 to-orange-500',
    startLabel: '🧮 התחל!',
  },
  useEmojiMathGame,
);
