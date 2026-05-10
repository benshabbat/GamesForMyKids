import { createGameMenuScreen } from '@/components/game/shared/createGameMenuScreen';
import { useSimonGame } from '../useSimonGame';

export default createGameMenuScreen(
  {
    emoji: '🔴',
    title: 'שיימון אומר',
    description: 'צפה בסדר הצבעים וחזור עליהם בדיוק!',
    hint: 'כל סיבוב — עוד צבע אחד',
    gradientClass: 'from-gray-800 to-gray-900',
    buttonClass: 'from-gray-600 to-gray-800',
    startLabel: '🔴 התחל!',
  },
  useSimonGame,
);
