import type { GameUIConfig } from '../gameUIConfig.types';

export const socialEmotionalConfigs: Partial<Record<string, GameUIConfig>> = {
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
  },
};
