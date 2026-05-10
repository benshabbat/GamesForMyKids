import { createGameMenuScreen } from '@/components/game/shared/createGameMenuScreen';
import { useWhackAMoleGame } from '../useWhackAMoleGame';

export default createGameMenuScreen(
  {
    emoji: '🐹',
    title: 'חבט על החפרפרת!',
    description: 'הקש על החפרפרות לפני שהן נעלמות · הימנע מהפצצות 💣',
    gradientClass: 'from-yellow-50 to-amber-100',
    buttonClass: 'from-amber-500 to-orange-500',
    startLabel: '🔨 התחל!',
    animateEmoji: true,
  },
  useWhackAMoleGame,
);
