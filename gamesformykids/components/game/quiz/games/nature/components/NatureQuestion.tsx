'use client';

import { CategoryIndexedQuestion } from '@/components/game/quiz';
import type { NatureQuestion as Q } from '../data/questions';

const CAT_COLORS: Record<string, string> = {
  'הכל':       'bg-green-600 text-white',
  'בעלי חיים': 'bg-amber-500 text-white',
  'צמחים':     'bg-emerald-500 text-white',
  'מזג אוויר': 'bg-blue-500 text-white',
  'חלל':       'bg-indigo-600 text-white',
  'מים':       'bg-cyan-500 text-white',
};

interface Props {
  current: Q;
  onSelect: (i: number) => void;
}

export default function NatureQuestion({ current, onSelect }: Props) {
  return <CategoryIndexedQuestion current={current} onSelect={onSelect} theme="green" categoryColors={CAT_COLORS} />;
}
