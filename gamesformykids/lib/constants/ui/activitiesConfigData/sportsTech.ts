import type { GameUIConfig } from '../gameUIConfig.types';

export const sportsTechConfigs: Partial<Record<string, GameUIConfig>> = {
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
};
