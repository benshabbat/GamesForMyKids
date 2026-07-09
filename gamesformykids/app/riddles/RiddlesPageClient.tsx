'use client';

import ContentTypePage from '@/components/marketing/ContentTypePage';

export default function RiddlesPageClient() {
  return (
    <ContentTypePage
      contentType="riddles"
      gradientClass="from-yellow-50 via-orange-50 to-amber-50"
      emoji="🤣"
      title="חידות ובדיחות"
      titleColorClass="text-orange-800 dark:text-orange-200"
      description="חידות, טריוויה ובדיחות לאתגר את המוח"
      descriptionColorClass="text-orange-600 dark:text-orange-400"
      linkColorClass="text-orange-500 hover:text-orange-700"
    />
  );
}
