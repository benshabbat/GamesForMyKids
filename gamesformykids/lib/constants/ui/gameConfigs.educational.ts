import type { GameUIConfig } from './gameUIConfig.types';

export const educationalConfigs: Partial<Record<string, GameUIConfig>> = {
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
};
