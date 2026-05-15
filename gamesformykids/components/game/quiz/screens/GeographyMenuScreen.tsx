'use client';
import GameModeMenuScreen from '@/components/game/quiz/GameModeMenuScreen';
import { type QuestionMode, MODES } from '@/lib/quiz/data/geography';

interface Props { onStart: (mode: QuestionMode) => void; }

export default function GeographyMenuScreen({ onStart }: Props) {
  return (
    <GameModeMenuScreen
      gradient="from-teal-50 to-cyan-100"
      titleColor="text-teal-800"
      subtitleColor="text-teal-600"
      emoji="🌍"
      title="גאוגרפיה"
      description="בחר סוג שאלות"
      items={MODES}
      buttonClassName="bg-gradient-to-l from-teal-500 to-cyan-600"
      layout="flex"
      sideIcon
      onStart={item => onStart(item.mode)}
    />
  );
}
