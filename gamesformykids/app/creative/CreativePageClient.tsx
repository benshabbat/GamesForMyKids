'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContentTypeGrid from '@/components/marketing/ContentTypeGrid';
import Link from 'next/link';

export default function CreativePageClient() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2" dir="rtl">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎨</div>
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 dark:text-purple-200 mb-2">יצירה ואומנות</h1>
          <p className="text-purple-600 dark:text-purple-400 text-base md:text-lg mb-4">
            ציור, צביעה, מוזיקה ויצירה חופשית לכל גיל
          </p>
          <Link href="/" className="text-sm text-purple-500 hover:text-purple-700 underline underline-offset-2 transition-colors">
            ← חזרה לדף הבית
          </Link>
        </div>
      </div>
      <ContentTypeGrid contentType="creative" />
      <Footer />
    </div>
  );
}
