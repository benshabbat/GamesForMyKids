import type { GameUIConfig } from '../gameUIConfig.types';

export const environmentConfigs: Partial<Record<string, GameUIConfig>> = {
  weather: {
    title: "🌤️ משחק מזג אוויר ☔",
    subTitle: "למד מזג אוויר דרך שמיעה!",
    itemsTitle: "כל מזגי האוויר שנלמד:",
    itemsDescription: "לחץ על מזג אוויר כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה מזג אוויר אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך מזג האוויר נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על מזג האוויר הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #87CEEB 0%, #98D8E8 25%, #B0E0E6 50%, #E0F6FF 75%, #F0F8FF 100%)",
      header: "text-white",
      subHeader: "text-sky-100",
      itemsDescription: "text-sky-100",
      button: { from: "sky", to: "blue" },
      stepsBg: "bg-sky-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "איזה מזג אוויר שמעת?",
    challengeIcon: "🌤️☔🌞❄️",
    challengeDescription: "בחר את מזג האוויר הנכון!",
    itemLabel: "מזג אוויר",
    tip: "💡 טיפ: תשמע את מזג האוויר!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על מזגי האוויר למטה לשמוע את השמות",
    metadata: {
      keywords: "מזג אוויר, שמש גשם שלג, חינוך סביבתי, גיל 3-7, עונות השנה, קור חום",
      description: "למדו על מזג האוויר בעברית! שמש, גשם, שלג, עננים — משחק חינוכי לגיל 3-7.",
    },
  },

  space: {
    title: "🚀 משחק חלל 🌟",
    subTitle: "למד על החלל דרך שמיעה!",
    itemsTitle: "חפצי החלל שנלמד:",
    itemsDescription: "לחץ על חפץ חלל כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה חפץ חלל אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך הוא נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על חפץ החלל הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #3730a3 50%, #1e40af 75%, #1d4ed8 100%)",
      header: "text-white",
      subHeader: "text-blue-100",
      itemsDescription: "text-blue-100",
      button: { from: "blue", to: "indigo" },
      stepsBg: "bg-blue-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
    metadata: {
      keywords: "חלל, כוכבים, שמש ירח, פלנטות, גיל 5-10, אסטרונומיה, עולם החלל",
      description: "חקרו את החלל והכוכבים! שמש, ירח, פלנטות ואסטרואידים — אסטרונומיה לגיל 5-10.",
    },
  },

  dinosaurs: {
    title: "🦕 משחק דינוזאורים 🦕",
    subTitle: "למד על דינוזאורים מדהימים מהעבר!",
    itemsTitle: "הדינוזאורים שנלמד:",
    itemsDescription: "לחץ על דינוזאור כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה דינוזאור אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "את שם הדינוזאור" },
      { icon: "👆", title: "3. תלחץ", description: "על הדינוזאור הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      header: "text-green-800",
      subHeader: "text-green-600",
      itemsDescription: "text-gray-100",
      button: { from: "green", to: "teal" },
      stepsBg: "bg-white bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה דינוזאור שמעת?",
    challengeIcon: "🦕🦖🦴🌋",
    challengeDescription: "בחר את הדינוזאור הנכון!",
    itemLabel: "דינוזאור",
    tip: "💡 טיפ: תשמע את שם הדינוזאור!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הדינוזאורים למטה לשמוע את השמות",
    metadata: {
      keywords: "דינוזאורים, טי-רקס, ברכיוזאורוס, טריצרטופס, פרהיסטוריה, גיל 4-9",
      description: "למדו על דינוזאורים מדהימים! טי-רקס, ברכיוזאורוס ועוד — פרהיסטוריה כיפית לגיל 4-9.",
    },
  },

  recycling: {
    title: "♻️ משחק מיחזור ♻️",
    subTitle: "למד על מיחזור והגנת הסביבה!",
    itemsTitle: "החומרים למיחזור שנלמד:",
    itemsDescription: "לחץ על חומר כדי לשמוע איך למחזר אותו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה חומר אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "איך למחזר אותו" },
      { icon: "👆", title: "3. תלחץ", description: "על החומר הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 25%, #16a085 50%, #48c9b0 75%, #52d681 100%)",
      header: "text-white",
      subHeader: "text-green-100",
      itemsDescription: "text-green-100",
      button: { from: "green", to: "emerald" },
      stepsBg: "bg-green-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה חומר למיחזור שמעת?",
    challengeIcon: "♻️🗂️📦🍃",
    challengeDescription: "בחר את החומר הנכון!",
    itemLabel: "חומר למיחזור",
    tip: "💡 טיפ: תשמע איך למחזר!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על החומרים למטה לשמוע את השמות",
    metadata: {
      keywords: "מיחזור, הגנת הסביבה, קיימות, זבל וניצול, גיל 4-9, ירוק, סביבה",
      description: "למדו על מיחזור וחשיבות שמירה על הסביבה! פלסטיק, נייר, זכוכית — חינוך סביבתי.",
    },
  },

  "climate-planet": {
    title: "🌍 משחק אקלים וכדור הארץ 🌿",
    subTitle: "גלה את כדור הארץ והאקלים שלו!",
    itemsTitle: "אזורי אקלים ויבשות שנלמד:",
    itemsDescription: "לחץ על מקום כדי לגלות עליו!",
    steps: [
      { icon: "🌍", title: "1. תראה", description: "איזה מקום בעולם אני מציג" },
      { icon: "🌡️", title: "2. תחשוב", description: "איך האקלים שם" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על המקום הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #56ab2f 0%, #a8e6a1 25%, #4facfe 50%, #00f2fe 75%, #43e97b 100%)",
      header: "text-white",
      subHeader: "text-emerald-100",
      itemsDescription: "text-emerald-100",
      button: { from: "emerald", to: "green" },
      stepsBg: "bg-emerald-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto",
    },
    challengeTitle: "איזה מקום בעולם זה?",
    challengeIcon: "🌍🌿🏔️🏖️",
    challengeDescription: "זהה את המקום והאקלים ובחר את התשובה הנכונה!",
    itemLabel: "מקום",
    tip: "💡 טיפ: חשוב על האקלים!",
    tipDescription: "חשוב איך מרגיש האקלים במקום הזה, ואז בחר",
    metadata: {
      keywords: "אקלים, כדור הארץ, יבשות, מדבר, טרופי, סביבה, גיל 6-10, שינויי אקלים",
      description: "גלו יבשות, אוקיינוסים ואזורי אקלים שונים בכדור הארץ! גאוגרפיה סביבתית לגיל 6-10.",
    },
  },

  "camping": {
    title: "⛺ משחק טיול ושטח 🗺️",
    subTitle: "הכן ציוד לטיול!",
    itemsTitle: "ציוד הטיול שנלמד:",
    itemsDescription: "לחץ על פריט כדי לגלות עליו!",
    steps: [
      { icon: "⛺", title: "1. תראה", description: "איזה ציוד טיול אני מציג" },
      { icon: "👂", title: "2. תשמע", description: "שמע את שם הציוד" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על הציוד הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #134E5E 0%, #71B280 50%, #52c234 100%)",
      header: "text-white",
      subHeader: "text-emerald-100",
      itemsDescription: "text-emerald-100",
      button: { from: "emerald", to: "green" },
      stepsBg: "bg-emerald-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto",
    },
    challengeTitle: "איזה ציוד טיול זה?",
    challengeIcon: "⛺🎒🔦🗺️",
    challengeDescription: "זהה את ציוד הטיול ובחר את התשובה הנכונה!",
    itemLabel: "ציוד",
    tip: "💡 טיפ: תתכונן היטב!",
    tipDescription: "ציוד טיול נכון יכול להציל חיים ולהפוך הרפתקאה לבטוחה",
    metadata: {
      keywords: "טיול, שטח, ציוד, אוהל, גיל 5-10, הרפתקאות, טבע, טיולים",
      description: "הכינו ציוד לטיול בטבע! אוהל, שקי שינה, מצפן ועוד — לימוד ציוד הרפתקאות לגיל 5-10.",
    },
  },
};
