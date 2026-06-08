export type LifeCycleStage = {
  emoji: string;
  label: string;
};

export type LifeCycleQuestion = {
  id: number;
  name: string;
  stages: [LifeCycleStage, LifeCycleStage, LifeCycleStage, LifeCycleStage];
};

export const LIFE_CYCLE_QUESTIONS: LifeCycleQuestion[] = [
  {
    id: 1,
    name: 'פרפר',
    stages: [
      { emoji: '🥚', label: 'ביצה' },
      { emoji: '🐛', label: 'זחל' },
      { emoji: '🫘', label: 'גולם' },
      { emoji: '🦋', label: 'פרפר' },
    ],
  },
  {
    id: 2,
    name: 'צפרדע',
    stages: [
      { emoji: '🥚', label: 'ביצה' },
      { emoji: '🐟', label: 'ראשן' },
      { emoji: '🦎', label: 'צפרדעון' },
      { emoji: '🐸', label: 'צפרדע' },
    ],
  },
  {
    id: 3,
    name: 'צמח',
    stages: [
      { emoji: '🌰', label: 'זרע' },
      { emoji: '🌱', label: 'נבט' },
      { emoji: '🌿', label: 'שתיל' },
      { emoji: '🌸', label: 'פרח' },
    ],
  },
  {
    id: 4,
    name: 'תרנגולת',
    stages: [
      { emoji: '🥚', label: 'ביצה' },
      { emoji: '🐣', label: 'פצחון' },
      { emoji: '🐤', label: 'אפרוח' },
      { emoji: '🐔', label: 'תרנגולת' },
    ],
  },
  {
    id: 5,
    name: 'עץ תפוח',
    stages: [
      { emoji: '🌱', label: 'זרע' },
      { emoji: '🌳', label: 'עץ צעיר' },
      { emoji: '🍏', label: 'פרי ירוק' },
      { emoji: '🍎', label: 'תפוח בשל' },
    ],
  },
  {
    id: 6,
    name: 'דבורה',
    stages: [
      { emoji: '🥚', label: 'ביצה' },
      { emoji: '🐛', label: 'זחל' },
      { emoji: '🫘', label: 'גולם' },
      { emoji: '🐝', label: 'דבורה' },
    ],
  },
  {
    id: 7,
    name: 'דג',
    stages: [
      { emoji: '🥚', label: 'ביצה' },
      { emoji: '🐡', label: 'גור דגים' },
      { emoji: '🐠', label: 'דג צעיר' },
      { emoji: '🐟', label: 'דג בוגר' },
    ],
  },
  {
    id: 8,
    name: 'חמנייה',
    stages: [
      { emoji: '🌰', label: 'גרעין' },
      { emoji: '🌱', label: 'נבט' },
      { emoji: '🌿', label: 'שתיל' },
      { emoji: '🌻', label: 'חמנייה' },
    ],
  },
  {
    id: 9,
    name: 'פרת משה רבנו',
    stages: [
      { emoji: '🥚', label: 'ביצה' },
      { emoji: '🐛', label: 'זחל' },
      { emoji: '🫘', label: 'גולם' },
      { emoji: '🐞', label: 'פרת משה רבנו' },
    ],
  },
  {
    id: 10,
    name: 'עגבנייה',
    stages: [
      { emoji: '🌱', label: 'זרע' },
      { emoji: '🌿', label: 'שתיל' },
      { emoji: '🌼', label: 'פרח' },
      { emoji: '🍅', label: 'עגבנייה' },
    ],
  },
];
