import type { GameUIConfig } from '../gameUIConfig.types';

export const coreLearningConfigs: Partial<Record<string, GameUIConfig>> = {
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
};
