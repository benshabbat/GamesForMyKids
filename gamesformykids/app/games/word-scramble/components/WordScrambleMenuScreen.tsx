import { createGameMenuScreen } from '@/components/game/shared/createGameMenuScreen';
import { useWordScrambleGame } from '../useWordScrambleGame';

export default createGameMenuScreen(
  {
    emoji: '🔡',
    title: 'מילים מבולבלות',
    description: 'לחצו על האותיות בסדר הנכון כדי לכתוב את המילה!',
    gradientClass: 'from-green-100 to-emerald-200',
    buttonClass: 'from-green-500 to-emerald-600',
    startLabel: '🔡 התחל!',
  },
  useWordScrambleGame,
);
