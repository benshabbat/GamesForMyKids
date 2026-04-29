import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: '🎮 משחקים לילדים 2-5 - למידה מהנה וחינוכית',
  description: 'אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים. אותיות עבריות, מספרים, צבעים, צורות, זיכרון ועוד! פותח באהבה על ידי דוד-חן בן שבת.',
  keywords: 'משחקים לילדים, חינוכי, זיכרון, צבעים, עברית, מספרים, גיל 2-5, פעוטות, משחקי למידה, דוד-חן בן שבת',
  authors: [{ name: 'דוד-חן בן שבת', url: 'https://www.linkedin.com/in/davidchen-benshabbat' }],
  creator: 'דוד-חן בן שבת',
  publisher: 'GamesForMyKids',
  metadataBase: new URL('https://games-for-my-kids.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '🎮 משחקים לילדים 2-5 - למידה מהנה וחינוכית',
    description: 'אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים. אותיות עבריות, מספרים, צבעים, צורות, זיכרון ועוד!',
    type: 'website',
    locale: 'he_IL',
    url: 'https://games-for-my-kids.vercel.app',
    siteName: 'משחקים לילדים',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'משחקים לילדים - למידה מהנה וחינוכית',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GamesForMyKids',
    creator: '@davidchen_dev',
    title: '🎮 משחקים לילדים 2-5 - למידה מהנה וחינוכית',
    description: 'אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים',
    images: ['/images/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // הוסף כאן קודי אימות נוספים כמו Bing, Yandex וכו'
    other: {
      'msvalidate.01': 'your-bing-verification-code',
      'yandex-verification': 'your-yandex-verification-code',
    },
  },
  other: {
    // Pinterest verification
    'p:domain_verify': 'your-pinterest-verification-code',
    // WhatsApp Business
    'whatsapp:account_verification': 'your-whatsapp-verification',
  },
};

export const siteViewport = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "משחקים לילדים 2-5",
  "description": "אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים",
  "url": "https://games-for-my-kids.vercel.app",
  "author": {
    "@type": "Person",
    "name": "דוד-חן בן שבת",
    "url": "https://www.linkedin.com/in/davidchen-benshabbat"
  },
  "publisher": {
    "@type": "Organization",
    "name": "GamesForMyKids"
  },
  "inLanguage": "he",
  "audience": {
    "@type": "Audience",
    "audienceType": "children",
    "suggestedMinAge": 2,
    "suggestedMaxAge": 5
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://games-for-my-kids.vercel.app/games/{search_term_string}",
    "query-input": "required name=search_term_string"
  }
};
