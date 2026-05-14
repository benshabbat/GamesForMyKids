import { createScoreBestResultScreen } from '@/components/game/shared/createScoreBestResultScreen';
import { useWhackAMoleGame } from '../useWhackAMoleGame';

export default createScoreBestResultScreen(
  {
    emoji: '🔨',
    title: 'הזמן נגמר!',
    gradientClass: 'from-yellow-50 to-amber-100',
    buttonClass: 'from-amber-500 to-orange-500',
    scoreBgClass: 'bg-amber-50',
    scoreTextClass: 'text-amber-600',
    scoreLabelClass: 'text-amber-400',
    shareTextFn: (score) => `🔨 קיבלתי ${score} נקודות בהכאת עכברוש!`,
  },
  useWhackAMoleGame,
);
