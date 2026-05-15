'use client';
import GameModeMenuScreen from '@/components/game/quiz/GameModeMenuScreen';
import type { SequenceLevel } from '@/lib/quiz/data/sequences';

interface Props {
  levels: SequenceLevel[];
  onStart: (level: SequenceLevel) => void;
}

export default function SequencesMenuScreen({ levels, onStart }: Props) {
  return (
    <GameModeMenuScreen
      gradient="from-sky-50 to-cyan-100"
      titleColor="text-cyan-800"
      subtitleColor="text-cyan-600"
      emoji="🔢"
      title="סדרות מספרים"
      description="מה המספר הבא בסדרה?"
      items={levels}
      buttonClassName="bg-gradient-to-br from-cyan-500 to-sky-600 font-bold"
      layout="grid-2"
      onStart={onStart}
    />
  );
}
