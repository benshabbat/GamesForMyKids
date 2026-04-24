'use client';

import { CategoryIndexedQuestion } from '@/components/game/quiz';
import type { IsraelQuestion as Q } from '../data/questions';

const CAT_COLORS: Record<string, string> = {
  'הכל':      'bg-blue-600 text-white',
  'גאוגרפיה': 'bg-teal-500 text-white',
  'היסטוריה': 'bg-amber-500 text-white',
  'תרבות':    'bg-purple-500 text-white',
  'טבע':      'bg-green-500 text-white',
  'ערים':     'bg-rose-500 text-white',
};

interface Props {
  index: number; total: number; score: number;
  current: Q;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (i: number) => void;
  onNext: () => void;
}

export default function IsraelQuestion(props: Props) {
  return <CategoryIndexedQuestion {...props} theme="blue" categoryColors={CAT_COLORS} />;
}
