import { createGameMenuScreen } from '@/components/game/shared/createGameMenuScreen';
import { useBalloonPopGame } from '../useBalloonPopGame';

export default createGameMenuScreen(
  {
    emoji: '🎈',
    title: 'פוצץ בלונים!',
    description: 'הקש על בלונים לפני שהם עפים · הימנע מפצצות 💣',
    gradientClass: 'from-sky-200 to-blue-400',
    buttonClass: 'from-pink-500 to-rose-500',
    startLabel: '🎈 התחל!',
  },
  useBalloonPopGame,
);
