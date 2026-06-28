import type { GameUIConfig } from '../gameUIConfig.types';

export const animalsCreaturesConfigs: Partial<Record<string, GameUIConfig>> = {
  animals: {
    title: "🐶 משחק חיות 🐱",
    subTitle: "למד חיות דרך שמיעה!",
    itemsTitle: "כל החיות שנלמד:",
    itemsDescription: "לחץ על חיה כדי לשמוע את השם שלה! חיות מקסימות",
    steps: [
      { icon: "👂", title: "1. תשמע", description: "איזו חיה אני אומר" },
      { icon: "🤔", title: "2. תחשוב", description: "איך החיה נראית" },
      { icon: "👆", title: "3. תלחץ", description: "על החיה הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #d4f1d4 0%, #a8e6a8 25%, #7dd87d 50%, #52c952 75%, #10b981 100%)",
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
    challengeTitle: "איזו חיה שמעת?",
    challengeIcon: "🐾🐄🐶🐱",
    challengeDescription: "בחר את החיה הנכונה!",
    itemLabel: "חיה",
    tip: "💡 טיפ: תשמע את שם החיה שאני אומר!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על החיות למטה לשמוע את השמות",
    // 🔍 מטאדאטה SEO
    metadata: {
      keywords: "משחק חיות לילדים, למידת בעלי חיים, משחקים חינוכיים, גיל 2-10, פעוטות, חיות בעברית",
      description: "משחק אינטראקטיבי ללימוד בעלי חיים לילדים בגילאי 2-10. למדו על חיות שונות בעברית דרך משחק מהנה!",
    },
  },

  "ocean-life": {
    title: "🌊 משחק חיי ים 🐟",
    subTitle: "גלה בעלי חיים ימיים מרתקים!",
    itemsTitle: "בעלי החיים הימיים שנלמד:",
    itemsDescription: "לחץ על בעל חיים כדי לשמוע עליו!",
    steps: [
      { icon: "👀", title: "1. תראה", description: "איזה בעל חיים ימי אני מציג" },
      { icon: "🎤", title: "2. תשמע", description: "את השם שלו" },
      { icon: "👆", title: "3. תלחץ", description: "על בעל החיים הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)",
      header: "text-white",
      subHeader: "text-blue-100",
      itemsDescription: "text-blue-100",
      button: { from: "blue", to: "cyan" },
      stepsBg: "bg-blue-100 bg-opacity-90",
    },
    grid: {
      className: "flex flex-wrap justify-center gap-4",
    },
    challengeTitle: "איזה בעל חיים ימי שמעת?",
    challengeIcon: "🌊🐟🐬🦈",
    challengeDescription: "בחר את בעל החיים הנכון!",
    itemLabel: "בעל חיים ימי",
    tip: "💡 טיפ: תשמע את השם!",
    tipDescription: "לחץ על הסמל למעלה כדי לשמוע שוב, או על בעלי החיים למטה לשמוע את השמות",
    metadata: {
      keywords: "חיי הים, דגים, כריש, דולפין, תמנון, בעלי חיים ימיים, ים ואוקיינוס",
      description: "גלו את עולם הים הקסום! למדו על בעלי חיים ימיים — דגים, כרישים, תמנונים ועוד לגיל 4-9.",
    },
  },

  "birds": {
    title: "🦅 משחק ציפורים 🐦",
    subTitle: "הכר ציפורים מרחבי העולם!",
    itemsTitle: "הציפורים שנלמד:",
    itemsDescription: "לחץ על ציפור כדי לגלות עליה!",
    steps: [
      { icon: "🦅", title: "1. תראה", description: "איזו ציפור אני מציג" },
      { icon: "👂", title: "2. תשמע", description: "שמע את שם הציפור" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על הציפור הנכונה" },
    ],
    colors: {
      background: "linear-gradient(135deg, #56CCF2 0%, #2F80ED 50%, #87CEEB 100%)",
      header: "text-white",
      subHeader: "text-sky-100",
      itemsDescription: "text-sky-100",
      button: { from: "sky", to: "blue" },
      stepsBg: "bg-sky-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto",
    },
    challengeTitle: "איזו ציפור זו?",
    challengeIcon: "🦅🐦🦜🦩",
    challengeDescription: "זהה את הציפור ובחר את התשובה הנכונה!",
    itemLabel: "ציפור",
    tip: "💡 טיפ: שים לב לצבעים!",
    tipDescription: "כל ציפור ייחודית בצבעיה ואורח חייה",
    metadata: {
      keywords: "ציפורים, עופות, נשר, תוכי, ינשוף, ציפורים בעברית, טבע, גיל 4-9",
      description: "הכירו ציפורים מרהיבות מרחבי העולם! נשרים, תוכים, ינשופים ועוד — לגיל 4-9.",
    },
  },

  "bugs-insects": {
    title: "🦋 חרקים ופרפרים 🐛",
    subTitle: "עולם זעיר ומרתק!",
    itemsTitle: "החרקים שנלמד:",
    itemsDescription: "לחץ על חרק כדי לגלות עליו!",
    steps: [
      { icon: "🦋", title: "1. תראה", description: "איזה חרק אני מציג" },
      { icon: "👂", title: "2. תשמע", description: "שמע את שם החרק" },
      { icon: "👆", title: "3. תבחר", description: "לחץ על החרק הנכון" },
    ],
    colors: {
      background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 50%, #a1c4fd 100%)",
      header: "text-white",
      subHeader: "text-lime-100",
      itemsDescription: "text-lime-100",
      button: { from: "lime", to: "green" },
      stepsBg: "bg-lime-100 bg-opacity-90",
    },
    grid: {
      className: "grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto",
    },
    challengeTitle: "איזה חרק זה?",
    challengeIcon: "🦋🐝🐛🐞",
    challengeDescription: "זהה את החרק ובחר את התשובה הנכונה!",
    itemLabel: "חרק",
    tip: "💡 טיפ: שימו לב לכנפיים!",
    tipDescription: "לכל חרק סימנים ייחודיים שעוזרים לזהות אותו",
    metadata: {
      keywords: "חרקים, פרפרים, דבורה, נמלה, חיפושית, עולם החרקים, טבע, גיל 4-9",
      description: "גלו את העולם הזעיר והמרתק של חרקים ופרפרים! למדו על דבורים, נמלים, פרפרים ועוד.",
    },
  },
};
