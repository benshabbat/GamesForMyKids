import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'משחקים לילדים - גיל 4',
  description: 'משחקים חינוכיים ומהנים לילדים בגיל 4',
  keywords: 'משחקים, ילדים, חינוכי, זיכרון, צבעים',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
