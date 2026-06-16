export type BlessingQuestion = {
  id: number;
  situation: string;
  answer: string;
  wrongOptions: [string, string, string];
  emoji: string;
  category: 'food' | 'nature' | 'shabbat-holidays' | 'special';
};

export const BLESSING_QUESTIONS: BlessingQuestion[] = [
  {
    id: 1, emoji: '🍞', category: 'food',
    situation: 'לפני שאוכלים לחם',
    answer: 'המוציא לחם מן הארץ',
    wrongOptions: ['בורא פרי האדמה', 'שהכל נהיה בדברו', 'בורא פרי הגפן'],
  },
  {
    id: 2, emoji: '🍎', category: 'food',
    situation: 'לפני שאוכלים תפוח (פרי עץ)',
    answer: 'בורא פרי העץ',
    wrongOptions: ['המוציא לחם מן הארץ', 'בורא פרי האדמה', 'שהכל נהיה בדברו'],
  },
  {
    id: 3, emoji: '🥕', category: 'food',
    situation: 'לפני שאוכלים גזר (ירק)',
    answer: 'בורא פרי האדמה',
    wrongOptions: ['בורא פרי העץ', 'המוציא לחם מן הארץ', 'בורא מיני מזונות'],
  },
  {
    id: 4, emoji: '🧃', category: 'food',
    situation: 'לפני שותים מיץ תפוזים',
    answer: 'שהכל נהיה בדברו',
    wrongOptions: ['בורא פרי הגפן', 'בורא פרי העץ', 'המוציא לחם מן הארץ'],
  },
  {
    id: 5, emoji: '🍇', category: 'food',
    situation: 'לפני שותים יין',
    answer: 'בורא פרי הגפן',
    wrongOptions: ['שהכל נהיה בדברו', 'בורא פרי העץ', 'בורא פרי האדמה'],
  },
  {
    id: 6, emoji: '🍰', category: 'food',
    situation: 'לפני שאוכלים עוגה (מזונות)',
    answer: 'בורא מיני מזונות',
    wrongOptions: ['המוציא לחם מן הארץ', 'שהכל נהיה בדברו', 'בורא פרי האדמה'],
  },
  {
    id: 7, emoji: '🕯️', category: 'shabbat-holidays',
    situation: 'לפני שמדליקים נרות שבת',
    answer: 'להדליק נר של שבת',
    wrongOptions: ['להדליק נר של חנוכה', 'להדליק נר של יום טוב', 'על מצוות הדלקת הנר'],
  },
  {
    id: 8, emoji: '🕎', category: 'shabbat-holidays',
    situation: 'לפני שמדליקים נרות חנוכה',
    answer: 'להדליק נר של חנוכה',
    wrongOptions: ['להדליק נר של שבת', 'להדליק נר של יום טוב', 'לראות את הנר'],
  },
  {
    id: 9, emoji: '⚡', category: 'nature',
    situation: 'כשרואים ברק',
    answer: 'שעושה מעשה בראשית',
    wrongOptions: ['זוכר הברית', 'שכוחו וגבורתו מלא עולם', 'הטוב והמטיב'],
  },
  {
    id: 10, emoji: '🌈', category: 'nature',
    situation: 'כשרואים קשת בענן',
    answer: 'זוכר הברית',
    wrongOptions: ['שעושה מעשה בראשית', 'שכוחו וגבורתו מלא עולם', 'הטוב והמטיב'],
  },
  {
    id: 11, emoji: '🌊', category: 'nature',
    situation: 'כשרואים את הים הגדול',
    answer: 'שעשה את הים הגדול',
    wrongOptions: ['שעושה מעשה בראשית', 'זוכר הברית', 'בורא העולם'],
  },
  {
    id: 12, emoji: '⛈️', category: 'nature',
    situation: 'כשרואים רעם',
    answer: 'שכוחו וגבורתו מלא עולם',
    wrongOptions: ['שעושה מעשה בראשית', 'זוכר הברית', 'הטוב והמטיב'],
  },
  {
    id: 13, emoji: '🌸', category: 'nature',
    situation: 'ראשית ראיית עצי פרחים באביב',
    answer: 'שלא חיסר בעולמו כלום',
    wrongOptions: ['שעושה מעשה בראשית', 'זוכר הברית', 'בורא פרי העץ'],
  },
  {
    id: 14, emoji: '👤', category: 'special',
    situation: 'כשרואים חכם גדול בתורה',
    answer: 'שחלק מחכמתו ליראיו',
    wrongOptions: ['שחלק מכבודו לבשר ודם', 'שנתן מחכמתו לבשר ודם', 'ברוך המקום'],
  },
  {
    id: 15, emoji: '👑', category: 'special',
    situation: 'כשרואים מלך',
    answer: 'שחלק מכבודו לבשר ודם',
    wrongOptions: ['שחלק מחכמתו ליראיו', 'שנתן מחכמתו לבשר ודם', 'ברוך המקום'],
  },
  {
    id: 16, emoji: '🌟', category: 'special',
    situation: 'כשרואים מקום שנעשה בו נס לישראל',
    answer: 'שעשה נסים לאבותינו',
    wrongOptions: ['הטוב והמטיב', 'שחיינו וקיימנו', 'זוכר הברית'],
  },
  {
    id: 17, emoji: '🎉', category: 'special',
    situation: 'בהגיעה לזמן מיוחד לראשונה בשנה',
    answer: 'שהחיינו וקיימנו והגיענו לזמן הזה',
    wrongOptions: ['הטוב והמטיב', 'שעשה נסים לאבותינו', 'ברוך המקום'],
  },
  {
    id: 18, emoji: '🕍', category: 'shabbat-holidays',
    situation: 'לפני קידוש שבת',
    answer: 'בורא פרי הגפן',
    wrongOptions: ['שהחיינו וקיימנו', 'המוציא לחם מן הארץ', 'אשר קדשנו'],
  },
  {
    id: 19, emoji: '🍫', category: 'food',
    situation: 'לפני שאוכלים שוקולד',
    answer: 'שהכל נהיה בדברו',
    wrongOptions: ['בורא מיני מזונות', 'בורא פרי העץ', 'בורא פרי האדמה'],
  },
  {
    id: 20, emoji: '🌿', category: 'shabbat-holidays',
    situation: 'לפני נטילת ארבעת המינים בסוכות',
    answer: 'על נטילת לולב',
    wrongOptions: ['לישב בסוכה', 'להניח תפילין', 'להדליק נר של יום טוב'],
  },
  {
    id: 21, emoji: '🏠', category: 'shabbat-holidays',
    situation: 'לפני ישיבה בסוכה',
    answer: 'לישב בסוכה',
    wrongOptions: ['על נטילת לולב', 'שהחיינו וקיימנו', 'להדליק נר של יום טוב'],
  },
  {
    id: 22, emoji: '🍷', category: 'shabbat-holidays',
    situation: 'בהבדלה במוצאי שבת',
    answer: 'בורא פרי הגפן',
    wrongOptions: ['בורא מיני בשמים', 'בורא מאורי האש', 'המבדיל בין קודש לחול'],
  },
  {
    id: 23, emoji: '💧', category: 'food',
    situation: 'לפני שותים מים',
    answer: 'שהכל נהיה בדברו',
    wrongOptions: ['בורא פרי הגפן', 'בורא פרי האדמה', 'בורא פרי העץ'],
  },
  {
    id: 24, emoji: '🥜', category: 'food',
    situation: 'לפני שאוכלים בוטנים',
    answer: 'שהכל נהיה בדברו',
    wrongOptions: ['בורא פרי האדמה', 'בורא פרי העץ', 'בורא מיני מזונות'],
  },
];
