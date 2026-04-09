/**
 * ===============================================
 * קונפיגורציות UI מרוכזות למשחקים
 * ===============================================
 * 
 * קובץ אחד שמכיל את כל הקונפיגורציות עבור AutoStartScreen
 * מחליף את useGameStartScreenConfig ואת כל הקבועים הפזורים
 */

import { GameStep } from "@/lib/types/components";
import { GameType } from "@/lib/types/core/base";

export interface GameUIConfig {
  title: string;
  subTitle: string;
  itemsTitle: string;
  itemsDescription: string;
  steps: GameStep[];
  colors: {
    background: string;
    header: string;
    subHeader: string;
    itemsDescription: string;
    button: { from: string; to: string };
    stepsBg: string;
  };
  grid: {
    className: string;
    showSpeaker?: boolean;
  };
  // ✨ הוספות עבור AutoGamePage (אופציונליים עם ברירות מחדל)
  challengeTitle?: string;
  challengeIcon?: string;
  challengeDescription?: string;
  itemLabel?: string;
  tip?: string;
  tipDescription?: string;
  // 🔍 מטאדאטה SEO
  metadata?: {
    keywords?: string;
    description?: string;
    ogImagePath?: string;
    twitterImagePath?: string;
  };
}

/**
 * 🎯 ONE PLACE FOR ALL GAME CONFIGS
 * כל הקונפיגורציות במקום אחד!
 */
export const GAME_UI_CONFIGS: Record<GameType, GameUIConfig> = {
  colors: {
    title: "🎨 משחק צבעים 🎨",
    subTitle: "למד צבעים דרך משחק!",
    itemsTitle: "הצבעים שנלמד:",
    itemsDescription: "לחץ על צבע כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה צבע אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "את שם הצבע" },
      { icon: "👆", title: "3. תלחץ", description: "על הצבע הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #a8e6cf 50%, #dcedc1 75%, #ffd3e1 100%)",
      header: "text-purple-800",
      subHeader: "text-purple-600",
      itemsDescription: "text-gray-100",
      button: { from: "teal", to: "cyan" },
      stepsBg: "bg-white bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "איזה צבע שמעת?",
    challengeIcon: "🎨🌈🖍️🎪",
    challengeDescription: "בחר את הצבע הנכון!",
    itemLabel: "צבע",
    tip: "💡 טיפ: תשמע את שם הצבע!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הצבעים למטה לשמוע את השמות",
    // 🔍 מטאדאטה SEO
    metadata: {
      keywords: "משחק צבעים לילדים, למידת צבעים, משחקים חינוכיים, גיל 2-5, פעוטות, צבעים בעברית",
      description: "משחק אינטראקטיבי ללימוד צבעים לילדים בגילאי 2-5. למדו צבעים בעברית דרך משחק מהנה וחינוכי!",
    },
  },

  letters: {
    title: "🔤 משחק אותיות 📝",
    subTitle: "למד אותיות דרך שמיעה!",
    itemsTitle: "האותיות שנלמד:",
    itemsDescription: "לחץ על אות כדי לשמוע את השם שלה!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזו אות אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך נראית האות" },
      { icon: "👆", title: "3. תלחץ", description: "על האות הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #fed7aa 0%, #fdba74 25%, #fb923c 50%, #f97316 75%, #ea580c 100%)",
      header: "text-white",
      subHeader: "text-orange-100",
      itemsDescription: "text-orange-100",
      button: { from: "yellow", to: "orange" },
      stepsBg: "bg-orange-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "איזו אות שמעת?",
    challengeIcon: "🔤📝✏️📄",
    challengeDescription: "בחר את האות הנכונה!",
    itemLabel: "אות",
    tip: "💡 טיפ: תשמע את שם האות!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על האותיות למטה לשמוע את השמות",
  },

  shapes: {
    title: "🔺 משחק צורות 🟡",
    subTitle: "למד צורות דרך שמיעה!",
    itemsTitle: "הצורות שנלמד:",
    itemsDescription: "לחץ על צורה כדי לשמוע את השם שלה!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזו צורה אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך נראית הצורה" },
      { icon: "👆", title: "3. תלחץ", description: "על הצורה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #d4f1d4 0%, #a8e6a8 25%, #7dd87d 50%, #52c952 75%, #26b926 100%)",
      header: "text-white",
      subHeader: "text-green-100",
      itemsDescription: "text-green-100",
      button: { from: "blue", to: "green" },
      stepsBg: "bg-green-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto",
      showSpeaker: false,
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "איזו צורה שמעת?",
    challengeIcon: "🔺🟡⭐💎",
    challengeDescription: "בחר את הצורה הנכונה!",
    itemLabel: "צורה",
    tip: "💡 טיפ: תשמע את שם הצורה!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הצורות למטה לשמוע את השמות",
  },

  "colored-shapes": {
    title: "🔴🔺 משחק צורות צבעוניות 🟡🟦",
    subTitle: "למד צורות וצבעים יחד!",
    itemsTitle: "הצורות הצבעוניות שנלמד:",
    itemsDescription: "לחץ על צורה צבעונית כדי לשמוע את השם שלה!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזו צורה באיזה צבע אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך נראית הצורה הצבעונית" },
      { icon: "👆", title: "3. תלחץ", description: "על הצורה הצבעונית הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #a8e6cf 50%, #dcedc1 75%, #d4f1d4 100%)",
      header: "text-white",
      subHeader: "text-green-100",
      itemsDescription: "text-green-100",
      button: { from: "teal", to: "green" },
      stepsBg: "bg-gradient-to-r from-orange-100 to-green-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto",
      showSpeaker: false,
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "איזו צורה צבעונית שמעת?",
    challengeIcon: "🔴🔺🟡⭐🔵💎",
    challengeDescription: "בחר את הצורה בצבע הנכון!",
    itemLabel: "צורה צבעונית",
    tip: "💡 טיפ: תשמע את שם הצורה והצבע יחד!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הצורות למטה לשמוע את השמות",
  },

  numbers: {
    title: "🔢 משחק מספרים 🎯",
    subTitle: "למד מספרים דרך שמיעה!",
    itemsTitle: "המספרים שנלמד:",
    itemsDescription: "לחץ על מספר כדי לשמוע אותו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה מספר אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך נראה המספר" },
      { icon: "👆", title: "3. תלחץ", description: "על המספר הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 25%, #a5b4fc 50%, #818cf8 75%, #6366f1 100%)",
      header: "text-white",
      subHeader: "text-indigo-100",
      itemsDescription: "text-indigo-100",
      button: { from: "indigo", to: "purple" },
      stepsBg: "bg-indigo-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-4 md:grid-cols-5 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "איזה מספר שמעת?",
    challengeIcon: "🔢🎯123️⃣",
    challengeDescription: "בחר את המספר הנכון!",
    itemLabel: "מספר",
    tip: "💡 טיפ: תשמע את המספר!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על המספרים למטה לשמוע אותם",
  },

  fruits: {
    title: "🍎 משחק פירות 🍌",
    subTitle: "למד פירות דרך שמיעה!",
    itemsTitle: "כל הפירות שנלמד:",
    itemsDescription: "לחץ על פרי כדי לשמוע את השם שלו! פירות טעימים ובריאים",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה פרי אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך הפרי נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על הפרי הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 25%, #e17055 50%, #fdcb6e 75%, #f39c12 100%)",
      header: "text-white",
      subHeader: "text-orange-100",
      itemsDescription: "text-orange-100",
      button: { from: "orange", to: "red" },
      stepsBg: "bg-orange-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto",
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "איזה פרי שמעת?",
    challengeIcon: "🍎🍌🍊🥝",
    challengeDescription: "בחר את הפרי הנכון!",
    itemLabel: "פרי",
    tip: "💡 טיפ: תשמע את שם הפרי הטעים!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הפירות למטה לשמוע את השמות",
  },

  animals: {
    title: "🐶 משחק חיות 🐱",
    subTitle: "למד חיות דרך שמיעה!",
    itemsTitle: "כל החיות שנלמד:",
    itemsDescription: "לחץ על חיה כדי לשמוע את השם שלה! חיות מקסימות",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזו חיה אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך החיה נראית" },
      { icon: "👆", title: "3. תלחץ", description: "על החיה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #d4f1d4 0%, #a8e6a8 25%, #7dd87d 50%, #52c952 75%, #10b981 100%)",
      header: "text-white",
      subHeader: "text-green-100",
      itemsDescription: "text-green-100",
      button: { from: "green", to: "emerald" },
      stepsBg: "bg-green-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "איזו חיה שמעת?",
    challengeIcon: "🐾🐄🐶🐱",
    challengeDescription: "בחר את החיה הנכונה!",
    itemLabel: "חיה",
    tip: "💡 טיפ: תשמע את שם החיה שאני אומר!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על החיות למטה לשמוע את השמות",
    // 🔍 מטאדאטה SEO
    metadata: {
      keywords: "משחק חיות לילדים, למידת בעלי חיים, משחקים חינוכיים, גיל 2-5, פעוטות, חיות בעברית",
      description: "משחק אינטראקטיבי ללימוד בעלי חיים לילדים בגילאי 2-5. למדו על חיות שונות בעברית דרך משחק מהנה!",
    },
  },

  vegetables: {
    title: "🥕 משחק ירקות 🥬",
    subTitle: "למד ירקות באמצעות הקשבה!",
    itemsTitle: "כל הירקות שנלמד:",
    itemsDescription: "לחץ על ירק כדי לשמוע את שמו! ירקות בריאים וטעימים",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה ירק אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך הירק נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על הירק הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #d4f1d4 0%, #a8e6a8 25%, #7dd87d 50%, #52c952 75%, #16a34a 100%)",
      header: "text-white",
      subHeader: "text-green-100",
      itemsDescription: "text-green-100",
      button: { from: "green", to: "emerald" },
      stepsBg: "bg-green-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "איזה ירק שמעת?",
    challengeIcon: "🥕🥬🍅🥒",
    challengeDescription: "בחר את הירק הנכון!",
    itemLabel: "ירק",
    tip: "💡 טיפ: תשמע את שם הירק הבריא!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הירקות למטה לשמוע את השמות",
  },

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
  },

  transport: {
    title: "🚗 משחק תחבורה ✈️",
    subTitle: "למד כלי תחבורה דרך שמיעה!",
    itemsTitle: "כלי התחבורה שנלמד:",
    itemsDescription: "לחץ על כלי תחבורה כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה כלי תחבורה אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך הוא נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על כלי התחבורה הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 25%, #1E40AF 50%, #1E3A8A 75%, #312E81 100%)",
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
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "איזה כלי תחבורה שמעת?",
    challengeIcon: "🚗✈️🚢🚂",
    challengeDescription: "בחר את כלי התחבורה הנכון!",
    itemLabel: "כלי תחבורה",
    tip: "💡 טיפ: תשמע את שם כלי התחבורה!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על כלי התחבורה למטה לשמוע את השמות",
  },

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
  },

  clothing: {
    title: "👕 משחק בגדים 👗",
    subTitle: "למד בגדים דרך שמיעה!",
    itemsTitle: "הבגדים שנלמד:",
    itemsDescription: "לחץ על בגד כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה בגד אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך הבגד נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על הבגד הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 25%, #ec4899 50%, #db2777 75%, #be185d 100%)",
      header: "text-white",
      subHeader: "text-pink-100",
      itemsDescription: "text-pink-100",
      button: { from: "pink", to: "rose" },
      stepsBg: "bg-pink-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "איזה בגד שמעת?",
    challengeIcon: "👕👗👖👚",
    challengeDescription: "בחר את הבגד הנכון!",
    itemLabel: "בגד",
    tip: "💡 טיפ: תשמע את שם הבגד!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הבגדים למטה לשמוע את השמות",
  },

  'smells-tastes': {
    title: "👃 משחק ריחות וטעמים 👅",
    subTitle: "למד ריחות וטעמים דרך שמיעה!",
    itemsTitle: "הריחות והטעמים שנלמד:",
    itemsDescription: "לחץ על ריח או טעם כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה טעם או ריח אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך זה מרגיש" },
      { icon: "👆", title: "3. תלחץ", description: "על הטעם הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #fef7cd 0%, #fbbf24 25%, #f59e0b 50%, #d97706 75%, #b45309 100%)",
      header: "text-white",
      subHeader: "text-amber-100",
      itemsDescription: "text-amber-100",
      button: { from: "amber", to: "orange" },
      stepsBg: "bg-amber-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
  },

  house: {
    title: "🏠 משחק הבית 🪑",
    subTitle: "למד חפצי בית דרך שמיעה!",
    itemsTitle: "חפצי הבית שנלמד:",
    itemsDescription: "לחץ על חפץ כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה חפץ בית אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך החפץ נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על החפץ הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 25%, #38bdf8 50%, #0ea5e9 75%, #0284c7 100%)",
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
  },

  tools: {
    title: "🔧 משחק כלי עבודה ⚒️",
    subTitle: "למד כלי עבודה דרך שמיעה!",
    itemsTitle: "כלי העבודה שנלמד:",
    itemsDescription: "לחץ על כלי עבודה כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה כלי עבודה אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך הכלי נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על הכלי הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #fef3c7 0%, #fbbf24 25%, #f59e0b 50%, #d97706 75%, #92400e 100%)",
      header: "text-white",
      subHeader: "text-yellow-100",
      itemsDescription: "text-yellow-100",
      button: { from: "yellow", to: "orange" },
      stepsBg: "bg-yellow-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
  },

  counting: {
    title: "🔢 משחק ספירה 🧮",
    subTitle: "למד ספירה דרך שמיעה!",
    itemsTitle: "המספרים שנלמד לספור:",
    itemsDescription: "לחץ על מספר כדי לשמוע אותו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה מספר אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "כמה זה" },
      { icon: "👆", title: "3. תלחץ", description: "על המספר הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #a7f3d0 0%, #34d399 25%, #10b981 50%, #059669 75%, #047857 100%)",
      header: "text-white",
      subHeader: "text-cyan-100",
      itemsDescription: "text-cyan-100",
      button: { from: "cyan", to: "blue" },
      stepsBg: "bg-cyan-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-4 md:grid-cols-5 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
  },

  math: {
    title: "➕ משחק מתמטיקה ➖",
    subTitle: "למד מתמטיקה דרך שמיעה!",
    itemsTitle: "התרגילים שנלמד:",
    itemsDescription: "לחץ על תשובה כדי לשמוע אותה!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה תרגיל אני אומר" },
      { icon: "🤔", title: "2. תחשב", description: "מה התשובה" },
      { icon: "👆", title: "3. תלחץ", description: "על התשובה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #92400e 100%)",
      header: "text-white",
      subHeader: "text-yellow-100",
      itemsDescription: "text-yellow-100",
      button: { from: "yellow", to: "orange" },
      stepsBg: "bg-yellow-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
  },

  memory: {
    title: "🧠 משחק זיכרון 🃏",
    subTitle: "שחק זיכרון עם חיות!",
    itemsTitle: "החיות שנראה במשחק:",
    itemsDescription: "תזכור איפה כל חיה נמצאת!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "את החיות בכרטיסים" },
      { icon: "🧠", title: "2. תזכור", description: "איפה כל חיה נמצאת" },
      { icon: "👆", title: "3. תמצא", description: "את הזוגות החבויים" },
    ],
    colors: {
      background: "linear-gradient(135deg, #fce7f3 0%, #e879f9 25%, #a855f7 50%, #7c3aed 75%, #5b21b6 100%)",
      header: "text-white",
      subHeader: "text-pink-100",
      itemsDescription: "text-pink-100",
      button: { from: "fuchsia", to: "pink" },
      stepsBg: "bg-purple-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
    },
  },

  professions: {
    title: "👩‍⚕️ משחק מקצועות 👨‍🚒",
    subTitle: "למד מקצועות דרך שמיעה!",
    itemsTitle: "המקצועות שנלמד:",
    itemsDescription: "לחץ על מקצוע כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה מקצוע אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך המקצוע נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על המקצוע הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #fce7f3 0%, #e879f9 25%, #a855f7 50%, #7c3aed 75%, #5b21b6 100%)",
      header: "text-white",
      subHeader: "text-purple-100",
      itemsDescription: "text-purple-100",
      button: { from: "purple", to: "indigo" },
      stepsBg: "bg-purple-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
      showSpeaker: false,
    },
  },

  vehicles: {
    title: "🚛 משחק כלי רכב 🏍️",
    subTitle: "למד כלי רכב דרך שמיעה!",
    itemsTitle: "כלי הרכב שנלמד:",
    itemsDescription: "לחץ על כלי רכב כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה כלי רכב אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך הוא נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על כלי הרכב הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #60a5fa 50%, #93c5fd 75%, #dbeafe 100%)",
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
  },

  bubbles: {
    title: "🫧 משחק בועות 💙",
    subTitle: "פוצץ בועות וכיף!",
    itemsTitle: "הבועות במשחק:",
    itemsDescription: "לחץ על הבועות כדי לפוצץ אותן!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "את הבועות מגיעות" },
      { icon: "⚡", title: "2. תזוז", description: "מהר לפוצץ אותן" },
      { icon: "👆", title: "3. תלחץ", description: "כדי לפוצץ הבועות" },
    ],
    colors: {
      background: "linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 25%, #38bdf8 50%, #0ea5e9 75%, #0284c7 100%)",
      header: "text-white",
      subHeader: "text-sky-100",
      itemsDescription: "text-sky-100",
      button: { from: "cyan", to: "blue" },
      stepsBg: "bg-sky-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
  },

  emotions: {
    title: "😊 משחק רגשות 😢",
    subTitle: "למד רגשות שונים דרך הקשבה!",
    itemsTitle: "הרגשות שנלמד:",
    itemsDescription: "לחץ על רגש כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה רגש אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך הרגש נראה" },
      { icon: "👆", title: "3. תלחץ", description: "על הרגש הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #fef7cd 0%, #fde047 25%, #facc15 50%, #eab308 75%, #ca8a04 100%)",
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

  puzzles: {
    title: "🧩 משחק פאזלים 🖼️",
    subTitle: "הרכב תמונות יפות!",
    itemsTitle: "הפאזלים במשחק:",
    itemsDescription: "בחר פאזל והרכב את התמונה!",
    steps: [
      { icon: "👀", title: "1. תבחר", description: "תמונה לפאזל" },
      { icon: "🧩", title: "2. תגרור", description: "חלקים למקום הנכון" },
      { icon: "🏆", title: "3. תרכיב", description: "את התמונה השלמה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #f3e8ff 0%, #c084fc 25%, #a855f7 50%, #7c3aed 75%, #5b21b6 100%)",
      header: "text-white",
      subHeader: "text-purple-100",
      itemsDescription: "text-purple-100",
      button: { from: "purple", to: "indigo" },
      stepsBg: "bg-purple-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto",
    },
    // ✨ הוספות עבור AutoGamePage
    challengeTitle: "הרכב את הפאזל!",
    challengeIcon: "🧩🖼️✨🎨",
    challengeDescription: "גרור את החלקים למקום הנכון!",
    itemLabel: "פאזל",
    tip: "💡 טיפ: התחל מהפינות והקצוות!",
    tipDescription: "חפש צבעים ודפוסים דומים כדי להרכיב את התמונה",
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
      background: "bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700",
      header: "text-yellow-300",
      subHeader: "text-white/90",
      itemsDescription: "text-blue-100",
      button: { from: "from-yellow-400", to: "to-orange-500" },
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

  // =============== משחקים חדשים ===============
  
  sports: {
    title: "⚽ משחק ספורט ⚽",
    subTitle: "למד על ספורט ופעילות גופנית!",
    itemsTitle: "הספורט שנלמד:",
    itemsDescription: "לחץ על ספורט כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה ספורט אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "את שם הספורט" },
      { icon: "👆", title: "3. תלחץ", description: "על הספורט הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #a8e6cf 0%, #dcedc1 25%, #ffd3e1 50%, #ffecd2 75%, #fcb69f 100%)",
      header: "text-green-800",
      subHeader: "text-green-600",
      itemsDescription: "text-gray-100",
      button: { from: "green", to: "blue" },
      stepsBg: "bg-white bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה ספורט שמעת?",
    challengeIcon: "⚽🏀🎾🏊",
    challengeDescription: "בחר את הספורט הנכון!",
    itemLabel: "ספורט",
    tip: "💡 טיפ: תשמע את שם הספורט!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הספורט למטה לשמוע את השמות",
  },

  kitchen: {
    title: "👨‍🍳 משחק כלי מטבח 👨‍🍳",
    subTitle: "למד על כלי מטבח ובישול!",
    itemsTitle: "כלי המטבח שנלמד:",
    itemsDescription: "לחץ על כלי כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה כלי מטבח אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "את שם הכלי" },
      { icon: "👆", title: "3. תלחץ", description: "על הכלי הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #a8e6cf 50%, #dcedc1 75%, #ffd3e1 100%)",
      header: "text-orange-800",
      subHeader: "text-orange-600",
      itemsDescription: "text-gray-100",
      button: { from: "orange", to: "red" },
      stepsBg: "bg-white bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה כלי מטבח שמעת?",
    challengeIcon: "🍲🍳🔪🥄",
    challengeDescription: "בחר את הכלי הנכון!",
    itemLabel: "כלי מטבח",
    tip: "💡 טיפ: תשמע את שם הכלי!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הכלים למטה לשמוע את השמות",
  },

  "body-parts": {
    title: "👂 משחק חלקי הגוף 👂",
    subTitle: "למד על חלקי הגוף השונים!",
    itemsTitle: "חלקי הגוף שנלמד:",
    itemsDescription: "לחץ על חלק גוף כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה חלק גוף אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "את שם חלק הגוף" },
      { icon: "👆", title: "3. תלחץ", description: "על חלק הגוף הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ffd3e1 0%, #ffecd2 25%, #fcb69f 50%, #a8e6cf 75%, #dcedc1 100%)",
      header: "text-pink-800",
      subHeader: "text-pink-600",
      itemsDescription: "text-gray-100",
      button: { from: "pink", to: "purple" },
      stepsBg: "bg-white bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה חלק גוף שמעת?",
    challengeIcon: "👁️👂👃✋",
    challengeDescription: "בחר את חלק הגוף הנכון!",
    itemLabel: "חלק גוף",
    tip: "💡 טיפ: תשמע את שם חלק הגוף!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על חלקי הגוף למטה לשמוע את השמות",
  },

  family: {
    title: "👨‍👩‍👧‍👦 משחק בני המשפחה 👨‍👩‍👧‍👦",
    subTitle: "למד על בני המשפחה השונים!",
    itemsTitle: "בני המשפחה שנלמד:",
    itemsDescription: "לחץ על בן משפחה כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה בן משפחה אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "את שם בן המשפחה" },
      { icon: "👆", title: "3. תלחץ", description: "על בן המשפחה הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #a8e6cf 0%, #dcedc1 25%, #ffd3e1 50%, #ffecd2 75%, #fcb69f 100%)",
      header: "text-blue-800",
      subHeader: "text-blue-600",
      itemsDescription: "text-gray-100",
      button: { from: "blue", to: "indigo" },
      stepsBg: "bg-white bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה בן משפחה שמעת?",
    challengeIcon: "👨👩👧👦",
    challengeDescription: "בחר את בן המשפחה הנכון!",
    itemLabel: "בן משפחה",
    tip: "💡 טיפ: תשמע את שם בן המשפחה!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על בני המשפחה למטה לשמוע את השמות",
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
  },

  "world-food": {
    title: "🌍 משחק אוכל מהעולם 🍕",
    subTitle: "למד על מאכלים מתרבויות שונות!",
    itemsTitle: "המאכלים שנלמד:",
    itemsDescription: "לחץ על מאכל כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה מאכל אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "את שם המאכל" },
      { icon: "👆", title: "3. תלחץ", description: "על המאכל הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 25%, #48dbfb 50%, #ff9ff3 75%, #54a0ff 100%)",
      header: "text-white",
      subHeader: "text-red-100",
      itemsDescription: "text-red-100",
      button: { from: "red", to: "orange" },
      stepsBg: "bg-red-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה מאכל עולמי שמעת?",
    challengeIcon: "🍕🍜🌮🍱",
    challengeDescription: "בחר את המאכל הנכון!",
    itemLabel: "מאכל",
    tip: "💡 טיפ: תשמע את שם המאכל!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על המאכלים למטה לשמוע את השמות",
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
  },

  medicine: {
    title: "💊 משחק כלי רפואה 🏥",
    subTitle: "למד על כלים רפואיים ובריאות!",
    itemsTitle: "הכלים הרפואיים שנלמד:",
    itemsDescription: "לחץ על כלי כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה כלי רפואי אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "את שם הכלי" },
      { icon: "👆", title: "3. תלחץ", description: "על הכלי הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ffffff 0%, #dbeafe 25%, #3b82f6 50%, #1e40af 75%, #1e3a8a 100%)",
      header: "text-white",
      subHeader: "text-blue-100",
      itemsDescription: "text-blue-100",
      button: { from: "blue", to: "indigo" },
      stepsBg: "bg-blue-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה כלי רפואי שמעת?",
    challengeIcon: "💊🩺🏥⚕️",
    challengeDescription: "בחר את הכלי הנכון!",
    itemLabel: "כלי רפואי",
    tip: "💡 טיפ: תשמע את שם הכלי!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הכלים למטה לשמוע את השמות",
  },

  "nature-sounds": {
    title: "🌿 משחק קולות הטבע 🦜",
    subTitle: "למד להכיר קולות מהטבע!",
    itemsTitle: "קולות הטבע שנלמד:",
    itemsDescription: "לחץ על קול כדי לשמוע אותו!",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזה קול טבע אני משמיע" },
      { icon: "🤔", title: "2. תחשוב", description: "מה יוצר את הקול הזה" },
      { icon: "👆", title: "3. תלחץ", description: "על הקול הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #d4e6f1 0%, #a8cfd8 25%, #7fbeaa 50%, #6bb091 75%, #5ba378 100%)",
      header: "text-white",
      subHeader: "text-green-100",
      itemsDescription: "text-green-100",
      button: { from: "green", to: "teal" },
      stepsBg: "bg-green-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה קול טבע שמעת?",
    challengeIcon: "🌿🦜🌊🌬️",
    challengeDescription: "בחר את הקול הנכון!",
    itemLabel: "קול טבע",
    tip: "💡 טיפ: תשמע את קול הטבע!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הקולות למטה לשמוע אותם",
  },

  "seasons-holidays": {
    title: "🍂 משחק עונות וחגים 🎄",
    subTitle: "למד על עונות השנה והחגים!",
    itemsTitle: "העונות והחגים שנלמד:",
    itemsDescription: "לחץ על עונה או חג כדי לשמוע על זה!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזו עונה או חג אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "מה מיוחד בזה" },
      { icon: "👆", title: "3. תלחץ", description: "על העונה או החג הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ffd89b 0%, #19547b 25%, #ff8a80 50%, #ffccbc 75%, #b39ddb 100%)",
      header: "text-white",
      subHeader: "text-orange-100",
      itemsDescription: "text-orange-100",
      button: { from: "orange", to: "purple" },
      stepsBg: "bg-orange-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזו עונה או חג שמעת?",
    challengeIcon: "🍂❄️🌸☀️",
    challengeDescription: "בחר את העונה או החג הנכון!",
    itemLabel: "עונה או חג",
    tip: "💡 טיפ: תשמע על העונה או החג!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על העונות והחגים למטה לשמוע עליהם",
  },

  feelings: {
    title: "😊 משחק רגשות 😢",
    subTitle: "למד להכיר ולזהות רגשות!",
    itemsTitle: "הרגשות שנלמד:",
    itemsDescription: "לחץ על רגש כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה רגש אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את שם הרגש" },
      { icon: "👆", title: "3. תלחץ", description: "על הרגש הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff9a9e 50%, #fecfef 75%, #fecfef 100%)",
      header: "text-white",
      subHeader: "text-pink-100",
      itemsDescription: "text-pink-100",
      button: { from: "pink", to: "rose" },
      stepsBg: "bg-pink-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה רגש ראית?",
    challengeIcon: "😊😢😡😴",
    challengeDescription: "בחר את הרגש הנכון!",
    itemLabel: "רגש",
    tip: "💡 טיפ: תראה את הרגש!",
    tipDescription: "לחץ על הסמל למעלה כדי לראות שוב, או על הרגשות למטה לשמוע את השמות",
  },

  "shopping-money": {
    title: "🛒 משחק קניות וכסף 💰",
    subTitle: "למד על קניות וחשבון כסף!",
    itemsTitle: "פריטי הקניות שנלמד:",
    itemsDescription: "לחץ על פריט כדי לשמוע את המחיר שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה פריט אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "כמה זה עולה" },
      { icon: "👆", title: "3. תלחץ", description: "על הפריט הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      header: "text-white",
      subHeader: "text-purple-100",
      itemsDescription: "text-purple-100",
      button: { from: "purple", to: "indigo" },
      stepsBg: "bg-purple-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה פריט לקניה שמעת?",
    challengeIcon: "🛒💰🛍️💳",
    challengeDescription: "בחר את הפריט הנכון!",
    itemLabel: "פריט לקניה",
    tip: "💡 טיפ: תשמע את המחיר!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הפריטים למטה לשמוע את המחירים",
  },

  "road-safety": {
    title: "🚦 משחק בטיחות בדרכים 🚗",
    subTitle: "למד על בטיחות וחוקי תנועה!",
    itemsTitle: "כללי הבטיחות שנלמד:",
    itemsDescription: "לחץ על כלל כדי לשמוע על חשיבותו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה כלל בטיחות אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "למה זה חשוב" },
      { icon: "👆", title: "3. תלחץ", description: "על הכלל הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ff7675 0%, #fdcb6e 25%, #6c5ce7 50%, #74b9ff 75%, #00b894 100%)",
      header: "text-white",
      subHeader: "text-red-100",
      itemsDescription: "text-red-100",
      button: { from: "red", to: "yellow" },
      stepsBg: "bg-red-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה כלל בטיחות שמעת?",
    challengeIcon: "🚦🚗👮‍♂️⚠️",
    challengeDescription: "בחר את הכלל הנכון!",
    itemLabel: "כלל בטיחות",
    tip: "💡 טיפ: תשמע על הבטיחות!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הכללים למטה לשמוע עליהם",
  },

  // 6 משחקים חדשים נוספים
  "ocean-life": {
    title: "🌊 משחק חיי ים 🐟",
    subTitle: "גלה בעלי חיים ימיים מרתקים!",
    itemsTitle: "בעלי החיים הימיים שנלמד:",
    itemsDescription: "לחץ על בעל חיים כדי לשמוע עליו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה בעל חיים ימי אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלו" },
      { icon: "👆", title: "3. תלחץ", description: "על בעל החיים הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)",
      header: "text-white",
      subHeader: "text-blue-100",
      itemsDescription: "text-blue-100",
      button: { from: "blue", to: "cyan" },
      stepsBg: "bg-blue-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה בעל חיים ימי שמעת?",
    challengeIcon: "🌊🐟🐬🦈",
    challengeDescription: "בחר את בעל החיים הנכון!",
    itemLabel: "בעל חיים ימי",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על בעלי החיים למטה לשמוע את השמות",
  },

  "garden-plants": {
    title: "🌺 משחק צמחי גן 🌻",
    subTitle: "למד על פרחים וצמחים יפים!",
    itemsTitle: "הצמחים והפרחים שנלמד:",
    itemsDescription: "לחץ על צמח כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה צמח או פרח אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלו" },
      { icon: "👆", title: "3. תלחץ", description: "על הצמח הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #56ab2f 0%, #a8e6cf 25%, #ff8a80 50%, #ffcc80 75%, #ce93d8 100%)",
      header: "text-white",
      subHeader: "text-green-100",
      itemsDescription: "text-green-100",
      button: { from: "green", to: "pink" },
      stepsBg: "bg-green-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה צמח או פרח שמעת?",
    challengeIcon: "🌺🌻🌹🌷",
    challengeDescription: "בחר את הצמח הנכון!",
    itemLabel: "צמח או פרח",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הצמחים למטה לשמוע את השמות",
  },

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
  },

  "cooking-kitchen": {
    title: "👨‍🍳 משחק בישול במטבח 🍳",
    subTitle: "למד על כלי מטבח ובישול!",
    itemsTitle: "כלי המטבח שנלמד:",
    itemsDescription: "לחץ על כלי כדי לשמוע את השם שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה כלי מטבח אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלו" },
      { icon: "👆", title: "3. תלחץ", description: "על הכלי הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 25%, #48dbfb 50%, #ff9ff3 75%, #54a0ff 100%)",
      header: "text-white",
      subHeader: "text-orange-100",
      itemsDescription: "text-orange-100",
      button: { from: "orange", to: "red" },
      stepsBg: "bg-orange-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה כלי מטבח שמעת?",
    challengeIcon: "👨‍🍳🍳🍲🥄",
    challengeDescription: "בחר את הכלי הנכון!",
    itemLabel: "כלי מטבח",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על כלי המטבח למטה לשמוע את השמות",
  },

  "circus-show": {
    title: "🎪 משחק מופע קרקס 🤡",
    subTitle: "הכנס לעולם הקרקס המרתק!",
    itemsTitle: "אומני הקרקס שנלמד:",
    itemsDescription: "לחץ על אומן כדי לשמוע עליו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה אומן קרקס אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלו" },
      { icon: "👆", title: "3. תלחץ", description: "על האומן הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ff7675 0%, #fdcb6e 25%, #e17055 50%, #6c5ce7 75%, #74b9ff 100%)",
      header: "text-white",
      subHeader: "text-red-100",
      itemsDescription: "text-red-100",
      button: { from: "red", to: "yellow" },
      stepsBg: "bg-red-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה אומן קרקס שמעת?",
    challengeIcon: "🎪🤡🐘🦁",
    challengeDescription: "בחר את האומן הנכון!",
    itemLabel: "אומן קרקס",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על האומנים למטה לשמוע את השמות",
  },

  // 6 משחקים טכנולוגיים חדשים
  "virtual-reality": {
    title: "🥽 משחק מציאות מדומה 🌐",
    subTitle: "גלה את עולם הטכנולוגיה המתקדמת!",
    itemsTitle: "טכנולוגיות VR שנלמד:",
    itemsDescription: "לחץ על טכנולוגיה כדי לשמוע עליה!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזו טכנולוגיה אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלה" },
      { icon: "👆", title: "3. תלחץ", description: "על הטכנולוגיה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      header: "text-white",
      subHeader: "text-blue-100",
      itemsDescription: "text-blue-100",
      button: { from: "blue", to: "purple" },
      stepsBg: "bg-blue-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזו טכנולוגיה שמעת?",
    challengeIcon: "🥽🌐💻🎮",
    challengeDescription: "בחר את הטכנולוגיה הנכונה!",
    itemLabel: "טכנולוגיה",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הטכנולוגיות למטה לשמוע את השמות",
  },

  "new-professions": {
    title: "👨‍💻 משחק מקצועות חדשים 👩‍🚀",
    subTitle: "מקצועות העתיד כבר כאן!",
    itemsTitle: "מקצועות העתיד שנלמד:",
    itemsDescription: "לחץ על מקצוע כדי לשמוע עליו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה מקצוע אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלו" },
      { icon: "👆", title: "3. תלחץ", description: "על המקצוע הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #00c9ff 0%, #92fe9d 25%, #00d2ff 50%, #3a7bd5 75%, #00d2ff 100%)",
      header: "text-white",
      subHeader: "text-blue-100",
      itemsDescription: "text-blue-100",
      button: { from: "cyan", to: "blue" },
      stepsBg: "bg-cyan-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה מקצוע שמעת?",
    challengeIcon: "👨‍💻👩‍🚀🤖🎯",
    challengeDescription: "בחר את המקצוע הנכון!",
    itemLabel: "מקצוע",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על המקצועות למטה לשמוע את השמות",
  },

  "advanced-weather": {
    title: "🌪️ משחק מזג אוויר מתקדם ⚡",
    subTitle: "תופעות מזג אוויר מרהיבות!",
    itemsTitle: "תופעות מזג אוויר שנלמד:",
    itemsDescription: "לחץ על תופעה כדי לשמוע עליה!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזו תופעה אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלה" },
      { icon: "👆", title: "3. תלחץ", description: "על התופעה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #74b9ff 0%, #0984e3 25%, #6c5ce7 50%, #a29bfe 75%, #fd79a8 100%)",
      header: "text-white",
      subHeader: "text-blue-100",
      itemsDescription: "text-blue-100",
      button: { from: "blue", to: "indigo" },
      stepsBg: "bg-blue-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזו תופעת מזג אוויר שמעת?",
    challengeIcon: "🌪️⚡🌀❄️",
    challengeDescription: "בחר את התופעה הנכונה!",
    itemLabel: "תופעת מזג אוויר",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על התופעות למטה לשמוע את השמות",
  },

  "advanced-colors": {
    title: "🎨 משחק צבעים מתקדם 💎",
    subTitle: "גוונים וצבעים מיוחדים!",
    itemsTitle: "צבעים מיוחדים שנלמד:",
    itemsDescription: "לחץ על צבע כדי לשמוע עליו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה צבע אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלו" },
      { icon: "👆", title: "3. תלחץ", description: "על הצבע הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ff7675 0%, #fdcb6e 25%, #6c5ce7 50%, #00b894 75%, #e17055 100%)",
      header: "text-white",
      subHeader: "text-pink-100",
      itemsDescription: "text-pink-100",
      button: { from: "pink", to: "red" },
      stepsBg: "bg-pink-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה צבע שמעת?",
    challengeIcon: "🎨💎🪸🟣",
    challengeDescription: "בחר את הצבע הנכון!",
    itemLabel: "צבע",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הצבעים למטה לשמוע את השמות",
  },

  "jewish-holidays": {
    title: "🕯️ משחק חגים יהודיים 📜",
    subTitle: "למד על חגי ישראל המיוחדים!",
    itemsTitle: "חגים יהודיים שנלמד:",
    itemsDescription: "לחץ על חג כדי לשמוע עליו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה חג אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלו" },
      { icon: "👆", title: "3. תלחץ", description: "על החג הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff9a9e 50%, #fecfef 75%, #fecfef 100%)",
      header: "text-purple-800",
      subHeader: "text-purple-700",
      itemsDescription: "text-purple-700",
      button: { from: "purple", to: "pink" },
      stepsBg: "bg-purple-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה חג יהודי שמעת?",
    challengeIcon: "🕯️📜✡️🍯",
    challengeDescription: "בחר את החג הנכון!",
    itemLabel: "חג יהודי",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על החגים למטה לשמוע את השמות",
  },

  "logic-games": {
    title: "🧩 משחק משחקי לוגיקה 🎯",
    subTitle: "פתח את כושר החשיבה שלך!",
    itemsTitle: "משחקי לוגיקה שנלמד:",
    itemsDescription: "לחץ על משחק כדי לשמוע עליו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה משחק אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלו" },
      { icon: "👆", title: "3. תלחץ", description: "על המשחק הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      header: "text-white",
      subHeader: "text-indigo-100",
      itemsDescription: "text-indigo-100",
      button: { from: "indigo", to: "purple" },
      stepsBg: "bg-indigo-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה משחק לוגיקה שמעת?",
    challengeIcon: "🧩🎯♟️🎲",
    challengeDescription: "בחר את המשחק הנכון!",
    itemLabel: "משחק לוגיקה",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על המשחקים למטה לשמוע את השמות",
  },

  // 6 משחקים חדשניים יוצאי דופן
  "sound-imitation": {
    title: "🎤 משחק חיקוי קולות ורעשים 🔊",
    subTitle: "חקה קולות וגלה את עולם הצלילים!",
    itemsTitle: "קולות ורעשים שנלמד:",
    itemsDescription: "לחץ על פריט כדי לשמוע את הקול שלו!",
    steps: [
      { icon: "🎧", title: "1. תשמע", description: "איזה קול אני משמיע" },
      { icon: "🎤", title: "2. תחקה", description: "נסה לחקות את הקול" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על התמונה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #56ab2f 0%, #a8e6a1 25%, #56ab2f 50%, #7bb33f 75%, #4a934a 100%)",
      header: "text-white",
      subHeader: "text-green-100",
      itemsDescription: "text-green-100",
      button: { from: "green", to: "emerald" },
      stepsBg: "bg-green-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto",
    },
    challengeTitle: "איזה קול שמעת?",
    challengeIcon: "🎤🔊🎵🔉",
    challengeDescription: "חקה את הקול ובחר את התמונה הנכונה!",
    itemLabel: "קול",
    tip: "💡 טיפ: תקשיב בעיון לקול!",
    tipDescription: "חקה את הקול שאתה שומע ואז בחר את התמונה המתאימה",
  },

  "body-movements": {
    title: "🤸 משחק תנועות גוף וריקוד 💃",
    subTitle: "תזוז, תרקוד ותהנה מהגוף שלך!",
    itemsTitle: "תנועות שנלמד:",
    itemsDescription: "לחץ על תנועה כדי לראות איך לעשות אותה!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזו תנועה אני מראה" },
      { icon: "🤸", title: "2. תבצע", description: "עשה את התנועה בעצמך" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על התנועה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 25%, #ff9ff3 50%, #54a0ff 75%, #5f27cd 100%)",
      header: "text-white",
      subHeader: "text-pink-100",
      itemsDescription: "text-pink-100",
      button: { from: "pink", to: "purple" },
      stepsBg: "bg-pink-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto",
    },
    challengeTitle: "איזו תנועה ביצעת?",
    challengeIcon: "🤸💃🧘‍♀️🕺",
    challengeDescription: "בצע את התנועה ובחר את התשובה הנכונה!",
    itemLabel: "תנועה",
    tip: "💡 טיפ: תזוז בבטחה!",
    tipDescription: "בצע את התנועה בזהירות ובחר את התנועה שביצעת",
  },

  "touch-senses": {
    title: "🤚 משחק מגע וחושים 🌡️",
    subTitle: "חקור מרקמים וחושים מרתקים!",
    itemsTitle: "חושים ומרקמים שנלמד:",
    itemsDescription: "לחץ על פריט כדי לדמיין את החושים!",
    steps: [
      { icon: "🤚", title: "1. תרגיש", description: "דמיין איך זה מרגיש" },
      { icon: "🧠", title: "2. תחשוב", description: "איזה חוש זה מפעיל" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על התשובה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 75%, #43e97b 100%)",
      header: "text-white",
      subHeader: "text-orange-100",
      itemsDescription: "text-orange-100",
      button: { from: "orange", to: "red" },
      stepsBg: "bg-orange-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto",
    },
    challengeTitle: "איזה חוש הפעלת?",
    challengeIcon: "🤚🌡️👃👅",
    challengeDescription: "דמיין את החוש ובחר את התשובה הנכונה!",
    itemLabel: "חוש",
    tip: "💡 טיפ: השתמש בדמיון!",
    tipDescription: "דמיין איך זה מרגיש, נשמע או נראה, ואז בחר",
  },

  "emotional-social": {
    title: "💖 משחק מציאות רגשית וחברתית 🤝",
    subTitle: "פתח אינטליגנציה רגשית וחברתית!",
    itemsTitle: "רגשות ומצבים שנלמד:",
    itemsDescription: "לחץ על רגש כדי להבין אותו!",
    steps: [
      { icon: "💭", title: "1. תחשוב", description: "איך אתה מרגיש במצב הזה" },
      { icon: "💖", title: "2. תהבן", description: "מה הרגש הזה אומר" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על הרגש הנכון" },
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
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto",
    },
    challengeTitle: "איזה רגש זה?",
    challengeIcon: "💖🤝😊😢",
    challengeDescription: "הבן את הרגש ובחר את התשובה הנכונה!",
    itemLabel: "רגש",
    tip: "💡 טיפ: תחבר לרגש שלך!",
    tipDescription: "חשוב על זמן שהרגשת כך, ואז בחר את הרגש המתאים",
  },

  "time-clock": {
    title: "⏰ משחק זמן ושעות היום 📅",
    subTitle: "למד על זמן, שעות וזמנים מיוחדים!",
    itemsTitle: "מושגי זמן שנלמד:",
    itemsDescription: "לחץ על מושג זמן כדי ללמוד עליו!",
    steps: [
      { icon: "🕐", title: "1. תראה", description: "איזה זמן אני מציג" },
      { icon: "🧠", title: "2. תחשוב", description: "מתי זה קורה ביום" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על הזמן הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #43e97b 50%, #38f9d7 75%, #667eea 100%)",
      header: "text-white",
      subHeader: "text-blue-100",
      itemsDescription: "text-blue-100",
      button: { from: "blue", to: "cyan" },
      stepsBg: "bg-blue-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto",
    },
    challengeTitle: "איזה זמן זה?",
    challengeIcon: "⏰📅🌅🌙",
    challengeDescription: "זהה את הזמן ובחר את התשובה הנכונה!",
    itemLabel: "זמן",
    tip: "💡 טיפ: חשוב על היום שלך!",
    tipDescription: "חשוב מה אתה עושה בזמנים שונים ביום, ואז בחר",
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
  },

  "birds": {
    title: "🦅 משחק ציפורים 🐦",
    subTitle: "הכר ציפורים מרחבי העולם!",
    itemsTitle: "הציפורים שנלמד:",
    itemsDescription: "לחץ על ציפור כדי לגלות עליה!",
    steps: [
      { icon: "🦅", title: "1. תראה", description: "איזו ציפור אני מציג" },
      { icon: "👂", title: "2. תשמע", description: "שמע את שם הציפור" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על הציפור הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #56CCF2 0%, #2F80ED 50%, #87CEEB 100%)",
      header: "text-white",
      subHeader: "text-sky-100",
      itemsDescription: "text-sky-100",
      button: { from: "sky", to: "blue" },
      stepsBg: "bg-sky-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto",
    },
    challengeTitle: "איזו ציפור זו?",
    challengeIcon: "🦅🐦🦜🦩",
    challengeDescription: "זהה את הציפור ובחר את התשובה הנכונה!",
    itemLabel: "ציפור",
    tip: "💡 טיפ: שים לב לצבעים!",
    tipDescription: "כל ציפור ייחודית בצבעיה ואורח חייה",
  },

  "bugs-insects": {
    title: "🦋 חרקים ופרפרים 🐛",
    subTitle: "עולם זעיר ומרתק!",
    itemsTitle: "החרקים שנלמד:",
    itemsDescription: "לחץ על חרק כדי לגלות עליו!",
    steps: [
      { icon: "🦋", title: "1. תראה", description: "איזה חרק אני מציג" },
      { icon: "👂", title: "2. תשמע", description: "שמע את שם החרק" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על החרק הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 50%, #a1c4fd 100%)",
      header: "text-white",
      subHeader: "text-lime-100",
      itemsDescription: "text-lime-100",
      button: { from: "lime", to: "green" },
      stepsBg: "bg-lime-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto",
    },
    challengeTitle: "איזה חרק זה?",
    challengeIcon: "🦋🐝🐛🐞",
    challengeDescription: "זהה את החרק ובחר את התשובה הנכונה!",
    itemLabel: "חרק",
    tip: "💡 טיפ: שימו לב לכנפיים!",
    tipDescription: "לכל חרק סימנים ייחודיים שעוזרים לזהות אותו",
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
  },
  // משחקי גיאוגרפיה
  "flags": {
    title: "🌍 משחק דגלי מדינות",
    subTitle: "זהה את הדגל של כל מדינה!",
    itemsTitle: "מדינות העולם שלנו:",
    itemsDescription: "לחץ על המדינה הנכונה!",
    steps: [
      { icon: "🌍", title: "1. תראה", description: "איזה דגל מוצג?" },
      { icon: "🔊", title: "2. תשמע", description: "שמע את שם המדינה" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על המדינה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      header: "text-white",
      subHeader: "text-blue-100",
      itemsDescription: "text-blue-100",
      button: { from: "blue", to: "indigo" },
      stepsBg: "bg-blue-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto",
    },
    challengeTitle: "של איזו מדינה הדגל הזה?",
    challengeIcon: "🌍🗺️🌐",
    challengeDescription: "זהה את הדגל ובחר את התשובה הנכונה!",
    itemLabel: "מדינה",
    tip: "💡 טיפ: שים לב לצבעים!",
    tipDescription: "לכל דגל יש צבעים וסמלים ייחודיים שעוזרים לזהות את המדינה",
  },
};
