'use client';

import { CategoryIndexedQuestion } from '@/components/game/quiz';
import type { NatureQuestion as Q } from '../data/questions';
import { CATEGORY_COLORS } from '../data/questions';

interface Props {
  current: Q;
  choices: string[];
  correctLabel: string;
  onSelect: (v: string) => void;
}

export default function NatureQuestion({ current, choices, correctLabel, onSelect }: Props) {
  return <CategoryIndexedQuestion current={current} choices={choices} correctLabel={correctLabel} onSelect={onSelect} theme="green" categoryColors={CATEGORY_COLORS} />;
}
