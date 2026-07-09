'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContentTypeGrid from '@/components/marketing/ContentTypeGrid';
import Link from 'next/link';
import type { TabContentType } from '@/components/marketing/ContentTypeTabBar';

/** תבנית משותפת לדפי נחיתה של סוג תוכן (יצירה, חידות, כלים וכו') */
export default function ContentTypePage({
  contentType,
  gradientClass,
  emoji,
  title,
  titleColorClass,
  description,
  descriptionColorClass,
  linkColorClass,
}: {
  contentType: Exclude<TabContentType, 'games'>;
  gradientClass: string;
  emoji: string;
  title: string;
  titleColorClass: string;
  description: string;
  descriptionColorClass: string;
  linkColorClass: string;
}) {
  return (
    <div className={`min-h-screen bg-linear-to-br ${gradientClass} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}>
      <Header />
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2" dir="rtl">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{emoji}</div>
          <h1 className={`text-3xl md:text-4xl font-bold ${titleColorClass} mb-2`}>{title}</h1>
          <p className={`${descriptionColorClass} text-base md:text-lg mb-4`}>{description}</p>
          <Link href="/" className={`text-sm ${linkColorClass} underline underline-offset-2 transition-colors`}>
            ← חזרה לדף הבית
          </Link>
        </div>
      </div>
      <ContentTypeGrid contentType={contentType} />
      <Footer />
    </div>
  );
}
