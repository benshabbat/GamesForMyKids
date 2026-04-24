export type AnimalCategory = 'farm' | 'wild' | 'sea' | 'birds' | 'insects';

export interface Animal {
  id: string;
  hebrew: string;
  emoji: string;
  sound?: string;
  category: AnimalCategory;
  fact: string;
}

export const ANIMALS: Animal[] = [
  // Farm
  { id: 'cow',     hebrew: 'פרה',     emoji: '🐄', category: 'farm',    fact: 'הפרה נותנת לנו חלב!' },
  { id: 'horse',   hebrew: 'סוס',     emoji: '🐎', category: 'farm',    fact: 'הסוס הוא חיה מהירה מאוד!' },
  { id: 'sheep',   hebrew: 'כבשה',    emoji: '🐑', category: 'farm',    fact: 'הכבשה נותנת לנו צמר!' },
  { id: 'chicken', hebrew: 'תרנגולת', emoji: '🐔', category: 'farm',    fact: 'התרנגולת מטילה ביצים!' },
  { id: 'pig',     hebrew: 'חזיר',    emoji: '🐷', category: 'farm',    fact: 'החזיר מאוד נקי בתוך הבית!' },
  { id: 'goat',    hebrew: 'עז',      emoji: '🐐', category: 'farm',    fact: 'העז נותנת חלב ממנו עושים גבינה!' },
  // Wild
  { id: 'lion',    hebrew: 'אריה',    emoji: '🦁', category: 'wild',    fact: 'האריה הוא מלך החיות!' },
  { id: 'elephant',hebrew: 'פיל',     emoji: '🐘', category: 'wild',    fact: 'הפיל הוא החיה הגדולה ביותר ביבשה!' },
  { id: 'giraffe', hebrew: 'ג\'ירפה', emoji: '🦒', category: 'wild',    fact: 'לג\'ירפה יש הצוואר הארוך ביותר!' },
  { id: 'monkey',  hebrew: 'קוף',     emoji: '🐒', category: 'wild',    fact: 'הקוף הוא החיה החכמה ביותר אחרי האדם!' },
  { id: 'zebra',   hebrew: 'זברה',    emoji: '🦓', category: 'wild',    fact: 'לכל זברה יש פסים ייחודיים משלה!' },
  { id: 'tiger',   hebrew: 'נמר',     emoji: '🐅', category: 'wild',    fact: 'הנמר הוא שחיין מצוין!' },
  // Sea
  { id: 'fish',    hebrew: 'דג',      emoji: '🐟', category: 'sea',     fact: 'יש יותר מ-30,000 סוגי דגים!' },
  { id: 'dolphin', hebrew: 'דולפין',  emoji: '🐬', category: 'sea',     fact: 'הדולפין הוא אחד החיות החכמות!' },
  { id: 'octopus', hebrew: 'תמנון',   emoji: '🐙', category: 'sea',     fact: 'לתמנון יש שמונה זרועות!' },
  { id: 'crab',    hebrew: 'סרטן',    emoji: '🦀', category: 'sea',     fact: 'הסרטן הולך הצידה!' },
  { id: 'shark',   hebrew: 'כריש',    emoji: '🦈', category: 'sea',     fact: 'לכריש יש שיניים חדות מאוד!' },
  { id: 'whale',   hebrew: 'לוויתן',  emoji: '🐳', category: 'sea',     fact: 'הלוויתן הוא החיה הגדולה בעולם!' },
  // Birds
  { id: 'eagle',   hebrew: 'נשר',     emoji: '🦅', category: 'birds',   fact: 'הנשר רואה מרחק של 3 קילומטרים!' },
  { id: 'owl',     hebrew: 'ינשוף',   emoji: '🦉', category: 'birds',   fact: 'הינשוף ציד בלילה!' },
  { id: 'parrot',  hebrew: 'תוכי',    emoji: '🦜', category: 'birds',   fact: 'התוכי יכול לחקות קולות אדם!' },
  { id: 'penguin', hebrew: 'פינגווין',emoji: '🐧', category: 'birds',   fact: 'הפינגווין לא יכול לעוף אבל שוחה מעולה!' },
  // Insects
  { id: 'butterfly',hebrew: 'פרפר',   emoji: '🦋', category: 'insects', fact: 'הפרפר מתחיל חייו כזחל!' },
  { id: 'bee',     hebrew: 'דבורה',   emoji: '🐝', category: 'insects', fact: 'הדבורה מייצרת דבש!' },
  { id: 'ant',     hebrew: 'נמלה',    emoji: '🐜', category: 'insects', fact: 'הנמלה יכולה לשאת 50 פעמים ממשקלה!' },
  { id: 'ladybug', hebrew: 'פרת משה רבנו', emoji: '🐞', category: 'insects', fact: 'הנקודות על גבה מספרות את גילה!' },
];

export const CATEGORY_ORDER: (AnimalCategory | 'all')[] = ['all', 'farm', 'wild', 'sea', 'birds', 'insects'];

export const CATEGORY_DISPLAY: Record<AnimalCategory | 'all', string> = {
  all: '🌍 הכל',
  farm: '🐄 חוות',
  wild: '🦁 בר',
  sea: '🐬 ים',
  birds: '🦅 ציפורים',
  insects: '🐛 חרקים',
};
