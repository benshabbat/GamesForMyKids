import type { GameUIConfig } from '../gameUIConfig.types';

export const timeLearningConfigs: Partial<Record<string, GameUIConfig>> = {
  "seasons-holidays": {
    title: "🍂 משחק עונות וחגים 🎄",
    subTitle: "למד על עונות השנה והחגים!",
    itemsTitle: "העונות והחגים שנלמד:",
    itemsDescription: "לחץ על עונה או חג כדי לשמוע על זה!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזו עונה או חג אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "מה מיוחד בזה" },
      { icon: "👆", title: "3. תלחץ", description: "על העונה או החג הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #ffd89b 0%, #19547b 25%, #ff8a80 50%, #ffccbc 75%, #b39ddb 100%)",
      header: "text-white",
      subHeader: "text-orange-100",
      itemsDescription: "text-orange-100",
      button: { from: "orange", to: "purple" },
      stepsBg: "bg-orange-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזו עונה או חג שמעת?",
    challengeIcon: "🍂❄️🌸☀️",
    challengeDescription: "בחר את העונה או החג הנכון!",
    itemLabel: "עונה או חג",
    tip: "💡 טיפ: תשמע על העונה או החג!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על העונות והחגים למטה לשמוע עליהם",
  },

  "coins-match": {
    title: "🪙 מטבעות ישראליים 💰",
    subTitle: "למד לזהות את מטבעות ישראל!",
    itemsTitle: "המטבעות שנלמד:",
    itemsDescription: "לחץ על מטבע כדי לשמוע את ערכו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה מטבע אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "את שם המטבע" },
      { icon: "👆", title: "3. תלחץ", description: "על המטבע הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #f6d365 0%, #fda085 50%, #f093fb 100%)",
      header: "text-yellow-900",
      subHeader: "text-yellow-800",
      itemsDescription: "text-yellow-800",
      button: { from: "yellow", to: "amber" },
      stepsBg: "bg-yellow-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה מטבע שמעת?",
    challengeIcon: "🪙💰💎",
    challengeDescription: "בחר את המטבע הנכון!",
    itemLabel: "מטבע",
    tip: "💡 טיפ: תשמע את שם המטבע!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב",
    metadata: {
      keywords: "מטבעות ישראל שקל אגורה כסף כלכלה",
      description: "למד לזהות מטבעות ישראליים — עשרה אגורות, חמישים אגורות, שקל, שני שקלים, חמישה שקלים, עשרה שקלים",
    },
  },

  "shopping-money": {
    title: "🛒 משחק קניות וכסף 💰",
    subTitle: "למד על קניות וחשבון כסף!",
    itemsTitle: "פריטי הקניות שנלמד:",
    itemsDescription: "לחץ על פריט כדי לשמוע את המחיר שלו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה פריט אני מבקש" },
      { icon: "🎤", title: "2. תשמע", description: "כמה זה עולה" },
      { icon: "👆", title: "3. תלחץ", description: "על הפריט הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      header: "text-white",
      subHeader: "text-purple-100",
      itemsDescription: "text-purple-100",
      button: { from: "purple", to: "indigo" },
      stepsBg: "bg-purple-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה פריט לקניה שמעת?",
    challengeIcon: "🛒💰🛍️💳",
    challengeDescription: "בחר את הפריט הנכון!",
    itemLabel: "פריט לקניה",
    tip: "💡 טיפ: תשמע את המחיר!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על הפריטים למטה לשמוע את המחירים",
  },
};
