import type { GameUIConfig } from '../gameUIConfig.types';

export const objectsConfigs: Partial<Record<string, GameUIConfig>> = {
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
};
