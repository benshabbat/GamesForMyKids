export interface Character {
  id: string;
  name: string;
  emoji: string;
}

export interface Setting {
  id: string;
  name: string;
  emoji: string;
}

export interface StoryQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
}

export interface StoryTemplate {
  id: string;
  theme: string;
  themeEmoji: string;
  panels: string[];
  panelEmojis: string[];
  questions: StoryQuestion[];
}

export const CHARACTERS: Character[] = [
  { id: 'rabbit',   name: 'ארנב',   emoji: '🐰' },
  { id: 'fox',      name: 'שועל',   emoji: '🦊' },
  { id: 'bear',     name: 'דוב',    emoji: '🐻' },
  { id: 'lion',     name: 'אריה',   emoji: '🦁' },
  { id: 'prince',   name: 'נסיך',   emoji: '🤴' },
  { id: 'princess', name: 'נסיכה',  emoji: '👸' },
  { id: 'fairy',    name: 'פיה',    emoji: '🧚' },
  { id: 'turtle',   name: 'צב',     emoji: '🐢' },
];

export const SETTINGS: Setting[] = [
  { id: 'forest',  name: 'ביער הקסום',       emoji: '🌲' },
  { id: 'castle',  name: 'בממלכה קסומה',     emoji: '🏰' },
  { id: 'sea',     name: 'ליד הים',           emoji: '🌊' },
];

// {c1} = char1.name, {c2} = char2.name, {e1} = char1.emoji, {e2} = char2.emoji, {st} = setting.name, {se} = setting.emoji
export const STORY_TEMPLATES: StoryTemplate[] = [
  {
    id: 'friendship',
    theme: 'ידידות',
    themeEmoji: '🤝',
    panels: [
      'פעם היה {c1} {e1} שגר {st} {se}.',
      'יום אחד פגש {c1} את {c2} {e2} שנראה עצוב מאוד.',
      '"מה קרה לך?" שאל {c1} בדאגה.',
      '{c2} השיב: "אבדתי את הדרך הביתה..."',
      '{c1} אמר: "אל תדאג! אני אעזור לך!"',
      'יחד הלכו {st} {se} וחיפשו את הבית של {c2}.',
      'סוף סוף מצאו אותו! {c2} אמר תודה גדולה.',
      'מאז הם נשארו ידידים טובים לכל החיים! 🌟',
    ],
    panelEmojis: ['🌳', '😢', '❓', '🏠', '🤝', '🔍', '🏡', '🌟'],
    questions: [
      {
        question: 'מי היה עצוב בהתחלה?',
        options: ['{c2}', '{c1}', 'שניהם', 'אף אחד'],
        correctIndex: 0,
      },
      {
        question: 'מה {c1} הציע לעשות?',
        options: ['לעזור למצוא את הדרך', 'לאכול יחד', 'לשחק משחק', 'ללכת לישון'],
        correctIndex: 0,
      },
      {
        question: 'מה קרה בסוף הסיפור?',
        options: ['הם נעשו ידידים', 'הם נפרדו', '{c1} הלך הביתה', 'הם ריבו'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'courage',
    theme: 'אומץ',
    themeEmoji: '💪',
    panels: [
      '{c1} {e1} גר {st} {se} ופחד מכל דבר חדש.',
      'יום אחד הגיע {c2} {e2} ואמר: "יש אוצר נסתר {st}!"',
      '{c1} רצה ללכת, אבל פחד מאוד...',
      'אבל {c1} לקח נשימה עמוקה ואמר: "אני אנסה!"',
      'בדרך נתקל {c1} במכשולים, אבל {c2} עזר.',
      '{c2} אמר: "אומץ לא אומר שאין פחד — אלא שהולכים בכל זאת!"',
      'יחד הגיעו לאוצר! {c1} שמח שהיה אמיץ.',
      '{c1} למד: גם כשמפחדים — כדאי לנסות! 💫',
    ],
    panelEmojis: ['😰', '💎', '😟', '💪', '🚧', '🌟', '🏆', '✨'],
    questions: [
      {
        question: 'מה {c1} פחד מבהתחלה?',
        options: ['מכל דבר חדש', 'מהחושך', 'מהמים', 'מהגובה'],
        correctIndex: 0,
      },
      {
        question: 'מה {c2} אמר על אומץ?',
        options: ['שהולכים למרות הפחד', 'שאין מה לפחד', 'שצריך לברוח', 'שהאוצר לא שווה'],
        correctIndex: 0,
      },
      {
        question: 'מה מצאו בסוף?',
        options: ['אוצר', 'ידיד חדש', 'בית', 'פרח'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'generosity',
    theme: 'נדיבות',
    themeEmoji: '🎁',
    panels: [
      '{c1} {e1} מצא {st} {se} ענבים מתוקים ויפים.',
      'רצה לאכול הכל לבד!',
      'אז הגיע {c2} {e2} ואמר: "אני כל כך רעב..."',
      '{c1} חשב: "אם אחלוק, יהיה לי פחות..."',
      'אבל {c1} זכר שידידים טובים מחלקים.',
      'הוא חילק את הענבים בשווה — חצי לכל אחד.',
      '{c2} אמר: "זה הדבר הטעים ביותר שאכלתי!"',
      '{c1} הרגיש שמח הרבה יותר ממה שהיה אוכל לבד! 💖',
    ],
    panelEmojis: ['🍇', '😋', '😔', '🤔', '💭', '🍇🍇', '😊', '💖'],
    questions: [
      {
        question: 'מה {c1} מצא?',
        options: ['ענבים', 'אוצר', 'פרחים', 'ספר'],
        correctIndex: 0,
      },
      {
        question: 'מה {c1} עשה בסוף?',
        options: ['חילק את הענבים', 'אכל לבד', 'הסתיר את הענבים', 'נתן הכל ל{c2}'],
        correctIndex: 0,
      },
      {
        question: 'איך {c1} הרגיש אחרי שחילק?',
        options: ['שמח מאוד', 'עצוב', 'כועס', 'עייף'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'honesty',
    theme: 'אמת',
    themeEmoji: '💎',
    panels: [
      '{c1} {e1} שיחק {st} {se} ושבר בטעות כד יפה.',
      'פחד מאוד ואמר: "לא אני עשיתי זאת!"',
      '{c2} {e2} ידע את האמת, אבל שתק ואמר מאומה.',
      '{c1} הרגיש רע כל הלילה ולא הצליח לישון.',
      'למחרת {c1} הלך אל {c2} ואמר: "סליחה, אני שברתי."',
      '{c2} אמר: "כל הכבוד שאמרת אמת! זה היה אמיץ!"',
      'יחד הם תיקנו את הכד.',
      '{c1} הבין: האמת, גם כשקשה — תמיד עדיפה! 🌟',
    ],
    panelEmojis: ['💔', '😱', '🤫', '😟', '🙏', '👏', '🔧', '🌟'],
    questions: [
      {
        question: 'מה {c1} שבר?',
        options: ['כד', 'חלון', 'משחק', 'ספר'],
        correctIndex: 0,
      },
      {
        question: 'מה {c1} אמר בהתחלה?',
        options: ['שלא הוא שבר', 'שסליחה', 'שהוא לא יודע', 'שישלם'],
        correctIndex: 0,
      },
      {
        question: 'מה {c1} למד בסוף?',
        options: ['שהאמת תמיד עדיפה', 'שלשבור זה בסדר', 'שלברוח עוזר', 'ש{c2} כועס'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'teamwork',
    theme: 'שיתוף פעולה',
    themeEmoji: '🤜🤛',
    panels: [
      '{c1} {e1} ו{c2} {e2} חיו {st} {se}.',
      'רצו לבנות בית גדול — אבל כל אחד עשה מה שהוא רצה.',
      '{c1} בנה קירות לבד, ו{c2} בנה גג לבד — ולא הסכימו כלל.',
      'הגשם ירד והבית שנבנה לבד נפל...',
      'ישבו ביחד ושוחחו. הבינו שצריך לעבוד יחד!',
      'הפעם תכננו ביחד: {c1} בנה ו{c2} עזר בכל שלב.',
      'בנו בית חזק ויפה — שעמד בגשם ובסערה!',
      'למדו: יחד אפשר להשיג יותר ממה שאפשר לבד! 🌈',
    ],
    panelEmojis: ['🏠', '🔨', '🏗️', '🌧️', '💬', '🤝', '🏡', '🌈'],
    questions: [
      {
        question: 'מה {c1} ו{c2} רצו לבנות?',
        options: ['בית', 'גשר', 'ספינה', 'מגדל'],
        correctIndex: 0,
      },
      {
        question: 'למה הבית הראשון נפל?',
        options: ['לא עבדו יחד', 'חסרו חומרים', 'הבית היה קטן', 'הגשם היה חזק'],
        correctIndex: 0,
      },
      {
        question: 'מה הם למדו בסוף?',
        options: ['שיחד אפשר יותר', 'שלא לבנות בגשם', 'שגשם רע', 'ש{c1} בונה טוב יותר'],
        correctIndex: 0,
      },
    ],
  },
];

export function resolveText(text: string, c1: Character, c2: Character, setting: Setting): string {
  return text
    .replace(/\{c1\}/g, c1.name)
    .replace(/\{c2\}/g, c2.name)
    .replace(/\{e1\}/g, c1.emoji)
    .replace(/\{e2\}/g, c2.emoji)
    .replace(/\{st\}/g, setting.name)
    .replace(/\{se\}/g, setting.emoji);
}
