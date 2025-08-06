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
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="משחקים לילדים" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <style>{`
          /* Critical CSS for FCP - Ultra optimized for 100% score */
          :root{--font-inter:Inter,sans-serif}
          *{direction:rtl;box-sizing:border-box}
          body{font-family:var(--font-inter);margin:0;line-height:1.5;-webkit-font-smoothing:antialiased;background:#f8fafc}
          .min-h-screen{min-height:100vh}
          .bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}
          .from-blue-100{--tw-gradient-from:#dbeafe;--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to,rgba(219,234,254,0))}
          .via-purple-100{--tw-gradient-stops:var(--tw-gradient-from),#f3e8ff,var(--tw-gradient-to,rgba(243,232,255,0))}
          .to-pink-100{--tw-gradient-to:#fce7f3}
          /* Grid critical styles */
          .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;padding:1rem}
          .card{background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);transition:transform .2s ease}
          .card:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.15)}
          .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;border:none;border-radius:8px;font-weight:600;cursor:pointer;transition:all .2s ease;background:#2563eb;color:#fff}
          .btn:hover{background:#1d4ed8;transform:translateY(-1px)}
          .loading{display:flex;justify-content:center;align-items:center;min-height:200px}
          .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
        `}</style>
        {/* Preload actual chunks - will be dynamically replaced in production */}
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
