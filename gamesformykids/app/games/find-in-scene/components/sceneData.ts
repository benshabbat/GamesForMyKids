export type SceneObject = {
  id: string;
  emoji: string;
  label: string;
  category: string;
  x: number; // % from left
  y: number; // % from top
};

export type ScenePrompt = {
  text: string;
  category: string;
  count: number;
};

export type Scene = {
  id: string;
  title: string;
  emoji: string;
  bg: string;
  objects: SceneObject[];
  prompts: ScenePrompt[];
};

export const SCENES: Scene[] = [
  {
    id: 'kitchen',
    title: 'המטבח',
    emoji: '🍳',
    bg: 'from-orange-100 to-yellow-100',
    objects: [
      { id: 'saucepan',       emoji: '🍲', label: 'סיר',          category: 'כלי בישול',  x: 18, y: 30 },
      { id: 'pan',            emoji: '🥘', label: 'מחבת',         category: 'כלי בישול',  x: 38, y: 38 },
      { id: 'ladle',          emoji: '🥄', label: 'כף',           category: 'כלי בישול',  x: 58, y: 42 },
      { id: 'cutting-board',  emoji: '🪵', label: 'קרש חיתוך',   category: 'כלי בישול',  x: 15, y: 52 },
      { id: 'apple',          emoji: '🍎', label: 'תפוח',         category: 'פירות',      x: 72, y: 22 },
      { id: 'banana',         emoji: '🍌', label: 'בננה',         category: 'פירות',      x: 82, y: 38 },
      { id: 'grapes',         emoji: '🍇', label: 'ענבים',        category: 'פירות',      x: 62, y: 18 },
      { id: 'strawberry',     emoji: '🍓', label: 'תות',          category: 'פירות',      x: 48, y: 18 },
      { id: 'carrot',         emoji: '🥕', label: 'גזר',          category: 'ירקות',      x: 78, y: 52 },
      { id: 'tomato',         emoji: '🍅', label: 'עגבנייה',      category: 'ירקות',      x: 68, y: 45 },
      { id: 'cucumber',       emoji: '🥒', label: 'מלפפון',       category: 'ירקות',      x: 88, y: 60 },
      { id: 'onion',          emoji: '🧅', label: 'בצל',          category: 'ירקות',      x: 25, y: 18 },
      { id: 'bread',          emoji: '🍞', label: 'לחם',          category: 'מזון',       x: 52, y: 25 },
      { id: 'egg',            emoji: '🥚', label: 'ביצה',         category: 'מזון',       x: 35, y: 22 },
      { id: 'cheese',         emoji: '🧀', label: 'גבינה',        category: 'מזון',       x: 42, y: 30 },
      { id: 'milk',           emoji: '🥛', label: 'חלב',          category: 'מזון',       x: 15, y: 22 },
      { id: 'cup',            emoji: '☕', label: 'כוס',          category: 'כלי שתייה',  x: 65, y: 68 },
      { id: 'kettle',         emoji: '🫖', label: 'קומקום',       category: 'כלי שתייה',  x: 75, y: 60 },
      { id: 'jug',            emoji: '🧃', label: 'מיץ',          category: 'כלי שתייה',  x: 85, y: 70 },
      { id: 'bottle',         emoji: '🍶', label: 'בקבוק',        category: 'כלי שתייה',  x: 55, y: 68 },
      { id: 'fork',           emoji: '🍴', label: 'מזלג',         category: 'כלי אכילה',  x: 45, y: 75 },
      { id: 'knife',          emoji: '🔪', label: 'סכין',         category: 'כלי אכילה',  x: 32, y: 75 },
    ],
    prompts: [
      { text: 'מצא 4 כלי בישול', category: 'כלי בישול', count: 4 },
      { text: 'מצא 4 פירות', category: 'פירות', count: 4 },
      { text: 'מצא 4 ירקות', category: 'ירקות', count: 4 },
    ],
  },
  {
    id: 'market',
    title: 'השוק',
    emoji: '🏪',
    bg: 'from-green-100 to-emerald-100',
    objects: [
      { id: 'm-apple',     emoji: '🍎', label: 'תפוח',      category: 'פירות',    x: 12, y: 25 },
      { id: 'm-banana',    emoji: '🍌', label: 'בננה',      category: 'פירות',    x: 22, y: 30 },
      { id: 'm-grapes',    emoji: '🍇', label: 'ענבים',     category: 'פירות',    x: 8,  y: 40 },
      { id: 'm-orange',    emoji: '🍊', label: 'תפוז',      category: 'פירות',    x: 18, y: 45 },
      { id: 'm-watermelon',emoji: '🍉', label: 'אבטיח',     category: 'פירות',    x: 28, y: 20 },
      { id: 'm-carrot',    emoji: '🥕', label: 'גזר',       category: 'ירקות',    x: 45, y: 28 },
      { id: 'm-tomato',    emoji: '🍅', label: 'עגבנייה',   category: 'ירקות',    x: 55, y: 32 },
      { id: 'm-cucumber',  emoji: '🥒', label: 'מלפפון',    category: 'ירקות',    x: 40, y: 40 },
      { id: 'm-lettuce',   emoji: '🥬', label: 'חסה',       category: 'ירקות',    x: 50, y: 22 },
      { id: 'm-pepper',    emoji: '🫑', label: 'פלפל',      category: 'ירקות',    x: 62, y: 25 },
      { id: 'm-bread',     emoji: '🍞', label: 'לחם',       category: 'מאפים',   x: 70, y: 22 },
      { id: 'm-cake',      emoji: '🎂', label: 'עוגה',      category: 'מאפים',   x: 80, y: 28 },
      { id: 'm-cookie',    emoji: '🍪', label: 'עוגייה',    category: 'מאפים',   x: 88, y: 22 },
      { id: 'm-pretzel',   emoji: '🥨', label: 'בייגל',     category: 'מאפים',   x: 75, y: 38 },
      { id: 'm-fish',      emoji: '🐟', label: 'דג',        category: 'בעלי חיים', x: 15, y: 60 },
      { id: 'm-chicken',   emoji: '🐔', label: 'עוף',       category: 'בעלי חיים', x: 30, y: 65 },
      { id: 'm-cat',       emoji: '🐱', label: 'חתול',      category: 'בעלי חיים', x: 45, y: 68 },
      { id: 'm-dog',       emoji: '🐶', label: 'כלב',       category: 'בעלי חיים', x: 60, y: 65 },
      { id: 'm-bag',       emoji: '👜', label: 'תיק',       category: 'חפצים',   x: 72, y: 55 },
      { id: 'm-scale',     emoji: '⚖️', label: 'מאזניים',   category: 'חפצים',   x: 82, y: 55 },
      { id: 'm-money',     emoji: '💰', label: 'כסף',       category: 'חפצים',   x: 88, y: 65 },
      { id: 'm-basket',    emoji: '🧺', label: 'סל',        category: 'חפצים',   x: 25, y: 78 },
    ],
    prompts: [
      { text: 'מצא 5 פירות', category: 'פירות', count: 5 },
      { text: 'מצא 5 ירקות', category: 'ירקות', count: 5 },
      { text: 'מצא 4 מאפים', category: 'מאפים', count: 4 },
    ],
  },
  {
    id: 'playground',
    title: 'הגן',
    emoji: '🛝',
    bg: 'from-sky-100 to-blue-100',
    objects: [
      { id: 'p-ball',     emoji: '⚽', label: 'כדור',       category: 'משחקים',    x: 20, y: 30 },
      { id: 'p-hoop',     emoji: '⭕', label: 'חישוק',      category: 'משחקים',    x: 38, y: 25 },
      { id: 'p-rope',     emoji: '🪢', label: 'חבל קפיצה',  category: 'משחקים',    x: 55, y: 35 },
      { id: 'p-kite',     emoji: '🪁', label: 'עפיפון',     category: 'משחקים',    x: 72, y: 20 },
      { id: 'p-toy',      emoji: '🧸', label: 'דובי',       category: 'משחקים',    x: 85, y: 30 },
      { id: 'p-bike',     emoji: '🚲', label: 'אופניים',    category: 'משחקים',    x: 15, y: 55 },
      { id: 'p-tree',     emoji: '🌳', label: 'עץ',         category: 'טבע',       x: 8,  y: 20 },
      { id: 'p-flower',   emoji: '🌸', label: 'פרח',        category: 'טבע',       x: 30, y: 68 },
      { id: 'p-grass',    emoji: '🌿', label: 'דשא',        category: 'טבע',       x: 45, y: 72 },
      { id: 'p-sun',      emoji: '☀️', label: 'שמש',        category: 'טבע',       x: 88, y: 12 },
      { id: 'p-cloud',    emoji: '☁️', label: 'ענן',        category: 'טבע',       x: 65, y: 10 },
      { id: 'p-bush',     emoji: '🌵', label: 'שיח',        category: 'טבע',       x: 60, y: 65 },
      { id: 'p-bird',     emoji: '🐦', label: 'ציפור',      category: 'בעלי חיים', x: 50, y: 12 },
      { id: 'p-dog',      emoji: '🐕', label: 'כלב',        category: 'בעלי חיים', x: 28, y: 75 },
      { id: 'p-cat',      emoji: '🐈', label: 'חתול',       category: 'בעלי חיים', x: 42, y: 60 },
      { id: 'p-butterfly',emoji: '🦋', label: 'פרפר',       category: 'בעלי חיים', x: 72, y: 45 },
      { id: 'p-bench',    emoji: '🪑', label: 'ספסל',       category: 'ריהוט',    x: 80, y: 55 },
      { id: 'p-swing',    emoji: '🏗️', label: 'נדנדה',      category: 'ריהוט',    x: 35, y: 45 },
      { id: 'p-sandbox',  emoji: '🏖️', label: 'ארגז חול',  category: 'ריהוט',    x: 65, y: 72 },
      { id: 'p-fountain', emoji: '⛲', label: 'מזרקה',      category: 'ריהוט',    x: 18, y: 42 },
      { id: 'p-ice-cream',emoji: '🍦', label: 'גלידה',      category: 'אוכל',     x: 88, y: 68 },
      { id: 'p-snack',    emoji: '🧆', label: 'חטיף',       category: 'אוכל',     x: 78, y: 75 },
    ],
    prompts: [
      { text: 'מצא 5 משחקים', category: 'משחקים', count: 5 },
      { text: 'מצא 4 בעלי חיים', category: 'בעלי חיים', count: 4 },
      { text: 'מצא 5 דברי טבע', category: 'טבע', count: 5 },
    ],
  },
];
