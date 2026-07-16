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
      { id: 'saucepan',       emoji: '🍲', label: 'סִיר',          category: 'כלי בישול',  x: 18, y: 30 },
      { id: 'pan',            emoji: '🥘', label: 'מַחֲבַת',         category: 'כלי בישול',  x: 38, y: 38 },
      { id: 'ladle',          emoji: '🥄', label: 'כַּף',           category: 'כלי בישול',  x: 58, y: 42 },
      { id: 'cutting-board',  emoji: '🪵', label: 'קֶרֶשׁ חִתּוּךְ',   category: 'כלי בישול',  x: 15, y: 52 },
      { id: 'apple',          emoji: '🍎', label: 'תַּפּוּחַ',         category: 'פירות',      x: 72, y: 22 },
      { id: 'banana',         emoji: '🍌', label: 'בָּנָנָה',         category: 'פירות',      x: 82, y: 38 },
      { id: 'grapes',         emoji: '🍇', label: 'עֲנָבִים',        category: 'פירות',      x: 62, y: 18 },
      { id: 'strawberry',     emoji: '🍓', label: 'תּוּת',          category: 'פירות',      x: 48, y: 18 },
      { id: 'carrot',         emoji: '🥕', label: 'גֶּזֶר',          category: 'ירקות',      x: 78, y: 52 },
      { id: 'tomato',         emoji: '🍅', label: 'עַגְבָנִיָּה',      category: 'ירקות',      x: 68, y: 45 },
      { id: 'cucumber',       emoji: '🥒', label: 'מְלָפְפוֹן',       category: 'ירקות',      x: 88, y: 60 },
      { id: 'onion',          emoji: '🧅', label: 'בָּצָל',          category: 'ירקות',      x: 25, y: 18 },
      { id: 'bread',          emoji: '🍞', label: 'לֶחֶם',          category: 'מזון',       x: 52, y: 25 },
      { id: 'egg',            emoji: '🥚', label: 'בֵּיצָה',         category: 'מזון',       x: 35, y: 22 },
      { id: 'cheese',         emoji: '🧀', label: 'גְּבִינָה',        category: 'מזון',       x: 42, y: 30 },
      { id: 'milk',           emoji: '🥛', label: 'חָלָב',          category: 'מזון',       x: 15, y: 22 },
      { id: 'cup',            emoji: '☕', label: 'כּוֹס',          category: 'כלי שתייה',  x: 65, y: 68 },
      { id: 'kettle',         emoji: '🫖', label: 'קוּמְקוּם',       category: 'כלי שתייה',  x: 75, y: 60 },
      { id: 'jug',            emoji: '🧃', label: 'מִיץ',          category: 'כלי שתייה',  x: 85, y: 70 },
      { id: 'bottle',         emoji: '🍶', label: 'בַּקְבּוּק',        category: 'כלי שתייה',  x: 55, y: 68 },
      { id: 'fork',           emoji: '🍴', label: 'מַזְלֵג',         category: 'כלי אכילה',  x: 45, y: 75 },
      { id: 'knife',          emoji: '🔪', label: 'סַכִּין',         category: 'כלי אכילה',  x: 32, y: 75 },
    ],
    prompts: [
      { text: 'מְצָא 4 כְּלֵי בִּשּׁוּל', category: 'כלי בישול', count: 4 },
      { text: 'מְצָא 4 פֵּירוֹת', category: 'פירות', count: 4 },
      { text: 'מְצָא 4 יְרָקוֹת', category: 'ירקות', count: 4 },
    ],
  },
  {
    id: 'market',
    title: 'השוק',
    emoji: '🏪',
    bg: 'from-green-100 to-emerald-100',
    objects: [
      { id: 'm-apple',     emoji: '🍎', label: 'תַּפּוּחַ',      category: 'פירות',    x: 12, y: 25 },
      { id: 'm-banana',    emoji: '🍌', label: 'בָּנָנָה',      category: 'פירות',    x: 22, y: 30 },
      { id: 'm-grapes',    emoji: '🍇', label: 'עֲנָבִים',     category: 'פירות',    x: 8,  y: 40 },
      { id: 'm-orange',    emoji: '🍊', label: 'תַּפּוּז',      category: 'פירות',    x: 18, y: 45 },
      { id: 'm-watermelon',emoji: '🍉', label: 'אֲבַטִּיחַ',     category: 'פירות',    x: 28, y: 20 },
      { id: 'm-carrot',    emoji: '🥕', label: 'גֶּזֶר',       category: 'ירקות',    x: 45, y: 28 },
      { id: 'm-tomato',    emoji: '🍅', label: 'עַגְבָנִיָּה',   category: 'ירקות',    x: 55, y: 32 },
      { id: 'm-cucumber',  emoji: '🥒', label: 'מְלָפְפוֹן',    category: 'ירקות',    x: 40, y: 40 },
      { id: 'm-lettuce',   emoji: '🥬', label: 'חַסָּה',       category: 'ירקות',    x: 50, y: 22 },
      { id: 'm-pepper',    emoji: '🫑', label: 'פִּלְפֵּל',      category: 'ירקות',    x: 62, y: 25 },
      { id: 'm-bread',     emoji: '🍞', label: 'לֶחֶם',       category: 'מאפים',   x: 70, y: 22 },
      { id: 'm-cake',      emoji: '🎂', label: 'עוּגָה',      category: 'מאפים',   x: 80, y: 28 },
      { id: 'm-cookie',    emoji: '🍪', label: 'עוּגִיָּה',    category: 'מאפים',   x: 88, y: 22 },
      { id: 'm-pretzel',   emoji: '🥨', label: 'בֵּייגֶל',     category: 'מאפים',   x: 75, y: 38 },
      { id: 'm-fish',      emoji: '🐟', label: 'דָּג',        category: 'בעלי חיים', x: 15, y: 60 },
      { id: 'm-chicken',   emoji: '🐔', label: 'עוֹף',       category: 'בעלי חיים', x: 30, y: 65 },
      { id: 'm-cat',       emoji: '🐱', label: 'חָתוּל',      category: 'בעלי חיים', x: 45, y: 68 },
      { id: 'm-dog',       emoji: '🐶', label: 'כֶּלֶב',       category: 'בעלי חיים', x: 60, y: 65 },
      { id: 'm-bag',       emoji: '👜', label: 'תִּיק',       category: 'חפצים',   x: 72, y: 55 },
      { id: 'm-scale',     emoji: '⚖️', label: 'מֹאזְנַיִם',   category: 'חפצים',   x: 82, y: 55 },
      { id: 'm-money',     emoji: '💰', label: 'כֶּסֶף',       category: 'חפצים',   x: 88, y: 65 },
      { id: 'm-basket',    emoji: '🧺', label: 'סַל',        category: 'חפצים',   x: 25, y: 78 },
    ],
    prompts: [
      { text: 'מְצָא 5 פֵּירוֹת', category: 'פירות', count: 5 },
      { text: 'מְצָא 5 יְרָקוֹת', category: 'ירקות', count: 5 },
      { text: 'מְצָא 4 מַאֲפִים', category: 'מאפים', count: 4 },
    ],
  },
  {
    id: 'playground',
    title: 'הגן',
    emoji: '🛝',
    bg: 'from-sky-100 to-blue-100',
    objects: [
      { id: 'p-ball',     emoji: '⚽', label: 'כַּדּוּר',       category: 'משחקים',    x: 20, y: 30 },
      { id: 'p-hoop',     emoji: '⭕', label: 'חִשּׁוּק',      category: 'משחקים',    x: 38, y: 25 },
      { id: 'p-rope',     emoji: '🪢', label: 'חֶבֶל קְפִיצָה',  category: 'משחקים',    x: 55, y: 35 },
      { id: 'p-kite',     emoji: '🪁', label: 'עֲפִיפוֹן',     category: 'משחקים',    x: 72, y: 20 },
      { id: 'p-toy',      emoji: '🧸', label: 'דֻּבִּי',       category: 'משחקים',    x: 85, y: 30 },
      { id: 'p-bike',     emoji: '🚲', label: 'אוֹפַנַּיִם',    category: 'משחקים',    x: 15, y: 55 },
      { id: 'p-tree',     emoji: '🌳', label: 'עֵץ',         category: 'טבע',       x: 8,  y: 20 },
      { id: 'p-flower',   emoji: '🌸', label: 'פֶּרַח',        category: 'טבע',       x: 30, y: 68 },
      { id: 'p-grass',    emoji: '🌿', label: 'דֶּשֶׁא',        category: 'טבע',       x: 45, y: 72 },
      { id: 'p-sun',      emoji: '☀️', label: 'שֶׁמֶשׁ',        category: 'טבע',       x: 88, y: 12 },
      { id: 'p-cloud',    emoji: '☁️', label: 'עָנָן',        category: 'טבע',       x: 65, y: 10 },
      { id: 'p-bush',     emoji: '🌵', label: 'שִׂיחַ',        category: 'טבע',       x: 60, y: 65 },
      { id: 'p-bird',     emoji: '🐦', label: 'צִפּוֹר',      category: 'בעלי חיים', x: 50, y: 12 },
      { id: 'p-dog',      emoji: '🐕', label: 'כֶּלֶב',        category: 'בעלי חיים', x: 28, y: 75 },
      { id: 'p-cat',      emoji: '🐈', label: 'חָתוּל',       category: 'בעלי חיים', x: 42, y: 60 },
      { id: 'p-butterfly',emoji: '🦋', label: 'פַּרְפַּר',       category: 'בעלי חיים', x: 72, y: 45 },
      { id: 'p-bench',    emoji: '🪑', label: 'סַפְסָל',       category: 'ריהוט',    x: 80, y: 55 },
      { id: 'p-swing',    emoji: '🏗️', label: 'נַדְנֵדָה',      category: 'ריהוט',    x: 35, y: 45 },
      { id: 'p-sandbox',  emoji: '🏖️', label: 'אַרְגַּז חוֹל',  category: 'ריהוט',    x: 65, y: 72 },
      { id: 'p-fountain', emoji: '⛲', label: 'מִזְרָקָה',      category: 'ריהוט',    x: 18, y: 42 },
      { id: 'p-ice-cream',emoji: '🍦', label: 'גְּלִידָה',      category: 'אוכל',     x: 88, y: 68 },
      { id: 'p-snack',    emoji: '🧆', label: 'חָטִיף',       category: 'אוכל',     x: 78, y: 75 },
    ],
    prompts: [
      { text: 'מְצָא 5 מִשְׂחָקִים', category: 'משחקים', count: 5 },
      { text: 'מְצָא 4 בַּעֲלֵי חַיִּים', category: 'בעלי חיים', count: 4 },
      { text: 'מְצָא 5 דִּבְרֵי טֶבַע', category: 'טבע', count: 5 },
    ],
  },
];
