'use client';
import type { NatureCategory } from '@/lib/quiz/data/nature';
import { CATEGORIES, CATEGORY_COLORS } from '@/lib/quiz/data/nature';
import QuizCategoryMenuScreen from '@/components/game/quiz/QuizCategoryMenuScreen';

interface Props {
  onStart: (cat: NatureCategory) => void;
}

export default function NatureMenuScreen({ onStart }: Props) {
  return (
    <QuizCategoryMenuScreen
      gradient="from-green-50 to-emerald-100"
      titleColor="text-green-700"
      emoji="🌱"
      title="עולם הטבע"
      description="בחר קטגוריה ולמד על הטבע!"
      categories={CATEGORIES}
      categoryClassName={cat => `py-3 rounded-xl font-bold text-sm transition-opacity shadow hover:opacity-90 ${CATEGORY_COLORS[cat] ?? 'bg-gray-400 text-white'}`}
      onStart={onStart}
    />
  );
}
