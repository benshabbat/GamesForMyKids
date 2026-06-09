'use client';
import type { IsraelCategory } from '@/lib/quiz/data/israel';
import { CATEGORIES, CATEGORY_COLORS } from '@/lib/quiz/data/israel';
import QuizCategoryMenuScreen from '@/components/game/quiz/QuizCategoryMenuScreen';

interface Props {
  onStart: (cat: IsraelCategory) => void;
}

export default function IsraelMenuScreen({ onStart }: Props) {
  return (
    <QuizCategoryMenuScreen
      gradient="from-blue-50 to-cyan-100"
      titleColor="text-blue-700"
      emoji="🇮🇱"
      title="ישראל שלי"
      description="בחר קטגוריה ובחן את הידע שלך!"
      categories={CATEGORIES}
      categoryClassName={cat => `py-3 px-2 rounded-xl font-bold text-sm transition-opacity shadow hover:opacity-90 ${CATEGORY_COLORS[cat] ?? 'bg-gray-400 text-white'}`}
      onStart={onStart}
    />
  );
}
