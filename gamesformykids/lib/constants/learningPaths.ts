import type { GameType } from '@/lib/types/core/base';

export interface LearningPath {
  id: string;
  title: string;
  emoji: string;
  description: string;
  gameIds: GameType[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'letters-week',
    title: 'שבוע האותיות',
    emoji: '🔤',
    description: 'מסע מודרך להכרת האותיות העבריות — מזיהוי ועד קריאה',
    gameIds: ['letters', 'hebrew-letters', 'letter-trace', 'alphabet-order', 'final-letters'],
  },
  {
    id: 'numbers-week',
    title: 'שבוע המספרים',
    emoji: '🔢',
    description: 'מספירה בסיסית ועד תרגילי חשבון ראשונים',
    gameIds: ['numbers', 'counting', 'math', 'arithmetic', 'sequences'],
  },
  {
    id: 'nature-week',
    title: 'שבוע הטבע',
    emoji: '🌿',
    description: 'הכירו בעלי חיים, פירות וירקות ויצורי הים',
    gameIds: ['animals', 'fruits', 'vegetables', 'ocean-life', 'dinosaurs'],
  },
  {
    id: 'time-week',
    title: 'שבוע הזמן',
    emoji: '🗓️',
    description: 'שעון, ימות השבוע, חודשי השנה ועונות',
    gameIds: ['time-clock', 'days-of-week', 'months-of-year', 'seasons-holidays'],
  },
  {
    id: 'colors-shapes-week',
    title: 'שבוע הצבעים והצורות',
    emoji: '🎨',
    description: 'זיהוי צבעים, צורות דו-ממדיות ותלת-ממדיות',
    gameIds: ['colors', 'shapes', 'colored-shapes', 'advanced-colors', 'shapes-3d'],
  },
];

export function getLearningPath(pathId: string): LearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.id === pathId);
}
