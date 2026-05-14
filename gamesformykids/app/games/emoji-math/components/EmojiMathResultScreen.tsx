import { createScoreBestResultScreen } from '@/components/game/shared/createScoreBestResultScreen';
import { useEmojiMathGame } from '../useEmojiMathGame';

export default createScoreBestResultScreen(
  {
    emoji: '🤓',
    title: 'כל הכבוד על המאמץ!',
    gradientClass: 'from-yellow-100 to-orange-200',
    buttonClass: 'from-yellow-400 to-orange-500',
    scoreBgClass: 'bg-orange-50',
    scoreTextClass: 'text-orange-600',
    scoreLabelClass: 'text-orange-400',
    restartLabel: '🔄 שוב!',
    shareTextFn: (score) => `🤓 קיבלתי ${score} נקודות באימוג'י מתמטיקה!`,
  },
  useEmojiMathGame,
);
