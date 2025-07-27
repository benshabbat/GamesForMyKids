/**
 * ===============================================
 * קונפיגורציות UI מרוכזות למשחקים
 * ===============================================
 * 
 * קובץ אחד שמכיל את כל הקונפיגורציות עבור AutoStartScreen
 * מחליף את useGameStartScreenConfig ואת כל הקבועים הפזורים
 */

import { GameStep } from "@/lib/types/ui";
import { GameType } from "@/lib/types/base";

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
      showSpeaker: true,
    },
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
      showSpeaker: true,
    },
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
      showSpeaker: true,
    },
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
      showSpeaker: true,
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
      showSpeaker: true,
    },
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
      showSpeaker: true,
    },
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
      showSpeaker: true,
    },
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
      showSpeaker: true,
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
      showSpeaker: true,
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
      showSpeaker: true,
    },
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
      showSpeaker: true,
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
      showSpeaker: true,
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
      showSpeaker: true,
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
      showSpeaker: true,
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
      showSpeaker: true,
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
      showSpeaker: true,
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
      showSpeaker: true,
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
      showSpeaker: true,
    },
  },
};
