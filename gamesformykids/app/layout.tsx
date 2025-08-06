import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import PerformanceTracker from '@/components/PerformanceTracker';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  weight: ['400', '600', '700', '800'] // רק המשקלים שבשימוש
});

export const metadata: Metadata = {
  title: '2-5 משחקים לילדים ',
  description: 'משחקים חינוכיים ומהנים לילדים בגיל 2-5',
  keywords: 'משחקים, ילדים, חינוכי, זיכרון, צבעים',
  other: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  }
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="משחקים לילדים" />
        <style>{`
          /* Critical CSS for FCP */
          body { font-family: var(--font-inter); direction: rtl; margin: 0; }
          .min-h-screen { min-height: 100vh; }
          .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
          .from-blue-100 { --tw-gradient-from: #dbeafe; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(219, 234, 254, 0)); }
          .via-purple-100 { --tw-gradient-stops: var(--tw-gradient-from), #f3e8ff, var(--tw-gradient-to, rgba(243, 232, 255, 0)); }
          .to-pink-100 { --tw-gradient-to: #fce7f3; }
        `}</style>
        <link rel="preload" href="/_next/static/chunks/common-f3956634-3fe3e3ab3ad49297.js" as="script" />
        <link rel="preload" href="/_next/static/chunks/vendors-ff30e0d3-efdf8a19ec5acf86.js" as="script" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ServiceWorkerRegistration />
        <PerformanceTracker />
        {children}
      </body>
    </html>
  );
}
