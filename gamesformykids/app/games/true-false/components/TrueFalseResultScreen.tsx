import { createScoreBestResultScreen } from '@/components/game/shared/createScoreBestResultScreen';
import { useTrueFalseGame } from '../useTrueFalseGame';

export default createScoreBestResultScreen(
  {
    emoji: '🧠',
    title: 'כל הכבוד על הניסיון!',
    gradientClass: 'from-teal-100 to-cyan-200',
    buttonClass: 'from-teal-500 to-cyan-600',
    scoreBgClass: 'bg-teal-50',
    scoreTextClass: 'text-teal-600',
    scoreLabelClass: 'text-teal-400',
    restartLabel: '🔄 שוב!',
    shareTextFn: (score) => `🧠 קיבלתי ${score} נקודות בנכון או שקר!`,
  },
  useTrueFalseGame,
);
