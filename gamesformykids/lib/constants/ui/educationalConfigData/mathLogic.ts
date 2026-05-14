import type { GameUIConfig } from '../gameUIConfig.types';

export const mathLogicConfigs: Partial<Record<string, GameUIConfig>> = {
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
};
