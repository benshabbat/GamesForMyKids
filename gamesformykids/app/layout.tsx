import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://games-for-my-kids.vercel.app'),
  title: {
    default: 'משחקים לילדים בגיל 2-5 | משחקים חינוכיים ומהנים',
    template: '%s | משחקים לילדים'
  },
  description: 'אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים. משחקי זיכרון, לימוד אותיות עבריות, צבעים, מספרים ועוד. בחינם ובעברית!',
  keywords: ['משחקים לילדים', 'חינוכי', 'גיל 2-5', 'אותיות עברית', 'זיכרון', 'צבעים', 'מספרים', 'למידה', 'פעוטות', 'גן ילדים'],
  authors: [{ name: 'Games For My Kids', url: 'https://games-for-my-kids.vercel.app' }],
  creator: 'Games For My Kids',
  publisher: 'Games For My Kids',
  category: 'Education',
  classification: 'Educational Games for Children',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://games-for-my-kids.vercel.app',
    title: 'משחקים לילדים בגיל 2-5 | משחקים חינוכיים ומהנים',
    description: 'אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים. משחקי זיכרון, לימוד אותיות עבריות, צבעים, מספרים ועוד.',
    siteName: 'משחקים לילדים',
    images: [
      {
        url: '/icons/icon-512x512.svg',
        width: 512,
        height: 512,
        alt: 'משחקים לילדים - לוגו',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'משחקים לילדים בגיל 2-5 | משחקים חינוכיים ומהנים',
    description: 'אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים',
    images: ['/icons/icon-512x512.svg'],
    creator: '@gamesformykids',
    site: '@gamesformykids',
  },
  alternates: {
    canonical: 'https://games-for-my-kids.vercel.app',
    languages: {
      'he': 'https://games-for-my-kids.vercel.app',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3b82f6',
  colorScheme: 'light',
  viewportFit: 'cover',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="he" dir="rtl" className={inter.variable}>
      <head>
        {/* Performance optimization */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple touch icons */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="משחקים לילדים" />
        
        {/* Microsoft tiles */}
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.svg" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Preload critical resources - only if they exist */}
        {/* <link rel="preload" href="/sounds/success.mp3" as="audio" type="audio/mpeg" /> */}
        {/* <link rel="preload" href="/sounds/click.mp3" as="audio" type="audio/mpeg" /> */}
        
        {/* Critical CSS inline */}
        <style 
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
          __html: `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html { font-family: system-ui, sans-serif; }
            body { line-height: 1.6; color: #1f2937; }
            .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; }
            img { max-width: 100%; height: auto; }
          `
        }} />
      </head>
      <body 
        className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50`}
        dir="rtl"
        lang="he"
      >
        {children}
        
        {/* Service Worker registration - simplified */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
