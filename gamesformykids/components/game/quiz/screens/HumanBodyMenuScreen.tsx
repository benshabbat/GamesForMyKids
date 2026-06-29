'use client';
import type { BodyCategory } from '@/lib/quiz/data/body';
import { BODY_CATEGORIES, CATEGORY_GRADIENT_COLORS, BODY_CATEGORY_LABELS } from '@/lib/quiz/data/body';
import QuizCategoryMenuScreen from '@/components/game/quiz/QuizCategoryMenuScreen';

interface Props {
  onStart: (category: BodyCategory) => void;
}

export default function HumanBodyMenuScreen({ onStart }: Props) {
  return (
    <QuizCategoryMenuScreen
      withCard={false}
      gradient="from-red-50 to-pink-100"
      titleColor="text-red-700"
      emoji="🦴"
      title="גוף האדם"
      description="גלה את הפלאות של גוף האדם!"
      categories={BODY_CATEGORIES}
      categoryClassName={cat => `py-3 px-4 rounded-xl font-bold text-white shadow-md active:scale-95 transition-transform bg-gradient-to-r ${CATEGORY_GRADIENT_COLORS[cat] ?? 'from-gray-400 to-gray-600'} ${cat === 'הכל' ? 'col-span-2' : ''}`}
      categoryLabel={cat => BODY_CATEGORY_LABELS[cat]}
      gridCols={2}
      onStart={onStart}
    />
  );
}
