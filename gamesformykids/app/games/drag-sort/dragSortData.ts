export type DragCategory = {
  id: string;
  label: string;
  emoji: string;
  bg: string;
  border: string;
  text: string;
};

export type DragItem = {
  id: string;
  label: string;
  emoji: string;
  categoryId: string;
};

export type DragLevel = {
  id: string;
  title: string;
  categories: DragCategory[];
  items: DragItem[];
};

export const DRAG_LEVELS: DragLevel[] = [
  {
    id: 'basics',
    title: 'בסיסי — פירות / ירקות / חיות / תחבורה',
    categories: [
      { id: 'fruits',   label: 'פירות',       emoji: '🍎', bg: 'bg-red-50',    border: 'border-red-400',    text: 'text-red-700'    },
      { id: 'veggies',  label: 'ירקות',       emoji: '🥕', bg: 'bg-green-50',  border: 'border-green-400',  text: 'text-green-700'  },
      { id: 'animals',  label: 'בעלי חיים',   emoji: '🐕', bg: 'bg-amber-50',  border: 'border-amber-400',  text: 'text-amber-700'  },
      { id: 'vehicles', label: 'תחבורה',      emoji: '🚗', bg: 'bg-blue-50',   border: 'border-blue-400',   text: 'text-blue-700'   },
    ],
    items: [
      { id: 'apple',    label: 'תפוח',     emoji: '🍎', categoryId: 'fruits'   },
      { id: 'banana',   label: 'בננה',     emoji: '🍌', categoryId: 'fruits'   },
      { id: 'grape',    label: 'ענבים',    emoji: '🍇', categoryId: 'fruits'   },
      { id: 'carrot',   label: 'גזר',      emoji: '🥕', categoryId: 'veggies'  },
      { id: 'cucumber', label: 'מלפפון',   emoji: '🥒', categoryId: 'veggies'  },
      { id: 'tomato',   label: 'עגבנייה',  emoji: '🍅', categoryId: 'veggies'  },
      { id: 'dog',      label: 'כלב',      emoji: '🐕', categoryId: 'animals'  },
      { id: 'cat',      label: 'חתול',     emoji: '🐱', categoryId: 'animals'  },
      { id: 'rabbit',   label: 'ארנב',     emoji: '🐰', categoryId: 'animals'  },
      { id: 'car',      label: 'מכונית',   emoji: '🚗', categoryId: 'vehicles' },
      { id: 'bus',      label: 'אוטובוס',  emoji: '🚌', categoryId: 'vehicles' },
      { id: 'bike',     label: 'אופניים',  emoji: '🚲', categoryId: 'vehicles' },
    ],
  },
  {
    id: 'habitat',
    title: 'בית גר — ים / יבשה / אוויר',
    categories: [
      { id: 'sea',  label: 'ים',    emoji: '🌊', bg: 'bg-blue-50',  border: 'border-blue-400',  text: 'text-blue-700'  },
      { id: 'land', label: 'יבשה', emoji: '🌿', bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700' },
      { id: 'sky',  label: 'אוויר', emoji: '☁️', bg: 'bg-sky-50',   border: 'border-sky-400',   text: 'text-sky-700'   },
    ],
    items: [
      { id: 'shark',    label: 'כריש',    emoji: '🦈', categoryId: 'sea'  },
      { id: 'dolphin',  label: 'דולפין',  emoji: '🐬', categoryId: 'sea'  },
      { id: 'turtle',   label: 'צב ים',   emoji: '🐢', categoryId: 'sea'  },
      { id: 'fish',     label: 'דג',      emoji: '🐟', categoryId: 'sea'  },
      { id: 'lion',     label: 'אריה',    emoji: '🦁', categoryId: 'land' },
      { id: 'elephant', label: 'פיל',     emoji: '🐘', categoryId: 'land' },
      { id: 'giraffe',  label: 'ג׳ירפה',  emoji: '🦒', categoryId: 'land' },
      { id: 'zebra',    label: 'זברה',    emoji: '🦓', categoryId: 'land' },
      { id: 'eagle',    label: 'נשר',     emoji: '🦅', categoryId: 'sky'  },
      { id: 'parrot',   label: 'תוכי',    emoji: '🦜', categoryId: 'sky'  },
      { id: 'owl',      label: 'ינשוף',   emoji: '🦉', categoryId: 'sky'  },
      { id: 'duck',     label: 'ברווז',   emoji: '🦆', categoryId: 'sky'  },
    ],
  },
  {
    id: 'clothes-food-tools',
    title: 'אוכל / לבוש / כלים',
    categories: [
      { id: 'food',    label: 'אוכל', emoji: '🍕', bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-700' },
      { id: 'clothes', label: 'לבוש', emoji: '👕', bg: 'bg-pink-50',   border: 'border-pink-400',   text: 'text-pink-700'   },
      { id: 'tools',   label: 'כלים', emoji: '🔨', bg: 'bg-gray-100',  border: 'border-gray-400',   text: 'text-gray-700'   },
    ],
    items: [
      { id: 'bread',    label: 'לחם',      emoji: '🍞', categoryId: 'food'    },
      { id: 'pizza',    label: 'פיצה',     emoji: '🍕', categoryId: 'food'    },
      { id: 'rice',     label: 'אורז',     emoji: '🍚', categoryId: 'food'    },
      { id: 'egg',      label: 'ביצה',     emoji: '🥚', categoryId: 'food'    },
      { id: 'shirt',    label: 'חולצה',    emoji: '👕', categoryId: 'clothes' },
      { id: 'pants',    label: 'מכנסיים',  emoji: '👖', categoryId: 'clothes' },
      { id: 'shoe',     label: 'נעל',      emoji: '👟', categoryId: 'clothes' },
      { id: 'hat',      label: 'כובע',     emoji: '🎩', categoryId: 'clothes' },
      { id: 'hammer',   label: 'פטיש',     emoji: '🔨', categoryId: 'tools'   },
      { id: 'wrench',   label: 'מברג',     emoji: '🔧', categoryId: 'tools'   },
      { id: 'key',      label: 'מפתח',     emoji: '🔑', categoryId: 'tools'   },
      { id: 'scissors', label: 'מספריים',  emoji: '✂️', categoryId: 'tools'   },
    ],
  },
  {
    id: 'transport-medium',
    title: 'תחבורה — כביש / ים / אוויר',
    categories: [
      { id: 'road', label: 'כביש',  emoji: '🛣️', bg: 'bg-gray-100',  border: 'border-gray-400',  text: 'text-gray-700'  },
      { id: 'sea2', label: 'ים',    emoji: '🌊', bg: 'bg-blue-50',   border: 'border-blue-400',  text: 'text-blue-700'  },
      { id: 'air',  label: 'אוויר', emoji: '✈️', bg: 'bg-sky-50',    border: 'border-sky-400',   text: 'text-sky-700'   },
    ],
    items: [
      { id: 'car2',    label: 'מכונית',  emoji: '🚗', categoryId: 'road' },
      { id: 'bus2',    label: 'אוטובוס', emoji: '🚌', categoryId: 'road' },
      { id: 'train',   label: 'רכבת',    emoji: '🚂', categoryId: 'road' },
      { id: 'truck',   label: 'משאית',   emoji: '🚚', categoryId: 'road' },
      { id: 'ship',    label: 'ספינה',   emoji: '🚢', categoryId: 'sea2' },
      { id: 'boat',    label: 'סירה',    emoji: '⛵', categoryId: 'sea2' },
      { id: 'ferry',   label: 'מעבורת',  emoji: '🛥️', categoryId: 'sea2' },
      { id: 'sub',     label: 'צוללת',   emoji: '🤿', categoryId: 'sea2' },
      { id: 'plane',   label: 'מטוס',    emoji: '✈️', categoryId: 'air'  },
      { id: 'heli',    label: 'מסוק',    emoji: '🚁', categoryId: 'air'  },
      { id: 'balloon', label: 'בלון',    emoji: '🎈', categoryId: 'air'  },
      { id: 'rocket',  label: 'רקטה',    emoji: '🚀', categoryId: 'air'  },
    ],
  },
  {
    id: 'sport-music-art',
    title: 'ספורט / מוזיקה / אומנות',
    categories: [
      { id: 'sport', label: 'ספורט',  emoji: '⚽', bg: 'bg-green-50',  border: 'border-green-400',  text: 'text-green-700'  },
      { id: 'music', label: 'מוזיקה', emoji: '🎵', bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-700' },
      { id: 'art',   label: 'אומנות', emoji: '🎨', bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-700' },
    ],
    items: [
      { id: 'soccer',   label: 'כדורגל',  emoji: '⚽', categoryId: 'sport' },
      { id: 'basket',   label: 'כדורסל',  emoji: '🏀', categoryId: 'sport' },
      { id: 'tennis',   label: 'טניס',    emoji: '🎾', categoryId: 'sport' },
      { id: 'swim',     label: 'שחייה',   emoji: '🏊', categoryId: 'sport' },
      { id: 'guitar',   label: 'גיטרה',   emoji: '🎸', categoryId: 'music' },
      { id: 'piano',    label: 'פסנתר',   emoji: '🎹', categoryId: 'music' },
      { id: 'trumpet',  label: 'חצוצרה',  emoji: '🎺', categoryId: 'music' },
      { id: 'drum',     label: 'תופים',   emoji: '🥁', categoryId: 'music' },
      { id: 'brush',    label: 'מברשת',   emoji: '🖌️', categoryId: 'art'   },
      { id: 'pencil',   label: 'עיפרון',  emoji: '✏️', categoryId: 'art'   },
      { id: 'palette',  label: 'פלטה',    emoji: '🎨', categoryId: 'art'   },
      { id: 'camera',   label: 'מצלמה',   emoji: '📷', categoryId: 'art'   },
    ],
  },
  {
    id: 'wild-pet-insect',
    title: 'חיות בית / חיות בר / חרקים',
    categories: [
      { id: 'pet',    label: 'חיות בית', emoji: '🐾', bg: 'bg-amber-50',  border: 'border-amber-400',  text: 'text-amber-700'  },
      { id: 'wild',   label: 'חיות בר',  emoji: '🌿', bg: 'bg-green-50',  border: 'border-green-400',  text: 'text-green-700'  },
      { id: 'insect', label: 'חרקים',    emoji: '🦋', bg: 'bg-lime-50',   border: 'border-lime-400',   text: 'text-lime-700'   },
    ],
    items: [
      { id: 'dog2',      label: 'כלב',      emoji: '🐕', categoryId: 'pet'    },
      { id: 'cat2',      label: 'חתול',     emoji: '🐱', categoryId: 'pet'    },
      { id: 'rabbit2',   label: 'ארנב',     emoji: '🐰', categoryId: 'pet'    },
      { id: 'hamster',   label: 'אוגר',     emoji: '🐹', categoryId: 'pet'    },
      { id: 'lion2',     label: 'אריה',     emoji: '🦁', categoryId: 'wild'   },
      { id: 'bear',      label: 'דוב',      emoji: '🐻', categoryId: 'wild'   },
      { id: 'wolf',      label: 'זאב',      emoji: '🐺', categoryId: 'wild'   },
      { id: 'fox',       label: 'שועל',     emoji: '🦊', categoryId: 'wild'   },
      { id: 'butterfly', label: 'פרפר',     emoji: '🦋', categoryId: 'insect' },
      { id: 'ant',       label: 'נמלה',     emoji: '🐜', categoryId: 'insect' },
      { id: 'bee',       label: 'דבורה',    emoji: '🐝', categoryId: 'insect' },
      { id: 'ladybug',   label: 'פרת משה',  emoji: '🐞', categoryId: 'insect' },
    ],
  },
];
