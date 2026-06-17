'use client';
import type { TransportType } from '../data/transport';
import { TYPE_STYLES } from '../data/transport';
import QuizCategoryMenuScreen from '@/components/game/quiz/QuizCategoryMenuScreen';

interface Props {
  types: readonly TransportType[];
  onStart: (type: TransportType) => void;
}

export default function TransportMenuScreen({ types, onStart }: Props) {
  return (
    <QuizCategoryMenuScreen
      withCard={false}
      gradient="from-sky-50 to-blue-100"
      titleColor="text-blue-700"
      emoji="🚗"
      title="כלי תחבורה"
      description="גלה כלי רכב מהיבשה, הים והאוויר!"
      categories={types}
      categoryClassName={type => `py-3 px-4 rounded-xl font-bold text-white shadow-md active:scale-95 transition bg-gradient-to-r ${TYPE_STYLES[type].color} ${type === 'הכל' ? 'col-span-2' : ''}`}
      categoryLabel={type => `${TYPE_STYLES[type].icon} ${type}`}
      gridCols={2}
      onStart={onStart}
    />
  );
}
