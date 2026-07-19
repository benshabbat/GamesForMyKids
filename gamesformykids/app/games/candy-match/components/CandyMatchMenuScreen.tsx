import { createGameMenuScreen } from '@/components/game/shared/createGameMenuScreen';
import { useCandyMatch } from '../useCandyMatch';

export default createGameMenuScreen(
  {
    emoji: '🍬',
    title: 'התאמת ממתקים',
    description: 'החליפו בין שני ממתקים סמוכים כדי ליצור שלושה זהים ברצף - ותהנו מהניקוד שמתפוצץ!',
    gradientClass: 'from-pink-100 to-purple-200',
    buttonClass: 'from-pink-500 to-fuchsia-600',
    startLabel: '🍭 בואו נתחיל!',
    hint: '20 מהלכים - כמה ניקוד תצליחו לצבור?',
    animateEmoji: true,
  },
  useCandyMatch,
);
