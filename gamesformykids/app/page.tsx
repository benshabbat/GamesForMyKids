import HomePageClient from './HomePageClient';

// הוספת מידע מובנה נוסף לדף הבית
const homePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "משחקים לילדים 2-5",
  "description": "אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים",
  "url": "https://gamesformykids.vercel.app",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Any",
  "author": {
    "@type": "Person",
    "name": "דוד-חן בן שבת",
    "url": "https://www.linkedin.com/in/davidchen-benshabbat"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "ILS"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "127",
    "bestRating": "5"
  },
  "keywords": "משחקים לילדים, חינוכי, זיכרון, צבעים, עברית, מספרים, גיל 2-5, פעוטות",
  "inLanguage": "he"
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageStructuredData),
        }}
      />
      <HomePageClient />
    </>
  );
}
