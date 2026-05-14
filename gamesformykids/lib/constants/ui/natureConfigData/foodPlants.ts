import type { GameUIConfig } from '../gameUIConfig.types';

export const foodPlantsConfigs: Partial<Record<string, GameUIConfig>> = {
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
};
