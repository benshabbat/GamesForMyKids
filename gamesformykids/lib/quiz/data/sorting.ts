export interface SortingItem {
  name: string;
  emoji: string;
}

export interface SortingCategory {
  name: string;
  emoji: string;
  items: SortingItem[];
}

export interface SortingSet {
  id: string;
  categoryA: SortingCategory;
  categoryB: SortingCategory;
}

export const SORTING_SETS: SortingSet[] = [
  {
    id: 'animals-vs-furniture',
    categoryA: {
      name: 'חיות',
      emoji: '🐾',
      items: [
        { name: 'כלב', emoji: '🐕' },
        { name: 'חתול', emoji: '🐱' },
        { name: 'ציפור', emoji: '🐦' },
        { name: 'דג', emoji: '🐟' },
        { name: 'ארנב', emoji: '🐰' },
        { name: 'פרפר', emoji: '🦋' },
      ],
    },
    categoryB: {
      name: 'רהיטים',
      emoji: '🪑',
      items: [
        { name: 'שולחן', emoji: '🪑' },
        { name: 'כסא', emoji: '💺' },
        { name: 'מיטה', emoji: '🛏️' },
        { name: 'ארון', emoji: '🚪' },
        { name: 'ספה', emoji: '🛋️' },
        { name: 'מדף', emoji: '📚' },
      ],
    },
  },
  {
    id: 'food-vs-not-food',
    categoryA: {
      name: 'אוכל',
      emoji: '🍎',
      items: [
        { name: 'תפוח', emoji: '🍎' },
        { name: 'לחם', emoji: '🍞' },
        { name: 'גזר', emoji: '🥕' },
        { name: 'ביצה', emoji: '🥚' },
        { name: 'בננה', emoji: '🍌' },
        { name: 'גבינה', emoji: '🧀' },
      ],
    },
    categoryB: {
      name: 'לא אוכל',
      emoji: '🚫',
      items: [
        { name: 'ספר', emoji: '📚' },
        { name: 'כדור', emoji: '⚽' },
        { name: 'נעל', emoji: '👟' },
        { name: 'עיפרון', emoji: '✏️' },
        { name: 'מפתח', emoji: '🔑' },
        { name: 'שעון', emoji: '⏰' },
      ],
    },
  },
  {
    id: 'sky-vs-sea',
    categoryA: {
      name: 'שמיים',
      emoji: '☁️',
      items: [
        { name: 'ציפור', emoji: '🐦' },
        { name: 'ענן', emoji: '☁️' },
        { name: 'מטוס', emoji: '✈️' },
        { name: 'כוכב', emoji: '⭐' },
        { name: 'ירח', emoji: '🌙' },
        { name: 'שמש', emoji: '☀️' },
      ],
    },
    categoryB: {
      name: 'ים',
      emoji: '🌊',
      items: [
        { name: 'דג', emoji: '🐟' },
        { name: 'תמנון', emoji: '🐙' },
        { name: 'סירה', emoji: '⛵' },
        { name: 'לוויתן', emoji: '🐳' },
        { name: 'קרש גלישה', emoji: '🏄' },
        { name: 'צב ים', emoji: '🐢' },
      ],
    },
  },
  {
    id: 'clothing-vs-tools',
    categoryA: {
      name: 'בגדים',
      emoji: '👕',
      items: [
        { name: 'חולצה', emoji: '👕' },
        { name: 'מכנסיים', emoji: '👖' },
        { name: 'נעל', emoji: '👟' },
        { name: 'כובע', emoji: '🎩' },
        { name: 'גרב', emoji: '🧦' },
        { name: 'שמלה', emoji: '👗' },
      ],
    },
    categoryB: {
      name: 'כלים',
      emoji: '🔧',
      items: [
        { name: 'פטיש', emoji: '🔨' },
        { name: 'מסמר', emoji: '📌' },
        { name: 'מפתח ברגים', emoji: '🔧' },
        { name: 'מסור', emoji: '🪚' },
        { name: 'מברג', emoji: '🪛' },
        { name: 'משקל', emoji: '⚖️' },
      ],
    },
  },
  {
    id: 'sports-vs-music',
    categoryA: {
      name: 'ספורט',
      emoji: '⚽',
      items: [
        { name: 'כדורגל', emoji: '⚽' },
        { name: 'כדורסל', emoji: '🏀' },
        { name: 'טניס', emoji: '🎾' },
        { name: 'שחייה', emoji: '🏊' },
        { name: 'אופניים', emoji: '🚴' },
        { name: 'קפיצה', emoji: '🏃' },
      ],
    },
    categoryB: {
      name: 'מוזיקה',
      emoji: '🎵',
      items: [
        { name: 'גיטרה', emoji: '🎸' },
        { name: 'תוף', emoji: '🥁' },
        { name: 'חליל', emoji: '🎷' },
        { name: 'פסנתר', emoji: '🎹' },
        { name: 'כינור', emoji: '🎻' },
        { name: 'מיקרופון', emoji: '🎤' },
      ],
    },
  },
];

export interface SortingQuestion {
  item: SortingItem;
  itemCategory: 'A' | 'B';
  categoryA: Pick<SortingCategory, 'name' | 'emoji'>;
  categoryB: Pick<SortingCategory, 'name' | 'emoji'>;
}

export function buildSortingQuestions(count: number): SortingQuestion[] {
  const set = SORTING_SETS[Math.floor(Math.random() * SORTING_SETS.length)]!;
  const allItems: SortingQuestion[] = [
    ...set.categoryA.items.map(item => ({ item, itemCategory: 'A' as const, categoryA: set.categoryA, categoryB: set.categoryB })),
    ...set.categoryB.items.map(item => ({ item, itemCategory: 'B' as const, categoryA: set.categoryA, categoryB: set.categoryB })),
  ];
  return allItems.sort(() => Math.random() - 0.5).slice(0, count);
}
