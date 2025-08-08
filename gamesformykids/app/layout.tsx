import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '🎮 משחקים לילדים 2-5 - למידה מהנה וחינוכית',
  description: 'אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים. אותיות עבריות, מספרים, צבעים, צורות, זיכרון ועוד!',
  keywords: 'משחקים לילדים, חינוכי, זיכרון, צבעים, עברית, מספרים, גיל 2-5, פעוטות, משחקי למידה',
  authors: [{ name: 'GamesForMyKids' }],
  creator: 'GamesForMyKids',
  publisher: 'GamesForMyKids',
  openGraph: {
    title: '🎮 משחקים לילדים 2-5',
    description: 'משחקים חינוכיים ומהנים לילדים בגיל 2-5',
    type: 'website',
    locale: 'he_IL',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🎮 משחקים לילדים 2-5',
    description: 'משחקים חינוכיים ומהנים לילדים בגיל 2-5',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="משחקים לילדים" />
      </head>
      <body className={inter.className}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
