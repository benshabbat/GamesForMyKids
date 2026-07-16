export type Puzzle = {
  question: string;
  answer: string;
  wrongOptions: [string, string, string];
  digit: string;
  successMessage: string;
};

export type Hotspot = {
  id: string;
  emoji: string;
  label: string;
  x: number; // % from left
  y: number; // % from top
  puzzle: Puzzle | null;
  funMessage: string | null;
};

export type Room = {
  id: string;
  title: string;
  emoji: string;
  bg: string; // tailwind bg class
  hotspots: Hotspot[];
};

export const ROOMS: Room[] = [
  {
    id: 'bedroom',
    title: 'חדר השינה',
    emoji: '🛏️',
    bg: 'from-blue-100 to-indigo-200',
    hotspots: [
      {
        id: 'bookshelf',
        emoji: '📚',
        label: 'ספרייה',
        x: 12, y: 25,
        puzzle: {
          question: 'מָה הַהֶפֶךְ שֶׁל "קָצָר"?',
          answer: 'ארוך',
          wrongOptions: ['גדול', 'רחב', 'חזק'],
          digit: '7',
          successMessage: 'כל הכבוד! הספרייה נפתחה — ספרה ראשונה: 7',
        },
        funMessage: null,
      },
      {
        id: 'clock',
        emoji: '🕐',
        label: 'שעון',
        x: 48, y: 12,
        puzzle: {
          question: 'כַּמָּה זֶה 6 + 4?',
          answer: '10',
          wrongOptions: ['8', '12', '9'],
          digit: '4',
          successMessage: 'מצוין! השעון מראה — ספרה שנייה: 4',
        },
        funMessage: null,
      },
      {
        id: 'window',
        emoji: '🪟',
        label: 'חלון',
        x: 78, y: 20,
        puzzle: {
          question: 'מָה חַי בַּמַּיִם וְיֵשׁ לוֹ קַשְׂקַשִּׂים?',
          answer: 'דג',
          wrongOptions: ['כלב', 'ציפור', 'פרה'],
          digit: '2',
          successMessage: 'נכון! מבעד לחלון רואים — ספרה שלישית: 2',
        },
        funMessage: null,
      },
      {
        id: 'wardrobe',
        emoji: '🚪',
        label: 'ארון',
        x: 88, y: 55,
        puzzle: {
          question: 'כַּמָּה יָמִים יֵשׁ בְּשָׁבוּעַ?',
          answer: '7',
          wrongOptions: ['5', '6', '8'],
          digit: '9',
          successMessage: 'יפה מאוד! בארון מוסתרת — ספרה רביעית: 9',
        },
        funMessage: null,
      },
      {
        id: 'bed',
        emoji: '🛏️',
        label: 'מיטה',
        x: 35, y: 68,
        puzzle: null,
        funMessage: 'זְמַן לִישׁוֹן? לֹא עַכְשָׁיו — יֵשׁ חֶדֶר לִפְרֹץ!',
      },
      {
        id: 'doll',
        emoji: '🪆',
        label: 'בובה',
        x: 60, y: 72,
        puzzle: null,
        funMessage: 'הַבּוּבָּה מְחַיֶּיכֶת וְאוֹמֶרֶת: "אַתָּה תַּצְלִיחַ!"',
      },
      {
        id: 'lamp',
        emoji: '🪔',
        label: 'מנורה',
        x: 10, y: 58,
        puzzle: null,
        funMessage: 'אוֹי — הַנֵּר דּוֹלֵק! אַל תִּכָּווֶה.',
      },
      {
        id: 'rug',
        emoji: '🎽',
        label: 'שטיח',
        x: 50, y: 85,
        puzzle: null,
        funMessage: 'שָׁטִיחַ רַךְ וְנָעִים מִתַּחַת לָרַגְלַיִם.',
      },
    ],
  },
  {
    id: 'classroom',
    title: 'הכיתה',
    emoji: '🏫',
    bg: 'from-green-100 to-emerald-200',
    hotspots: [
      {
        id: 'blackboard',
        emoji: '🖊️',
        label: 'לוח',
        x: 45, y: 10,
        puzzle: {
          question: 'מָה הַהֶפֶךְ שֶׁל "גָּדוֹל"?',
          answer: 'קטן',
          wrongOptions: ['שמח', 'מהיר', 'ארוך'],
          digit: '3',
          successMessage: 'מצוין! על הלוח כתוב — ספרה ראשונה: 3',
        },
        funMessage: null,
      },
      {
        id: 'teacher-desk',
        emoji: '🪑',
        label: 'שולחן מורה',
        x: 15, y: 60,
        puzzle: {
          question: 'כַּמָּה זֶה 8 - 3?',
          answer: '5',
          wrongOptions: ['4', '6', '3'],
          digit: '8',
          successMessage: 'כל הכבוד! במגירה הוסתר — ספרה שנייה: 8',
        },
        funMessage: null,
      },
      {
        id: 'map',
        emoji: '🗺️',
        label: 'מפה',
        x: 82, y: 25,
        puzzle: {
          question: 'מָה בִּירַת מְדִינַת יִשְׂרָאֵל?',
          answer: 'ירושלים',
          wrongOptions: ['תל-אביב', 'חיפה', 'באר-שבע'],
          digit: '1',
          successMessage: 'נכון! על המפה מסומנת — ספרה שלישית: 1',
        },
        funMessage: null,
      },
      {
        id: 'bookcase',
        emoji: '📖',
        label: 'ספריית כיתה',
        x: 82, y: 70,
        puzzle: {
          question: 'כַּמָּה חֳדָשִׁים יֵשׁ בְּשָׁנָה?',
          answer: '12',
          wrongOptions: ['10', '11', '13'],
          digit: '6',
          successMessage: 'יפה! בספר החבוי — ספרה רביעית: 6',
        },
        funMessage: null,
      },
      {
        id: 'globe',
        emoji: '🌍',
        label: 'גלובוס',
        x: 65, y: 18,
        puzzle: null,
        funMessage: 'הָעוֹלָם גָּדוֹל וּמְרַתֵּק! יֵשׁ בּוֹ יוֹתֵר מ-190 מְדִינוֹת.',
      },
      {
        id: 'backpack',
        emoji: '🎒',
        label: 'תיק תלמיד',
        x: 30, y: 80,
        puzzle: null,
        funMessage: 'תִּיק כָּבֵד... כַּנִּרְאֶה הַרְבֵּה שִׁעוּרֵי בַּיִת בִּפְנִים.',
      },
      {
        id: 'pencil',
        emoji: '✏️',
        label: 'עיפרון',
        x: 60, y: 75,
        puzzle: null,
        funMessage: 'עִפָּרוֹן חַד וּמוּכָן לִכְתִיבָה!',
      },
      {
        id: 'window-class',
        emoji: '🪟',
        label: 'חלון כיתה',
        x: 10, y: 22,
        puzzle: null,
        funMessage: 'מִבַּחוּץ נִשְׁמָע קוֹל צִפֳּרִים. אֵיזֶה יוֹם יָפֶה!',
      },
    ],
  },
];
