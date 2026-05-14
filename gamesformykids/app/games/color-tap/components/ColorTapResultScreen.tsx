import { createScoreBestResultScreen } from '@/components/game/shared/createScoreBestResultScreen';
import { useColorTapGame } from '../useColorTapGame';

export default createScoreBestResultScreen(
  {
    emoji: '😢',
    title: 'נגמרו החיים!',
    gradientClass: 'from-pink-100 to-purple-200',
    buttonClass: 'from-pink-500 to-purple-600',
    scoreBgClass: 'bg-pink-50',
    scoreTextClass: 'text-pink-600',
    scoreLabelClass: 'text-pink-400',
    restartLabel: '🔄 שוב!',
    shareTextFn: (score) => `🎨 קיבלתי ${score} נקודות בהקש צבע!`,
  },
  useColorTapGame,
);
