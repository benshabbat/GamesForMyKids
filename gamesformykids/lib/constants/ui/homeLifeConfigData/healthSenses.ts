import type { GameUIConfig } from '../gameUIConfig.types';

export const healthSensesConfigs: Partial<Record<string, GameUIConfig>> = {
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
};
