import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'משחקים לילדים 3-10 | GamesForMyKids',
  description: 'אוסף משחקים חינוכיים ומהנים לילדים בגיל 3–10 שנים — צבעים, מספרים, עברית ועוד',
  openGraph: {
    title: 'משחקים לילדים 3–10',
    description: 'אוסף משחקים חינוכיים ומהנים לילדים בגיל 3–10 שנים',
    type: 'website',
    locale: 'he_IL',
    siteName: 'GamesForMyKids',
    url: 'https://games-for-my-kids.vercel.app',
  },
  keywords: 'משחקים לילדים, חינוכי, זיכרון, צבעים, עברית, מספרים, גיל 3-10, פעוטות',
};

// הוספת מידע מובנה נוסף לדף הבית
const homePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "משחקים לילדים 3-10",
  "description": "אוסף משחקים חינוכיים ומהנים לילדים בגיל 3-10 שנים",
  "url": "https://games-for-my-kids.vercel.app",
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
  "keywords": "משחקים לילדים, חינוכי, זיכרון, צבעים, עברית, מספרים, גיל 3-10, פעוטות",
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
