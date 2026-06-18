import { createDifficultyMenuScreen } from '@/components/game/shared/createDifficultyMenuScreen';
import { useLetterRaceGame } from '../useLetterRaceGame';

const TIME_BY_DIFF = { easy: 45, medium: 30, hard: 20 } as const;

export default createDifficultyMenuScreen(
  {
    emoji: '🔤',
    title: 'מרוץ אותיות',
    description: 'ראה תמונה — בחר את האות הראשונה!',
    hintFn: (d) => `${TIME_BY_DIFF[d]} שניות · רצף 3+ = 20 נקודות · תראה תמונה ובחר את האות`,
    gradientClass: 'from-violet-100 to-purple-200',
    buttonClass: 'from-violet-500 to-purple-600',
    startLabel: '🔤 התחל!',
  },
  useLetterRaceGame,
);
