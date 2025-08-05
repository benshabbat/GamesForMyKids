import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="he" dir="rtl" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
