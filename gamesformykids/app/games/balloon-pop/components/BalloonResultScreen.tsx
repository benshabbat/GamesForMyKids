'use client';
import { createScoreBestResultScreen } from '@/components/game/shared/createScoreBestResultScreen';
import { useBalloonPopGame } from '../useBalloonPopGame';

export default createScoreBestResultScreen(
  {
    emoji: '🎉',
    title: 'הזמן נגמר!',
    gradientClass: 'from-sky-200 to-blue-400',
    buttonClass: 'from-pink-500 to-rose-500',
    scoreBgClass: 'bg-pink-50',
    scoreTextClass: 'text-pink-500',
    scoreLabelClass: 'text-pink-400',
    restartLabel: '🔄 שוב!',
    shareTextFn: (score) => `🎈 קיבלתי ${score} נקודות בפוצץ בלונים!`,
  },
  useBalloonPopGame,
  (state) => ({
    emoji: state.lives <= 0 ? '💔' : '🎉',
    title: state.lives <= 0 ? 'נגמרו החיים!' : 'הזמן נגמר!',
  }),
);
