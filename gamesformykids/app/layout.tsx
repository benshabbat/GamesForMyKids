import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import ServiceWorkerRegistration from '@/components/analytics/ServiceWorkerRegistration';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { AuthProvider } from '@/lib/providers';
import NotificationToast from '@/components/ui/NotificationToast';
import { OfflineBanner } from '@/components/ui/OfflineBanner';
import HeadLinks from '@/components/layout/HeadLinks';
import StructuredData from '@/components/layout/StructuredData';
import { siteMetadata, siteViewport } from '@/lib/constants/siteMetadata';
import SoundToggleButton from '@/components/ui/SoundToggleButton';

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
        {/* Prevent flash of wrong theme — runs before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('gfk_theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch{}`,
          }}
        />
        {/* Colorblind mode — apply before hydration to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('gfk_colorblind')==='true')document.documentElement.dataset.colorblind='true'}catch{}`,
          }}
        />
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
