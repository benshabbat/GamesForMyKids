import type { GameUIConfig } from '../gameUIConfig.types';

export const fantasyConfigs: Partial<Record<string, GameUIConfig>> = {
  "magic-fairy-tales": {
    title: "🧚 משחק אגדות קסם ✨",
    subTitle: "הכנס לעולם של נסיכות וקוסמים!",
    itemsTitle: "דמויות האגדה שנלמד:",
    itemsDescription: "לחץ על דמות כדי לשמוע עליה!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזו דמות אגדה אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלה" },
      { icon: "👆", title: "3. תלחץ", description: "על הדמות הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      header: "text-white",
      subHeader: "text-purple-100",
      itemsDescription: "text-purple-100",
      button: { from: "purple", to: "pink" },
      stepsBg: "bg-purple-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזו דמות אגדה שמעת?",
    challengeIcon: "🧚👸🤴🏰",
    challengeDescription: "בחר את הדמות הנכונה!",
    itemLabel: "דמות אגדה",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הדמויות למטה לשמוע את השמות",
    metadata: {
      keywords: "אגדות קסמים, פיות, דרקונים, מכשפות, קסם, גיל 4-8, עולם הפנטזיה",
      description: "היכנסו לעולם הקסמים והאגדות! פיות, דרקונים, נסיכות ועוד — דמיון וקריאה לגיל 4-8.",
    },
  },

  "space-adventure": {
    title: "🚀 משחק הרפתקאות בחלל 🌌",
    subTitle: "טוס אל הכוכבים וגלה את החלל!",
    itemsTitle: "עצמי החלל שנלמד:",
    itemsDescription: "לחץ על עצם כדי לשמוע עליו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה עצם חלל אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלו" },
      { icon: "👆", title: "3. תלחץ", description: "על העצם הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
      header: "text-white",
      subHeader: "text-blue-100",
      itemsDescription: "text-blue-100",
      button: { from: "indigo", to: "purple" },
      stepsBg: "bg-indigo-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה עצם חלל שמעת?",
    challengeIcon: "🚀🌌⭐🪐",
    challengeDescription: "בחר את העצם הנכון!",
    itemLabel: "עצם חלל",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על עצמי החלל למטה לשמוע את השמות",
    metadata: {
      keywords: "חלל, כוכבי לכת, חללית, גלקסיה, חקר חלל, גיל 5-10, אסטרונומיה לילדים",
      description: "טוסו לחלל וגלו כוכבי לכת וכוכבים! חללית, גלקסיה ועוד — לגיל 5-10.",
    },
  },

  "superheroes": {
    title: "🦸 משחק גיבורי על ⚡",
    subTitle: "למד על כוחות סופר!",
    itemsTitle: "כוחות הגיבורים שנלמד:",
    itemsDescription: "לחץ על כוח כדי לגלות עליו!",
    steps: [
      { icon: "⚡", title: "1. תראה", description: "איזה כוח אני מציג" },
      { icon: "👂", title: "2. תשמע", description: "שמע את שם הכוח" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על הכוח הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #f7971e 0%, #ffd200 50%, #FF512F 100%)",
      header: "text-white",
      subHeader: "text-yellow-100",
      itemsDescription: "text-yellow-100",
      button: { from: "yellow", to: "orange" },
      stepsBg: "bg-yellow-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto",
    },
    challengeTitle: "איזה כוח סופר זה?",
    challengeIcon: "🦸⚡🛡️🔥",
    challengeDescription: "זהה את כוח הגיבור ובחר את התשובה הנכונה!",
    itemLabel: "כוח",
    tip: "💡 טיפ: חשוב על הסמל!",
    tipDescription: "לכל כוח יש סמל ייחודי שעוזר לזהות אותו",
    metadata: {
      keywords: "גיבורי על, כוחות על, ספרמן, ספיידרמן, גיל 5-10, גיבורים, קסמים",
      description: "למדו על גיבורי על וכוחות מדהימים! זהו כל גיבור לפי הכוח שלו — לגיל 5-10.",
    },
  },

  "fairy-tale-chars": {
    title: "🧚 דמויות מאגדות 👸",
    subTitle: "הכר דמויות קסומות!",
    itemsTitle: "דמויות האגדה שנלמד:",
    itemsDescription: "לחץ על דמות כדי לגלות עליה!",
    steps: [
      { icon: "🧚", title: "1. תראה", description: "איזו דמות אני מציג" },
      { icon: "👂", title: "2. תשמע", description: "שמע את שם הדמות" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על הדמות הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      header: "text-white",
      subHeader: "text-violet-100",
      itemsDescription: "text-violet-100",
      button: { from: "violet", to: "purple" },
      stepsBg: "bg-violet-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto",
    },
    challengeTitle: "מי הדמות הקסומה הזו?",
    challengeIcon: "🧚👸🐉🦄",
    challengeDescription: "זהה את דמות האגדה ובחר את התשובה הנכונה!",
    itemLabel: "דמות",
    tip: "💡 טיפ: זכור את האגדות!",
    tipDescription: "כל דמות מגיעה מאגדה מסוימת עם כוחות ייחודיים",
    metadata: {
      keywords: "דמויות אגדה, נסיכות, עלבה שלגייה, כיפה אדומה, אגדות ילדים, גיל 4-8",
      description: "גלו דמויות קסומות מאגדות מרתקות! נסיכות, אגמונים, גמדים ועוד — לגיל 4-8.",
    },
  },
};
