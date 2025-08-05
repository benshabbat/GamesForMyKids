import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './critical.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: '2-5 משחקים לילדים',
    template: '%s | משחקים לילדים'
  },
  description: 'משחקים חינוכיים ומהנים לילדים בגיל 2-5 - למידה דרך משחק',
  keywords: ['משחקים', 'ילדים', 'חינוכי', 'זיכרון', 'צבעים', 'למידה', 'פעוטות'],
  authors: [{ name: 'Games For My Kids' }],
  creator: 'Games For My Kids',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    title: '2-5 משחקים לילדים',
    description: 'משחקים חינוכיים ומהנים לילדים בגיל 2-5',
    siteName: 'Games For My Kids',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2-5 משחקים לילדים',
    description: 'משחקים חינוכיים ומהנים לילדים בגיל 2-5',
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
        
        {/* Critical CSS inline for above-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html { font-family: system-ui, -apple-system, sans-serif; }
            body { line-height: 1.6; }
            .loading { 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              min-height: 100vh; 
              background: linear-gradient(135deg, #f3e8ff, #fce7f3, #e0e7ff);
            }
          `
        }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        
        {/* Service Worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.warn('✅ SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.error('❌ SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
