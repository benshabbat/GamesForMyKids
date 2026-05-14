import type { GameUIConfig } from '../gameUIConfig.types';

export const peopleConfigs: Partial<Record<string, GameUIConfig>> = {
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
};
