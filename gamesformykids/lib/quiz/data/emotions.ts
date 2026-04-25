// רגשות - זיהוי רגש לפי תיאור
export type EmotionQuestion = {
  id: number;
  emoji: string;
  emotion: string;
  scenario: string;
  wrongOptions: [string, string, string];
};

export const EMOTION_QUESTIONS: EmotionQuestion[] = [
  { id: 1,  emoji: '😊', emotion: 'שמח',     scenario: 'קיבלת מתנה שרצית מאוד ליום הולדת שלך.',         wrongOptions: ['עצוב', 'כועס', 'מפוחד'] },
  { id: 2,  emoji: '😢', emotion: 'עצוב',    scenario: 'חבר טוב שלך עזב וגר עכשיו בעיר אחרת.',          wrongOptions: ['שמח', 'מופתע', 'שבע רצון'] },
  { id: 3,  emoji: '😡', emotion: 'כועס',    scenario: 'מישהו לקח את הצעצוע שלך בלי לבקש רשות.',        wrongOptions: ['שמח', 'עצוב', 'נבוך'] },
  { id: 4,  emoji: '😨', emotion: 'מפוחד',   scenario: 'שמעת רעש חזק ומפתיע בלילה חשוך.',               wrongOptions: ['שמח', 'כועס', 'עצוב'] },
  { id: 5,  emoji: '😲', emotion: 'מופתע',   scenario: 'חברים הסתתרו וצעקו "הפתעה!" ביום הולדת שלך.',   wrongOptions: ['עצוב', 'מפוחד', 'כועס'] },
  { id: 6,  emoji: '😳', emotion: 'נבוך',    scenario: 'נפלת בכיתה ועל כולם הסתכלו עליך.',              wrongOptions: ['שמח', 'כועס', 'מופתע'] },
  { id: 7,  emoji: '🥰', emotion: 'אוהב',    scenario: 'ביליתם יום מיוחד עם סבתא שלך.',                 wrongOptions: ['עצוב', 'כועס', 'נבוך'] },
  { id: 8,  emoji: '😤', emotion: 'תסכול',   scenario: 'ניסיתה לפתור חידה הרבה פעמים ולא הצלחת.',       wrongOptions: ['שמח', 'עצוב', 'אוהב'] },
  { id: 9,  emoji: '😌', emotion: 'רגוע',    scenario: 'שכבת על הדשא בפארק וסתכלת בעננים.',             wrongOptions: ['מפוחד', 'כועס', 'נבוך'] },
  { id: 10, emoji: '🤩', emotion: 'נלהב',    scenario: 'הודיעו לכם שתסעו לפארק שעשועים מחר!',           wrongOptions: ['עצוב', 'רגוע', 'נבוך'] },
  { id: 11, emoji: '😔', emotion: 'מאוכזב',  scenario: 'הובטח לך שתלך לקולנוע ובסוף הטיול בוטל.',       wrongOptions: ['שמח', 'נלהב', 'רגוע'] },
  { id: 12, emoji: '🙏', emotion: 'אסיר תודה', scenario: 'מישהו עזר לך כשנפלת ופצעת את הברך שלך.', wrongOptions: ['כועס', 'מפוחד', 'תסכול'] },
  { id: 13, emoji: '😴', emotion: 'עייף',    scenario: 'נשארת ערה עד מאוחר בלילה ובבוקר קמת מוקדם.',   wrongOptions: ['שמח', 'נלהב', 'אוהב'] },
  { id: 14, emoji: '😟', emotion: 'מודאג',   scenario: 'החבר שלך לא הגיע לבית הספר ולא ענה לטלפון.',    wrongOptions: ['שמח', 'רגוע', 'נלהב'] },
  { id: 15, emoji: '😏', emotion: 'גאה',     scenario: 'ציירת ציור מדהים שכולם שיבחו אותו.',             wrongOptions: ['עצוב', 'מפוחד', 'נבוך'] },
];

