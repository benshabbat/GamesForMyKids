import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ServiceWorkerRegistration from '@/components/analytics/ServiceWorkerRegistration';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { AuthProvider } from '@/lib/providers';
import NotificationToast from '@/components/ui/NotificationToast';
import HeadLinks from '@/components/layout/HeadLinks';
import StructuredData from '@/components/layout/StructuredData';
import { siteMetadata, siteViewport } from '@/lib/constants/siteMetadata';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

export const metadata: Metadata = siteMetadata;
export const viewport = siteViewport;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <HeadLinks />
        <StructuredData />
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
