import { createDifficultyMenuScreen } from '@/components/game/shared/createDifficultyMenuScreen';
import { useColorTapGame } from '../useColorTapGame';

const LIVES_BY_DIFF = { easy: 5, medium: 3, hard: 2 } as const;
const TIME_BY_DIFF  = { easy: 8, medium: 5, hard: 3 } as const;

export default createDifficultyMenuScreen(
  {
    emoji: '🎨',
    title: 'צבע נכון',
    description: 'בחר את הצבע הנכון לפני שהזמן נגמר!',
    hintFn: (d) => `${LIVES_BY_DIFF[d]} חיים · ${TIME_BY_DIFF[d]} שניות לכל שאלה`,
    gradientClass: 'from-pink-100 to-purple-200',
    buttonClass: 'from-pink-500 to-purple-600',
    startLabel: '🎨 התחל!',
  },
  useColorTapGame,
);
