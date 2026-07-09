'use client';

import ContentTypePage from '@/components/marketing/ContentTypePage';

export default function ToolsPageClient() {
  return (
    <ContentTypePage
      contentType="tools"
      gradientClass="from-teal-50 via-green-50 to-cyan-50"
      emoji="🎲"
      title="כלי כיתה"
      titleColorClass="text-teal-800 dark:text-teal-200"
      description="כלים שימושיים למורים, להורים ולילדים"
      descriptionColorClass="text-teal-600 dark:text-teal-400"
      linkColorClass="text-teal-500 hover:text-teal-700"
    />
  );
}
