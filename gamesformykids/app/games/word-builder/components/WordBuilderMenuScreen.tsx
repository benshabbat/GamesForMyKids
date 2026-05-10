import { createGameMenuScreen } from '@/components/game/shared/createGameMenuScreen';
import { useWordBuilderGame } from '../useWordBuilderGame';

export default createGameMenuScreen(
  {
    emoji: '🔤',
    title: 'בניית מילים',
    description: 'סדר את האותיות ובנה את המילה הנכונה!',
    gradientClass: 'from-orange-50 to-amber-100',
    buttonClass: 'from-orange-500 to-amber-500',
    startLabel: '🚀 התחל!',
  },
  useWordBuilderGame,
);
