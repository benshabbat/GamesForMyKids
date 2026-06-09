import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import ServiceWorkerRegistration from '@/components/analytics/ServiceWorkerRegistration';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { AuthProvider } from '@/lib/providers';
import NotificationToast from '@/components/ui/NotificationToast';
import { OfflineBanner } from '@/components/ui/OfflineBanner';
import HeadLinks from '@/components/layout/HeadLinks';
import StructuredData from '@/components/layout/StructuredData';
import { siteMetadata, siteViewport } from '@/lib/constants/siteMetadata';

const SoundToggleButton = dynamic(() => import('@/components/ui/SoundToggleButton'), { ssr: false });

const rubik = Rubik({
  subsets: ['latin', 'hebrew'],
  display: 'swap',
  preload: true,
  variable: '--font-rubik',
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
      <body className={`${rubik.className} dark:bg-gray-900 dark:text-white`}>
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <ServiceWorkerRegistration />
        <OfflineBanner />
        <AuthProvider>
          {children}
          <NotificationToast />
          <SoundToggleButton />
        </AuthProvider>
      </body>
    </html>
  );
}
