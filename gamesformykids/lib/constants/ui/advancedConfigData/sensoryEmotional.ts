import type { GameUIConfig } from '../gameUIConfig.types';

export const sensoryEmotionalConfigs: Partial<Record<string, GameUIConfig>> = {
  "sound-imitation": {
    title: "🎤 משחק חיקוי קולות ורעשים 🔊",
    subTitle: "חקה קולות וגלה את עולם הצלילים!",
    itemsTitle: "קולות ורעשים שנלמד:",
    itemsDescription: "לחץ על פריט כדי לשמוע את הקול שלו!",
    steps: [
      { icon: "🎧", title: "1. תשמע", description: "איזה קול אני משמיע" },
      { icon: "🎤", title: "2. תחקה", description: "נסה לחקות את הקול" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על התמונה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #56ab2f 0%, #a8e6a1 25%, #56ab2f 50%, #7bb33f 75%, #4a934a 100%)",
      header: "text-white",
      subHeader: "text-green-100",
      itemsDescription: "text-green-100",
      button: { from: "green", to: "emerald" },
      stepsBg: "bg-green-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto",
    },
    challengeTitle: "איזה קול שמעת?",
    challengeIcon: "🎤🔊🎵🔉",
    challengeDescription: "חקה את הקול ובחר את התמונה הנכונה!",
    itemLabel: "קול",
    tip: "💡 טיפ: תקשיב בעיון לקול!",
    tipDescription: "חקה את הקול שאתה שומע ואז בחר את התמונה המתאימה",
  },

  "touch-senses": {
    title: "🤚 משחק מגע וחושים 🌡️",
    subTitle: "חקור מרקמים וחושים מרתקים!",
    itemsTitle: "חושים ומרקמים שנלמד:",
    itemsDescription: "לחץ על פריט כדי לדמיין את החושים!",
    steps: [
      { icon: "🤚", title: "1. תרגיש", description: "דמיין איך זה מרגיש" },
      { icon: "🧠", title: "2. תחשוב", description: "איזה חוש זה מפעיל" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על התשובה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 75%, #43e97b 100%)",
      header: "text-white",
      subHeader: "text-orange-100",
      itemsDescription: "text-orange-100",
      button: { from: "orange", to: "red" },
      stepsBg: "bg-orange-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto",
    },
    challengeTitle: "איזה חוש הפעלת?",
    challengeIcon: "🤚🌡️👃👅",
    challengeDescription: "דמיין את החוש ובחר את התשובה הנכונה!",
    itemLabel: "חוש",
    tip: "💡 טיפ: השתמש בדמיון!",
    tipDescription: "דמיין איך זה מרגיש, נשמע או נראה, ואז בחר",
  },

  "emotional-social": {
    title: "💖 משחק מציאות רגשית וחברתית 🤝",
    subTitle: "פתח אינטליגנציה רגשית וחברתית!",
    itemsTitle: "רגשות ומצבים שנלמד:",
    itemsDescription: "לחץ על רגש כדי להבין אותו!",
    steps: [
      { icon: "💭", title: "1. תחשוב", description: "איך אתה מרגיש במצב הזה" },
      { icon: "💖", title: "2. תהבן", description: "מה הרגש הזה אומר" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על הרגש הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      header: "text-white",
      subHeader: "text-purple-100",
      itemsDescription: "text-purple-100",
      button: { from: "purple", to: "pink" },
      stepsBg: "bg-purple-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto",
    },
    challengeTitle: "איזה רגש זה?",
    challengeIcon: "💖🤝😊😢",
    challengeDescription: "הבן את הרגש ובחר את התשובה הנכונה!",
    itemLabel: "רגש",
    tip: "💡 טיפ: תחבר לרגש שלך!",
    tipDescription: "חשוב על זמן שהרגשת כך, ואז בחר את הרגש המתאים",
  },
};
