'use client';

export type ComprehensionQuestion = {
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
};

export type SongData = {
  id: string;
  title: string;
  emoji: string;
  color: string;
  lines: string[];
  questions: [ComprehensionQuestion, ComprehensionQuestion];
};

export const SONGS: SongData[] = [
  {
    id: 'kochav-katan',
    title: 'כוכב קטן',
    emoji: '⭐',
    color: 'from-indigo-400 to-purple-600',
    lines: [
      'כוכב כוכב קטן',
      'מה אתה שם שם בחשכן',
      'מעלה מעלה באוויר',
      'כמו יהלום שמבהיר',
      'כוכב כוכב קטן',
      'מה אתה שם שם בחשכן',
    ],
    questions: [
      {
        question: 'למה מדמים את הכוכב בשיר?',
        options: ['ליהלום', 'לתפוח', 'לשמש', 'לירח'],
        correctIndex: 0,
      },
      {
        question: 'איפה נמצא הכוכב?',
        options: ['בשמים', 'בים', 'בהר', 'בבית'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'geshem',
    title: 'שיר הגשם',
    emoji: '🌧️',
    color: 'from-blue-400 to-cyan-600',
    lines: [
      'יורד הגשם יורד',
      'על הגג על הגג',
      'גשם גשם גשמי ברכה',
      'תן לנו ולכל ברכה',
      'יורד הגשם יורד',
      'על הגג על הגג',
    ],
    questions: [
      {
        question: 'מה יורד בשיר?',
        options: ['גשם', 'שלג', 'ברד', 'טל'],
        correctIndex: 0,
      },
      {
        question: 'על מה יורד הגשם בשיר?',
        options: ['על הגג', 'על השדה', 'על הים', 'על ההר'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'rosh-hashana',
    title: 'ראש השנה',
    emoji: '🍎',
    color: 'from-red-400 to-orange-500',
    lines: [
      'ראש השנה בא',
      'ראש השנה בא',
      'תפוח בדבש נאכל',
      'שנה טובה נקבל',
      'שנה טובה ומתוקה',
      'שנה טובה ומתוקה',
    ],
    questions: [
      {
        question: 'מה אוכלים בראש השנה לפי השיר?',
        options: ['תפוח בדבש', 'עוגה', 'לחם', 'שוקולד'],
        correctIndex: 0,
      },
      {
        question: 'מה מאחלים בסוף השיר?',
        options: ['שנה טובה', 'חג שמח', 'בוקר טוב', 'ערב טוב'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'haver',
    title: 'יש לי חבר',
    emoji: '🤝',
    color: 'from-green-400 to-teal-600',
    lines: [
      'יש לי חבר',
      'חבר טוב יש לי',
      'כשאני עצוב הוא משמח אותי',
      'כשאני בוכה הוא מנחם אותי',
      'יש לי חבר',
      'חבר טוב יש לי',
    ],
    questions: [
      {
        question: 'מה עושה החבר כשהילד עצוב?',
        options: ['משמח אותו', 'בוכה איתו', 'הולך הביתה', 'ישן'],
        correctIndex: 0,
      },
      {
        question: 'מה עושה החבר כשהילד בוכה?',
        options: ['מנחם אותו', 'צוחק', 'הולך הביתה', 'אוכל'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'ima',
    title: 'אמא אמא',
    emoji: '💕',
    color: 'from-pink-400 to-rose-600',
    lines: [
      'אמא אמא',
      'כמה אני אוהב אותך',
      'אמא אמא',
      'אין כמוך בעולם',
      'חיבוק ונשיקה',
      'אמא שלי הכי טובה',
    ],
    questions: [
      {
        question: 'את מי אוהב הילד בשיר?',
        options: ['את אמא', 'את אבא', 'את הסבתא', 'את האח'],
        correctIndex: 0,
      },
      {
        question: 'מה נותן הילד לאמא?',
        options: ['חיבוק ונשיקה', 'ממתק', 'פרח', 'ציור'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'shabbat',
    title: 'שבת שלום',
    emoji: '🕯️',
    color: 'from-yellow-400 to-amber-600',
    lines: [
      'שבת שלום שבת שלום',
      'שבת שלום ומבורך',
      'נרות של שבת דולקים',
      'לב שמח לנו מביאים',
      'שבת שלום שבת שלום',
      'שבת שלום ומבורך',
    ],
    questions: [
      {
        question: 'מה דולקים בשבת לפי השיר?',
        options: ['נרות', 'מנגל', 'פנס', 'מדורה'],
        correctIndex: 0,
      },
      {
        question: 'מה מביאים נרות השבת?',
        options: ['לב שמח', 'אוכל טוב', 'ממתקים', 'שירים'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'chanukah',
    title: 'חנוכה',
    emoji: '🕎',
    color: 'from-blue-500 to-indigo-700',
    lines: [
      'חנוכה חנוכה',
      'חג יפה כל כך',
      'אור חביב סביב',
      'סביבון סוב סוב סוב',
      'חנוכה חנוכה',
      'חג יפה כל כך',
    ],
    questions: [
      {
        question: 'מה סובב בחנוכה לפי השיר?',
        options: ['סביבון', 'כדור', 'גלגל', 'חישוק'],
        correctIndex: 0,
      },
      {
        question: 'איזה חג מתואר בשיר?',
        options: ['חנוכה', 'פסח', 'סוכות', 'ראש השנה'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'boker-tov',
    title: 'בוקר טוב',
    emoji: '☀️',
    color: 'from-orange-300 to-yellow-500',
    lines: [
      'בוקר טוב בוקר טוב',
      'יום חדש עלה',
      'השמש זורחת בשמים',
      'ואנחנו שמחים',
      'בוקר טוב בוקר טוב',
      'יום חדש עלה',
    ],
    questions: [
      {
        question: 'מה עלה בבוקר לפי השיר?',
        options: ['יום חדש', 'ירח', 'כוכב', 'עב'],
        correctIndex: 0,
      },
      {
        question: 'מה זורחת בשמים?',
        options: ['השמש', 'הירח', 'הכוכב', 'הברק'],
        correctIndex: 0,
      },
    ],
  },
];
