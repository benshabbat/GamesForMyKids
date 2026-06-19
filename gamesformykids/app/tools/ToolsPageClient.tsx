'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContentTypeGrid from '@/components/marketing/ContentTypeGrid';
import Link from 'next/link';

export default function ToolsPageClient() {
  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-green-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2" dir="rtl">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎲</div>
          <h1 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-200 mb-2">כלי כיתה</h1>
          <p className="text-teal-600 dark:text-teal-400 text-base md:text-lg mb-4">
            כלים שימושיים למורים, להורים ולילדים
          </p>
          <Link href="/" className="text-sm text-teal-500 hover:text-teal-700 underline underline-offset-2 transition-colors">
            ← חזרה לדף הבית
          </Link>
        </div>
      </div>
      <ContentTypeGrid contentType="tools" />
      <Footer />
    </div>
  );
}
