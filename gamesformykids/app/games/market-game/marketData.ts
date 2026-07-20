import type { MarketItem } from './marketStore';

export const ITEMS_FOR_SHELF: MarketItem[] = [
  { id: 'apple',      name: 'תפוח',      emoji: '🍎' },
  { id: 'banana',     name: 'בננה',      emoji: '🍌' },
  { id: 'orange',     name: 'תפוז',      emoji: '🍊' },
  { id: 'grape',      name: 'ענב',       emoji: '🍇' },
  { id: 'carrot',     name: 'גזר',       emoji: '🥕' },
  { id: 'tomato',     name: 'עגבנייה',   emoji: '🍅' },
  { id: 'lemon',      name: 'לימון',     emoji: '🍋' },
  { id: 'watermelon', name: 'אבטיח',     emoji: '🍉' },
];

export function numberWord(n: number): string {
  const words: Record<number, string> = {
    1: 'אחד', 2: 'שניים', 3: 'שלושה', 4: 'ארבעה', 5: 'חמישה',
    6: 'שישה', 7: 'שבעה', 8: 'שמונה', 9: 'תשעה', 10: 'עשרה',
    11: 'אחד עשר', 12: 'שניים עשר', 13: 'שלושה עשר', 14: 'ארבעה עשר',
    15: 'חמישה עשר', 16: 'שישה עשר', 17: 'שבעה עשר', 18: 'שמונה עשר',
    19: 'תשעה עשר', 20: 'עשרים',
  };
  return words[n] ?? String(n);
}
