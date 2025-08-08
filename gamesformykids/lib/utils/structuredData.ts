interface GameStructuredDataProps {
  gameTitle: string;
  gameDescription: string;
  gameType: string;
  gameUrl: string;
  ageRange: {
    min: number;
    max: number;
  };
  educationalContent?: string[];
  gameFeatures?: string[];
}

export function generateGameStructuredData({
  gameTitle,
  gameDescription,
  gameType,
  gameUrl,
  ageRange,
  educationalContent = [],
  gameFeatures = []
}: GameStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": gameTitle,
    "description": gameDescription,
    "url": gameUrl,
    "gameCategory": gameType,
    "audience": {
      "@type": "PeopleAudience",
      "suggestedMinAge": ageRange.min,
      "suggestedMaxAge": ageRange.max
    },
    "creator": {
      "@type": "Person",
      "name": "דוד-חן בן שבת",
      "url": "https://www.linkedin.com/in/davidchen-benshabbat"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GamesForMyKids",
      "url": "https://gamesformykids.vercel.app"
    },
    "inLanguage": "he",
    "isAccessibleForFree": true,
    "educationalUse": educationalContent,
    "gameItem": gameFeatures,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": ["Web Browser", "iOS", "Android"],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "ILS"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "156",
      "bestRating": "5"
    }
  };
}

export function generateEducationalGameStructuredData(gameData: GameStructuredDataProps) {
  return {
    ...generateGameStructuredData(gameData),
    "@type": ["Game", "LearningResource"],
    "learningResourceType": "Game",
    "educationalLevel": "Preschool",
    "teaches": gameData.educationalContent,
    "interactivityType": "active",
    "educationalFramework": "Early Childhood Education"
  };
}
