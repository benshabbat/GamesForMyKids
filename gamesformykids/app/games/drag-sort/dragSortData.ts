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
      { id: 'apple',    label: 'תַּפּוּחַ',     emoji: '🍎', categoryId: 'fruits'   },
      { id: 'banana',   label: 'בָּנָנָה',     emoji: '🍌', categoryId: 'fruits'   },
      { id: 'grape',    label: 'עֲנָבִים',    emoji: '🍇', categoryId: 'fruits'   },
      { id: 'carrot',   label: 'גֶּזֶר',      emoji: '🥕', categoryId: 'veggies'  },
      { id: 'cucumber', label: 'מְלָפְפוֹן',   emoji: '🥒', categoryId: 'veggies'  },
      { id: 'tomato',   label: 'עַגְבָנִיָּה',  emoji: '🍅', categoryId: 'veggies'  },
      { id: 'dog',      label: 'כֶּלֶב',      emoji: '🐕', categoryId: 'animals'  },
      { id: 'cat',      label: 'חָתוּל',     emoji: '🐱', categoryId: 'animals'  },
      { id: 'rabbit',   label: 'אַרְנָב',     emoji: '🐰', categoryId: 'animals'  },
      { id: 'car',      label: 'מְכוֹנִית',   emoji: '🚗', categoryId: 'vehicles' },
      { id: 'bus',      label: 'אוֹטוֹבּוּס',  emoji: '🚌', categoryId: 'vehicles' },
      { id: 'bike',     label: 'אוֹפַנַּיִם',  emoji: '🚲', categoryId: 'vehicles' },
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
      { id: 'shark',    label: 'כָּרִישׁ',    emoji: '🦈', categoryId: 'sea'  },
      { id: 'dolphin',  label: 'דּוֹלְפִין',  emoji: '🐬', categoryId: 'sea'  },
      { id: 'turtle',   label: 'צַב יָם',   emoji: '🐢', categoryId: 'sea'  },
      { id: 'fish',     label: 'דָּג',      emoji: '🐟', categoryId: 'sea'  },
      { id: 'lion',     label: 'אַרְיֵה',    emoji: '🦁', categoryId: 'land' },
      { id: 'elephant', label: 'פִּיל',     emoji: '🐘', categoryId: 'land' },
      { id: 'giraffe',  label: 'גִּ׳ירָפָה',  emoji: '🦒', categoryId: 'land' },
      { id: 'zebra',    label: 'זֶבְּרָה',    emoji: '🦓', categoryId: 'land' },
      { id: 'eagle',    label: 'נֶשֶׁר',     emoji: '🦅', categoryId: 'sky'  },
      { id: 'parrot',   label: 'תֻּכִּי',    emoji: '🦜', categoryId: 'sky'  },
      { id: 'owl',      label: 'יַנְשׁוּף',   emoji: '🦉', categoryId: 'sky'  },
      { id: 'duck',     label: 'בַּרְוָז',   emoji: '🦆', categoryId: 'sky'  },
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
      { id: 'bread',    label: 'לֶחֶם',      emoji: '🍞', categoryId: 'food'    },
      { id: 'pizza',    label: 'פִּיצָה',     emoji: '🍕', categoryId: 'food'    },
      { id: 'rice',     label: 'אוֹרֶז',     emoji: '🍚', categoryId: 'food'    },
      { id: 'egg',      label: 'בֵּיצָה',     emoji: '🥚', categoryId: 'food'    },
      { id: 'shirt',    label: 'חֻלְצָה',    emoji: '👕', categoryId: 'clothes' },
      { id: 'pants',    label: 'מִכְנָסַיִם',  emoji: '👖', categoryId: 'clothes' },
      { id: 'shoe',     label: 'נַעַל',      emoji: '👟', categoryId: 'clothes' },
      { id: 'hat',      label: 'כּוֹבַע',     emoji: '🎩', categoryId: 'clothes' },
      { id: 'hammer',   label: 'פַּטִּישׁ',     emoji: '🔨', categoryId: 'tools'   },
      { id: 'wrench',   label: 'מַבְרֵג',     emoji: '🔧', categoryId: 'tools'   },
      { id: 'key',      label: 'מַפְתֵּחַ',     emoji: '🔑', categoryId: 'tools'   },
      { id: 'scissors', label: 'מִסְפָּרַיִם',  emoji: '✂️', categoryId: 'tools'   },
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
      { id: 'car2',    label: 'מְכוֹנִית',  emoji: '🚗', categoryId: 'road' },
      { id: 'bus2',    label: 'אוֹטוֹבּוּס', emoji: '🚌', categoryId: 'road' },
      { id: 'train',   label: 'רַכֶּבֶת',    emoji: '🚂', categoryId: 'road' },
      { id: 'truck',   label: 'מַשָּׂאִית',   emoji: '🚚', categoryId: 'road' },
      { id: 'ship',    label: 'סְפִינָה',   emoji: '🚢', categoryId: 'sea2' },
      { id: 'boat',    label: 'סִירָה',    emoji: '⛵', categoryId: 'sea2' },
      { id: 'ferry',   label: 'מַעְבּוֹרֶת',  emoji: '🛥️', categoryId: 'sea2' },
      { id: 'sub',     label: 'צוֹלֶלֶת',   emoji: '🤿', categoryId: 'sea2' },
      { id: 'plane',   label: 'מָטוֹס',    emoji: '✈️', categoryId: 'air'  },
      { id: 'heli',    label: 'מַסּוֹק',    emoji: '🚁', categoryId: 'air'  },
      { id: 'balloon', label: 'בָּלוֹן',    emoji: '🎈', categoryId: 'air'  },
      { id: 'rocket',  label: 'רָקֶטָה',    emoji: '🚀', categoryId: 'air'  },
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
      { id: 'soccer',   label: 'כַּדּוּרֶגֶל',  emoji: '⚽', categoryId: 'sport' },
      { id: 'basket',   label: 'כַּדּוּרְסַל',  emoji: '🏀', categoryId: 'sport' },
      { id: 'tennis',   label: 'טֶנִיס',    emoji: '🎾', categoryId: 'sport' },
      { id: 'swim',     label: 'שְׂחִיָּה',   emoji: '🏊', categoryId: 'sport' },
      { id: 'guitar',   label: 'גִּיטָרָה',   emoji: '🎸', categoryId: 'music' },
      { id: 'piano',    label: 'פְּסַנְתֵּר',   emoji: '🎹', categoryId: 'music' },
      { id: 'trumpet',  label: 'חֲצוֹצְרָה',  emoji: '🎺', categoryId: 'music' },
      { id: 'drum',     label: 'תֻּפִּים',   emoji: '🥁', categoryId: 'music' },
      { id: 'brush',    label: 'מִבְרֶשֶׁת',   emoji: '🖌️', categoryId: 'art'   },
      { id: 'pencil',   label: 'עִפָּרוֹן',  emoji: '✏️', categoryId: 'art'   },
      { id: 'palette',  label: 'פָּלֶטָה',    emoji: '🎨', categoryId: 'art'   },
      { id: 'camera',   label: 'מַצְלֵמָה',   emoji: '📷', categoryId: 'art'   },
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
      { id: 'dog2',      label: 'כֶּלֶב',      emoji: '🐕', categoryId: 'pet'    },
      { id: 'cat2',      label: 'חָתוּל',     emoji: '🐱', categoryId: 'pet'    },
      { id: 'rabbit2',   label: 'אַרְנָב',     emoji: '🐰', categoryId: 'pet'    },
      { id: 'hamster',   label: 'אוֹגֵר',     emoji: '🐹', categoryId: 'pet'    },
      { id: 'lion2',     label: 'אַרְיֵה',     emoji: '🦁', categoryId: 'wild'   },
      { id: 'bear',      label: 'דֹּב',      emoji: '🐻', categoryId: 'wild'   },
      { id: 'wolf',      label: 'זְאֵב',      emoji: '🐺', categoryId: 'wild'   },
      { id: 'fox',       label: 'שׁוּעָל',     emoji: '🦊', categoryId: 'wild'   },
      { id: 'butterfly', label: 'פַּרְפַּר',     emoji: '🦋', categoryId: 'insect' },
      { id: 'ant',       label: 'נְמָלָה',     emoji: '🐜', categoryId: 'insect' },
      { id: 'bee',       label: 'דְּבוֹרָה',    emoji: '🐝', categoryId: 'insect' },
      { id: 'ladybug',   label: 'פָּרַת מֹשֶׁה',  emoji: '🐞', categoryId: 'insect' },
    ],
  },
];
