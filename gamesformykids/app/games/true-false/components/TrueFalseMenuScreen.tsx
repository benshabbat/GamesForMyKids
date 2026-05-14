import { createDifficultyMenuScreen } from '@/components/game/shared/createDifficultyMenuScreen';
import { useTrueFalseGame } from '../useTrueFalseGame';

const LIVES_BY_DIFF = { easy: 5, medium: 3, hard: 2 } as const;
const TIME_BY_DIFF  = { easy: 10, medium: 6, hard: 4 } as const;

export default createDifficultyMenuScreen(
  {
    emoji: '🤔',
    title: 'נכון או לא נכון?',
    description: 'קרא את המשפט ולחץ ✅ או ❌',
    hintFn: (d) => `${LIVES_BY_DIFF[d]} חיים · ${TIME_BY_DIFF[d]} שניות לכל שאלה`,
    gradientClass: 'from-teal-100 to-cyan-200',
    buttonClass: 'from-teal-500 to-cyan-600',
    startLabel: '✅ התחל!',
  },
  useTrueFalseGame,
);
