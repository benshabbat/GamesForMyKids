export type CityBuilderQuestion = {
  id: number;
  question: string;
  answer: string;
  emoji: string;
  wrongOptions: [string, string, string];
  category: string;
};

export const CITY_BUILDER_QUESTIONS: CityBuilderQuestion[] = [
  // מדע וטבע
  { id: 1, question: 'מה הצבע של השמיים ביום בהיר?', answer: 'כחול', emoji: '🌤️', wrongOptions: ['ירוק', 'אדום', 'צהוב'], category: 'טבע' },
  { id: 2, question: 'איזה חיה נובחת?', answer: 'כלב', emoji: '🐕', wrongOptions: ['חתול', 'פרה', 'סוס'], category: 'בעלי חיים' },
  { id: 3, question: 'מה יש בתוך ביצה שבוקעת ממנה אפרוח?', answer: 'אפרוח קטן', emoji: '🐣', wrongOptions: ['דגיג', 'צב', 'שועל'], category: 'בעלי חיים' },
  { id: 4, question: 'כמה רגליים יש לעכביש?', answer: 'שמונה', emoji: '🕷️', wrongOptions: ['שש', 'ארבע', 'עשר'], category: 'מדע' },
  { id: 5, question: 'מה זורח ביום ומאיר אותנו?', answer: 'שמש', emoji: '☀️', wrongOptions: ['ירח', 'כוכב', 'ענן'], category: 'טבע' },
  { id: 6, question: 'איזה פרי הוא צהוב וחמוץ?', answer: 'לימון', emoji: '🍋', wrongOptions: ['תפוח', 'בננה', 'ענב'], category: 'אוכל' },
  { id: 7, question: 'מה מרכיב את הגשם?', answer: 'מים', emoji: '🌧️', wrongOptions: ['חול', 'חלב', 'שמן'], category: 'מדע' },
  { id: 8, question: 'כמה צבעים ביש בקשת בענן?', answer: 'שבעה', emoji: '🌈', wrongOptions: ['חמישה', 'שלושה', 'עשרה'], category: 'מדע' },
  { id: 9, question: 'איזה חיה קופצת הכי גבוה?', answer: 'קנגורו', emoji: '🦘', wrongOptions: ['פיל', 'דג', 'צב'], category: 'בעלי חיים' },
  { id: 10, question: 'מה הצמח שממנו מכינים שוקולד?', answer: 'קקאו', emoji: '🍫', wrongOptions: ['קפה', 'סוכר', 'חיטה'], category: 'טבע' },
  // גיאוגרפיה וישראל
  { id: 11, question: 'מה בירת ישראל?', answer: 'ירושלים', emoji: '🏙️', wrongOptions: ['תל אביב', 'חיפה', 'אילת'], category: 'ישראל' },
  { id: 12, question: 'איזה ים נמצא בצפון ישראל?', answer: 'הכינרת', emoji: '🏞️', wrongOptions: ['ים המלח', 'הים התיכון', 'ים סוף'], category: 'ישראל' },
  { id: 13, question: 'כמה ימים בשבוע?', answer: 'שבעה', emoji: '📅', wrongOptions: ['חמישה', 'שישה', 'שמונה'], category: 'ידע כללי' },
  { id: 14, question: 'כמה חודשים בשנה?', answer: 'שנים עשר', emoji: '🗓️', wrongOptions: ['עשרה', 'שמונה', 'ארבעה עשר'], category: 'ידע כללי' },
  { id: 15, question: 'מה הבניין הכי גבוה בעולם נקרא?', answer: 'בורג\'  ח\'ליפה', emoji: '🏗️', wrongOptions: ['מגדל אייפל', 'ביג בן', 'פירמידה'], category: 'גיאוגרפיה' },
  // מתמטיקה ומספרים
  { id: 16, question: 'כמה זה 5 + 3?', answer: '8', emoji: '🔢', wrongOptions: ['7', '9', '6'], category: 'מתמטיקה' },
  { id: 17, question: 'כמה זה 10 - 4?', answer: '6', emoji: '➖', wrongOptions: ['5', '7', '8'], category: 'מתמטיקה' },
  { id: 18, question: 'כמה זה 2 × 5?', answer: '10', emoji: '✖️', wrongOptions: ['8', '12', '7'], category: 'מתמטיקה' },
  { id: 19, question: 'מה מספר זוגי?', answer: '4', emoji: '🔢', wrongOptions: ['3', '7', '9'], category: 'מתמטיקה' },
  { id: 20, question: 'כמה זה 3 + 3 + 3?', answer: '9', emoji: '➕', wrongOptions: ['6', '12', '8'], category: 'מתמטיקה' },
  // שפה ועברית
  { id: 21, question: 'מה ניגוד של "גדול"?', answer: 'קטן', emoji: '📏', wrongOptions: ['עגול', 'שמן', 'חזק'], category: 'שפה' },
  { id: 22, question: 'מה ניגוד של "יום"?', answer: 'לילה', emoji: '🌙', wrongOptions: ['שמש', 'ענן', 'שחר'], category: 'שפה' },
  { id: 23, question: 'מה ניגוד של "חם"?', answer: 'קר', emoji: '🌡️', wrongOptions: ['רטוב', 'שקט', 'גדול'], category: 'שפה' },
  { id: 24, question: 'כמה אותיות יש באלפבית העברי?', answer: 'עשרים ושתיים', emoji: '🔤', wrongOptions: ['עשרים', 'עשרים וארבע', 'שמונה עשרה'], category: 'שפה' },
  { id: 25, question: 'איזו אות באה ראשונה באלפבית?', answer: 'אלף', emoji: 'א', wrongOptions: ['בית', 'גימל', 'דלת'], category: 'שפה' },
  // ידע כללי לילדים
  { id: 26, question: 'מה עושים כשיש אש?', answer: 'מתקשרים ל-102', emoji: '🚒', wrongOptions: ['שותים מים', 'ישנים', 'מחכים'], category: 'בטיחות' },
  { id: 27, question: 'כמה שנות לימוד בבית ספר יסודי?', answer: 'שש', emoji: '🏫', wrongOptions: ['ארבע', 'שמונה', 'שלוש'], category: 'ידע כללי' },
  { id: 28, question: 'מה עושה שוטר?', answer: 'שומר על הסדר', emoji: '👮', wrongOptions: ['מבשל אוכל', 'בונה בתים', 'מרפא חולים'], category: 'מקצועות' },
  { id: 29, question: 'מה צבע תנור אדום ברמזור?', answer: 'עצור!', emoji: '🚦', wrongOptions: ['לך!', 'היזהר', 'האט'], category: 'בטיחות' },
  { id: 30, question: 'מה נחוץ לצמח לגדול?', answer: 'מים ואור שמש', emoji: '🌱', wrongOptions: ['חול ואבנים', 'קרח ורוח', 'חשיכה ומלח'], category: 'טבע' },
];
