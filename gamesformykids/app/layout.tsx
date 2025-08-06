import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Next.js 15 Enhanced Font Loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

// Enhanced Metadata with Next.js 15 features
export const metadata: Metadata = {
  metadataBase: new URL('https://games-for-my-kids.vercel.app'),
  title: {
    default: 'משחקים לילדים בגיל 2-5 | משחקים חינוכיים ומהנים',
    template: '%s | משחקים לילדים'
  },
  description: 'אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים. משחקי זיכרון, לימוד אותיות עבריות, צבעים, מספרים ועוד. בחינם ובעברית!',
  keywords: [
    'משחקים לילדים', 'חינוכי', 'גיל 2-5', 'אותיות עברית', 
    'זיכרון', 'צבעים', 'מספרים', 'למידה', 'פעוטות', 'גן ילדים',
    'משחקים חינוכיים', 'פיתוח קוגניטיבי', 'משחקי חשיבה'
  ],
  authors: [{ name: 'Games For My Kids', url: 'https://games-for-my-kids.vercel.app' }],
  creator: 'Games For My Kids',
  publisher: 'Games For My Kids',
  category: 'Education',
  classification: 'Educational Games for Children',
  
  // Enhanced OpenGraph
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
        type: 'image/svg+xml',
      },
      {
        url: '/icons/icon-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'משחקים לילדים - תמונה חברתית',
        type: 'image/png',
      },
    ],
  },
  
  // Enhanced Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'משחקים לילדים בגיל 2-5 | משחקים חינוכיים ומהנים',
    description: 'אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים',
    images: ['/icons/icon-512x512.svg'],
    creator: '@gamesformykids',
    site: '@gamesformykids',
  },
  
  // Canonical and language alternatives
  alternates: {
    canonical: 'https://games-for-my-kids.vercel.app',
    languages: {
      'he': 'https://games-for-my-kids.vercel.app',
    },
  },
  
  // Enhanced Robot directives
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
  
  // Verification codes
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  
  // App-specific metadata
  applicationName: 'משחקים לילדים',
  generator: 'Next.js 15',
  referrer: 'origin-when-cross-origin',
  
  // Icons configuration
  icons: {
    icon: [
      { url: '/icons/icon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icons/icon-180x180.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#3b82f6' },
    ],
  },
  
  // Manifest for PWA
  manifest: '/manifest.json',
};

// Enhanced Viewport with Next.js 15
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
  colorScheme: 'light dark',
  viewportFit: 'cover',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="he" dir="rtl" className={inter.variable}>
      <head>
        {/* Performance optimization - DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PWA Configuration */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="משחקים לילדים" />
        
        {/* Microsoft tiles for Windows */}
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.svg" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Critical CSS inline for better performance */}
        <style 
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical Above-the-fold Styles */
              * { margin: 0; padding: 0; box-sizing: border-box; }
              html { 
                font-family: var(--font-inter), system-ui, sans-serif; 
                direction: rtl;
                scroll-behavior: smooth;
              }
              body { 
                line-height: 1.6; 
                color: #1f2937;
                background: linear-gradient(to bottom right, rgb(239 246 255), rgb(250 232 255), rgb(252 231 243));
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              .sr-only { 
                position: absolute; 
                width: 1px; 
                height: 1px; 
                overflow: hidden; 
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
              }
              img { 
                max-width: 100%; 
                height: auto; 
                loading: lazy;
              }
              /* Loading state optimization */
              .loading-skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
              }
              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
            `
          }} 
        />
        
        {/* Resource hints for performance */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Security headers */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;" />
      </head>
      
      <body 
        className={`${inter.className} antialiased min-h-screen game-container`}
        dir="rtl"
        lang="he"
      >
        {/* Main Application Content */}
        <main id="main-content" className="relative z-10">
          {children}
        </main>
        
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 game-button game-button-primary"
        >
          דלג לתוכן הראשי
        </a>
        
        {/* Error Boundary fallback will be handled by global-error.tsx */}
        
        {/* Enhanced Service Worker with Next.js 15 optimizations */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Modern Service Worker registration with error handling
              if ('serviceWorker' in navigator && 'PushManager' in window) {
                window.addEventListener('load', async () => {
                  try {
                    const registration = await navigator.serviceWorker.register('/sw.js', {
                      scope: '/',
                      updateViaCache: 'imports'
                    });
                    
                    // Handle updates
                    registration.addEventListener('updatefound', () => {
                      const newWorker = registration.installing;
                      if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content is available
                            if (confirm('גרסה חדשה זמינה! האם לרענן את הדף?')) {
                              window.location.reload();
                            }
                          }
                        });
                      }
                    });
                    
                    console.log('Service Worker registered successfully');
                  } catch (error) {
                    console.log('Service Worker registration failed:', error);
                  }
                });
              }
              
              // Performance monitoring
              if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'cumulative-layout-shift') {
                      console.log('CLS:', entry.value);
                    }
                  });
                });
                
                try {
                  observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
                } catch (e) {
                  // Fallback for older browsers
                  console.log('Performance Observer not fully supported');
                }
              }
              
              // Reduced motion support
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--duration-fast', '0ms');
                document.documentElement.style.setProperty('--duration-normal', '0ms');
                document.documentElement.style.setProperty('--duration-slow', '0ms');
              }
            `,
          }}
        />
        
        {/* Accessibility enhancements */}
        <div id="announcements" className="sr-only" aria-live="polite" aria-atomic="true"></div>
      </body>
    </html>
  );
}
