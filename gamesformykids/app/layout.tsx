import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import './critical.css';
import { WebVitals } from '@/components/WebVitals';

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
        
        {/* Critical CSS inline for above-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            * { 
              margin: 0; 
              padding: 0; 
              box-sizing: border-box; 
            }
            html { 
              font-family: system-ui, -apple-system, sans-serif; 
              font-size: 16px;
              scroll-behavior: smooth;
            }
            body { 
              line-height: 1.6; 
              color: #1f2937;
              background: linear-gradient(135deg, #eff6ff 0%, #f3e8ff 50%, #fdf2f8 100%);
              min-height: 100vh;
            }
            .loading { 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              min-height: 100vh; 
              background: linear-gradient(135deg, #f3e8ff, #fce7f3, #e0e7ff);
              font-size: 1.25rem;
              color: #6366f1;
            }
            .sr-only {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
              border: 0;
            }
            button, [role="button"] {
              cursor: pointer;
              background: none;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              transition: all 0.2s ease;
              font-size: 1rem;
              font-weight: 500;
            }
            button:focus, [role="button"]:focus {
              outline: 2px solid #6366f1;
              outline-offset: 2px;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            .card {
              background: white;
              border-radius: 1rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .card:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
            }
            @media (prefers-reduced-motion: reduce) {
              *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
              }
            }
            
            /* High contrast mode support */
            @media (prefers-contrast: high) {
              .card {
                border: 2px solid #000;
                background: #fff;
              }
              button {
                border: 2px solid currentColor;
              }
            }
            
            /* Focus management for keyboard users */
            .using-keyboard *:focus {
              outline: 3px solid #6366f1;
              outline-offset: 2px;
            }
            
            /* Performance optimizations */
            * {
              will-change: auto;
            }
            
            .card, .game-card {
              contain: layout;
              content-visibility: auto;
              contain-intrinsic-size: 200px;
            }
            
            /* Prevent layout shift */
            img, video, iframe {
              aspect-ratio: attr(width) / attr(height);
            }
            
            /* Optimize font loading */
            @font-face {
              font-family: 'Inter';
              font-display: swap;
              src: local('Inter');
            }
          `
        }} />
      </head>
      <body 
        className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50`}
        dir="rtl"
        lang="he"
      >
        {children}
        
        {/* Web Vitals Tracking */}
        <WebVitals />
        
        {/* Service Worker registration - moved to end for better performance */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance optimization: delay SW registration
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  // Register after page load to avoid blocking
                  setTimeout(function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.warn('✅ SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.error('❌ SW registration failed: ', registrationError);
                      });
                  }, 1000);
                });
              }
              
              // Initialize performance optimizations
              window.addEventListener('DOMContentLoaded', function() {
                // Skip to main content functionality
                const skipLink = document.createElement('a');
                skipLink.href = '#main-content';
                skipLink.textContent = 'דלג לתוכן הראשי';
                skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
                skipLink.style.cssText = 'position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden;';
                skipLink.addEventListener('focus', function() {
                  this.style.cssText = 'position: absolute; top: 1rem; left: 1rem; z-index: 50; background: #2563eb; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem;';
                });
                skipLink.addEventListener('blur', function() {
                  this.style.cssText = 'position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden;';
                });
                document.body.insertBefore(skipLink, document.body.firstChild);
                
                // Add main content ID for skip link
                const main = document.querySelector('main');
                if (main && !main.id) {
                  main.id = 'main-content';
                }
                
                // Keyboard navigation enhancement
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'Tab') {
                    document.body.classList.add('using-keyboard');
                  }
                });
                
                document.addEventListener('mousedown', function() {
                  document.body.classList.remove('using-keyboard');
                });
              });
            `,
          }}
        />
        
        {/* Structured Data for SEO */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "משחקים לילדים",
              "alternateName": "Games For My Kids",
              "url": "https://games-for-my-kids.vercel.app",
              "description": "אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים",
              "inLanguage": "he",
              "author": {
                "@type": "Organization",
                "name": "Games For My Kids",
                "url": "https://games-for-my-kids.vercel.app"
              },
              "publisher": {
                "@type": "Organization", 
                "name": "Games For My Kids",
                "url": "https://games-for-my-kids.vercel.app"
              }
            })
          }}
        />
        
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "משחקים לילדים",
              "url": "https://games-for-my-kids.vercel.app",
              "description": "פלטפורמה חינוכית למשחקים לילדים בגיל הרך",
              "educationalUse": "learning",
              "audience": {
                "@type": "EducationalAudience",
                "educationalRole": "student",
                "audienceType": "children",
                "suggestedMinAge": 2,
                "suggestedMaxAge": 5
              }
            })
          }}
        />
      </body>
    </html>
  );
}
