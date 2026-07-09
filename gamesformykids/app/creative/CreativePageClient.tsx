'use client';

import ContentTypePage from '@/components/marketing/ContentTypePage';

export default function CreativePageClient() {
  return (
    <ContentTypePage
      contentType="creative"
      gradientClass="from-pink-50 via-purple-50 to-rose-50"
      emoji="🎨"
      title="יצירה ואומנות"
      titleColorClass="text-purple-800 dark:text-purple-200"
      description="ציור, צביעה, מוזיקה ויצירה חופשית לכל גיל"
      descriptionColorClass="text-purple-600 dark:text-purple-400"
      linkColorClass="text-purple-500 hover:text-purple-700"
    />
  );
}
