'use client';

import GameErrorScreen from '@/components/ui/GameErrorScreen';

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <GameErrorScreen
      reset={reset}
      emoji="⚠️"
      title="שגיאה בטעינת הנתונים"
      description="לא ניתן היה לטעון את לוח ההורים"
      gradientClass="from-purple-100 via-pink-100 to-blue-100"
      cardClass="bg-white rounded-2xl shadow-lg max-w-sm"
    />
  );
}
