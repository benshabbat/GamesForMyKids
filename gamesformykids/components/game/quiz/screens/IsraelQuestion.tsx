'use client';
import { CategoryIndexedQuestion } from '@/components/game/quiz';
import type { IsraelQuestion as Q } from '@/lib/quiz/data/israel';
import { CATEGORY_COLORS } from '@/lib/quiz/data/israel';

interface Props {
  current: Q;
  choices: string[];
  correctLabel: string;
  onSelect: (v: string) => void;
}

export default function IsraelQuestion({ current, choices, correctLabel, onSelect }: Props) {
  return <CategoryIndexedQuestion current={current} choices={choices} correctLabel={correctLabel} onSelect={onSelect} theme="blue" categoryColors={CATEGORY_COLORS} />;
}
