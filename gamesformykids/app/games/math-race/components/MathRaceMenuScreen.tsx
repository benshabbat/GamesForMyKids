import { createDifficultyMenuScreen } from '@/components/game/shared/createDifficultyMenuScreen';
import { useMathRaceGame } from '../useMathRaceGame';

const TIME_BY_DIFF = { easy: 45, medium: 30, hard: 20 } as const;

export default createDifficultyMenuScreen(
  {
    emoji: '🏎️',
    title: 'מרוץ מתמטיקה',
    description: 'פתור כמה שיותר תרגילים!',
    hintFn: (d) => `${TIME_BY_DIFF[d]} שניות · רצף 3+ = 20 נקודות · הקושי עולה עם הניקוד`,
    gradientClass: 'from-blue-100 to-indigo-200',
    buttonClass: 'from-blue-500 to-indigo-600',
    startLabel: '🏎️ התחל!',
  },
  useMathRaceGame,
);
