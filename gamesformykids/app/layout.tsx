import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ServiceWorkerRegistration from '@/components/analytics/ServiceWorkerRegistration';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { AuthProvider } from '@/lib/providers';
import { BUILD_INFO } from '@/lib/build-info';
import NotificationToast from '@/components/ui/NotificationToast';

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

export const metadata: Metadata = {
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

export const viewport = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
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

  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Critical font preloading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Cache busting */}
        <meta name="build-version" content={BUILD_INFO.version} />
        <meta name="build-timestamp" content={BUILD_INFO.timestamp.toString()} />
        <meta name="cache-control" content="no-cache, no-store, must-revalidate" />
        <meta name="pragma" content="no-cache" />
        <meta name="expires" content="0" />
        
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="משחקים לילדים" />
        <link rel="canonical" href="https://games-for-my-kids.vercel.app" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={inter.className}>
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <ServiceWorkerRegistration />
        <AuthProvider>
          {children}
          <NotificationToast />
        </AuthProvider>
      </body>
    </html>
  );
}
