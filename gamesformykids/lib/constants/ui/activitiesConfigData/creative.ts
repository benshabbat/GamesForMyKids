import type { GameUIConfig } from '../gameUIConfig.types';

export const creativeConfigs: Partial<Record<string, GameUIConfig>> = {
  instruments: {
    title: "🎵 משחק כלי נגינה 🎸",
    subTitle: "למד כלי נגינה דרך שמיעה!",
    itemsTitle: "כלי הנגינה שנלמד:",
    itemsDescription: "לחץ על כלי נגינה כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה כלי נגינה אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך הוא נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על כלי הנגינה הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #92400e 100%)",
      header: "text-white",
      subHeader: "text-yellow-100",
      itemsDescription: "text-yellow-100",
      button: { from: "yellow", to: "amber" },
      stepsBg: "bg-yellow-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
  },

  building: {
    title: "🏗️ סטודיו הבנייה הקסום 🏗️",
    subTitle: "בנה יצירות עם צורות צבעוניות!",
    itemsTitle: "הכלים הקסומים:",
    itemsDescription: "בחר צורות וצבעים לבניית היצירה שלך!",
    steps: [
      { icon: "🎨", title: "1. תבחר", description: "צבע וכלי בנייה" },
      { icon: "🔨", title: "2. תבנה", description: "גרור ושים צורות" },
      { icon: "✨", title: "3. תיצור", description: "יצירה קסומה!" },
    ],
    colors: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      header: "text-white",
      subHeader: "text-purple-100",
      itemsDescription: "text-white",
      button: { from: "purple", to: "pink" },
      stepsBg: "bg-white bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-4 gap-6 max-w-4xl mx-auto",
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "בנה את היצירה שלך!",
    challengeIcon: "🏗️🎨✨🌈",
    challengeDescription: "השתמש בצורות וצבעים ליצירה!",
    itemLabel: "כלי בנייה",
    tip: "💡 טיפ: גרור כדי להזיז, לחץ פעמיים לסיבוב!",
    tipDescription: "השתמש בכלים השונים ליצירת יצירות קסומות",
  },

  tetris: {
    title: "🧩 טטריס לילדים 🧩",
    subTitle: "המשחק הכי כיפי בעולם!",
    itemsTitle: "איך משחקים:",
    itemsDescription: "למד את החוקים והתחל לשחק!",
    steps: [
      { icon: "⬇️", title: "1. נפילה", description: "חלקים נופלים מלמעלה" },
      { icon: "🔄", title: "2. סיבוב", description: "סובב חלקים בחץ למעלה" },
      { icon: "➡️", title: "3. הזזה", description: "הזז ימינה ושמאלה" },
      { icon: "⚡", title: "4. ניקוי", description: "מלא שורות כדי לנקות" },
      { icon: "🏆", title: "5. ניקוד", description: "השג ניקוד גבוה!" },
    ],
    colors: {
      background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #4338ca 100%)",
      header: "text-yellow-300",
      subHeader: "text-white/90",
      itemsDescription: "text-blue-100",
      button: { from: "yellow", to: "orange" },
      stepsBg: "bg-white/20",
    },
    grid: {
      className: "grid-cols-1",
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "שחק טטריס!",
    challengeIcon: "🧩🎮⬇️🔄",
    challengeDescription: "סדר את החלקים ונקה שורות!",
    itemLabel: "חלק טטריס",
    tip: "💡 טיפ: נסה לחשוב איך לסדר החלקים מראש!",
    tipDescription: "השתמש בחיצי המקלדת או בכפתורי המגע לשלטון",
  },

  "art-craft": {
    title: "🎨 משחק אמנות ויצירה ✏️",
    subTitle: "הכר כלי אמנות!",
    itemsTitle: "כלי האמנות שנלמד:",
    itemsDescription: "לחץ על כלי כדי לגלות עליו!",
    steps: [
      { icon: "🎨", title: "1. תראה", description: "איזה כלי אמנות אני מציג" },
      { icon: "👂", title: "2. תשמע", description: "שמע את שם הכלי" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על הכלי הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #f953c6 0%, #b91d73 50%, #fc5c7d 100%)",
      header: "text-white",
      subHeader: "text-pink-100",
      itemsDescription: "text-pink-100",
      button: { from: "pink", to: "rose" },
      stepsBg: "bg-pink-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto",
    },
    challengeTitle: "איזה כלי אמנות זה?",
    challengeIcon: "🎨✏️✂️🖌️",
    challengeDescription: "זהה את כלי האמנות ובחר את התשובה הנכונה!",
    itemLabel: "כלי",
    tip: "💡 טיפ: למד ליצור!",
    tipDescription: "כלי אמנות שונים יוצרים אפקטים ויצירות שונות",
  },
};
