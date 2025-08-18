/**
 * ===============================================
 * Game Config Factory - יצירת קונפיגורציות אוטומטית
 * ===============================================
 * 
 * פתרון לדופליקייטים בקונפיגורציות המשחקים
 */

import { GameUIConfig } from "@/lib/constants/ui/gameConfigs";

interface GameTheme {
  primary: string;
  secondary: string;
  background: string;
  headerText: string;
  subHeaderText: string;
}

const GAME_THEMES: Record<string, GameTheme> = {
  warm: {
    primary: "orange",
    secondary: "red", 
    background: "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 25%, #e17055 50%, #fdcb6e 75%, #f39c12 100%)",
    headerText: "text-white",
    subHeaderText: "text-orange-100"
  },
  cool: {
    primary: "blue",
    secondary: "indigo",
    background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 25%, #a5b4fc 50%, #818cf8 75%, #6366f1 100%)",
    headerText: "text-white", 
    subHeaderText: "text-indigo-100"
  },
  nature: {
    primary: "green",
    secondary: "emerald",
    background: "linear-gradient(135deg, #d4f1d4 0%, #a8e6a8 25%, #7dd87d 50%, #52c952 75%, #26b926 100%)",
    headerText: "text-white",
    subHeaderText: "text-green-100"
  },
  rainbow: {
    primary: "teal",
    secondary: "cyan",
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #a8e6cf 50%, #dcedc1 75%, #ffd3e1 100%)",
    headerText: "text-purple-800",
    subHeaderText: "text-purple-600"
  }
};

/**
 * יוצר קונפיגורציית משחק סטנדרטית
 */
export function createGameConfig(options: {
  title: string;
  subTitle: string;
  itemsTitle: string;
  itemsDescription: string;
  challengeTitle: string;
  challengeIcon: string;
  challengeDescription: string;
  itemLabel: string;
  itemType: string; // "צבע", "צורה", "חיה" וכו'
  theme: keyof typeof GAME_THEMES;
  gridClassName?: string;
  showSpeaker?: boolean;
  metadata?: {
    keywords?: string;
    description?: string;
  };
}): GameUIConfig {
  
  const theme = GAME_THEMES[options.theme];
  
  return {
    title: options.title,
    subTitle: options.subTitle,
    itemsTitle: options.itemsTitle,
    itemsDescription: options.itemsDescription,
    
    // תבנית steps סטנדרטית
    steps: [
      { icon: "👂", title: "1. תשמע", description: `איזה ${options.itemType} אני אומר` },
      { icon: "🤔", title: "2. תחשוב", description: `איך ה${options.itemType} נראה` },
      { icon: "👆", title: "3. תלחץ", description: `על ה${options.itemType} הנכון` },
    ],
    
    // צבעים מהתמה
    colors: {
      background: theme.background,
      header: theme.headerText,
      subHeader: theme.subHeaderText,
      itemsDescription: theme.subHeaderText,
      button: { from: theme.primary, to: theme.secondary },
      stepsBg: `bg-${theme.primary}-100 bg-opacity-90`,
    },
    
    grid: {
      className: options.gridClassName || "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
      showSpeaker: options.showSpeaker ?? false,
    },
    
    // AutoGamePage props
    challengeTitle: options.challengeTitle,
    challengeIcon: options.challengeIcon,
    challengeDescription: options.challengeDescription,
    itemLabel: options.itemLabel,
    tip: `💡 טיפ: תשמע את שם ה${options.itemType}!`,
    tipDescription: `לחץ על הסמל למעלה כדי לשמוע שוב, או על ה${options.itemType}ים למטה לשמוע את השמות`,
    
    metadata: options.metadata,
  };
}

/**
 * קונפיגורציות מוכנות למשחקים נפוצים
 */
export const GAME_CONFIG_PRESETS = {
  colors: () => createGameConfig({
    title: "🎨 משחק צבעים 🎨",
    subTitle: "למד צבעים דרך משחק!",
    itemsTitle: "הצבעים שנלמד:",
    itemsDescription: "לחץ על צבע כדי לשמוע את השם שלו!",
    challengeTitle: "איזה צבע שמעת?",
    challengeIcon: "🎨🌈🖍️🎪",
    challengeDescription: "בחר את הצבע הנכון!",
    itemLabel: "צבע",
    itemType: "צבע",
    theme: "rainbow"
  }),
  
  animals: () => createGameConfig({
    title: "🐶 משחק חיות 🐱",
    subTitle: "למד חיות דרך שמיעה!",
    itemsTitle: "כל החיות שנלמד:",
    itemsDescription: "לחץ על חיה כדי לשמוע את השם שלה!",
    challengeTitle: "איזו חיה שמעת?",
    challengeIcon: "🐾🐄🐶🐱",
    challengeDescription: "בחר את החיה הנכונה!",
    itemLabel: "חיה",
    itemType: "חיה",
    theme: "nature"
  }),
  
  shapes: () => createGameConfig({
    title: "🔺 משחק צורות 🟡",
    subTitle: "למד צורות דרך שמיעה!",
    itemsTitle: "הצורות שנלמד:",
    itemsDescription: "לחץ על צורה כדי לשמוע את השם שלה!",
    challengeTitle: "איזו צורה שמעת?",
    challengeIcon: "🔺🟡⭐💎",
    challengeDescription: "בחר את הצורה הנכונה!",
    itemLabel: "צורה",
    itemType: "צורה",
    theme: "nature"
  }),
  
  numbers: () => createGameConfig({
    title: "🔢 משחק מספרים 🎯",
    subTitle: "למד מספרים דרך שמיעה!",
    itemsTitle: "המספרים שנלמד:",
    itemsDescription: "לחץ על מספר כדי לשמוע אותו!",
    challengeTitle: "איזה מספר שמעת?",
    challengeIcon: "🔢🎯123️⃣",
    challengeDescription: "בחר את המספר הנכון!",
    itemLabel: "מספר",
    itemType: "מספר",
    theme: "cool"
  }),
};
