import { createScoreBestResultScreen } from '@/components/game/shared/createScoreBestResultScreen';
import { useCandyMatch } from '../useCandyMatch';

export default createScoreBestResultScreen(
  {
    emoji: '🎉',
    title: 'נגמרו המהלכים!',
    gradientClass: 'from-pink-100 to-purple-200',
    buttonClass: 'from-pink-500 to-fuchsia-600',
    scoreBgClass: 'bg-pink-50',
    scoreTextClass: 'text-pink-600',
    scoreLabelClass: 'text-pink-400',
    restartLabel: '🔄 עוד סיבוב!',
    shareTextFn: (score) => `🍬 קיבלתי ${score} נקודות במשחק התאמת הממתקים!`,
  },
  useCandyMatch,
);
