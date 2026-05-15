'use client';
import ClockFace from './ClockFace';
import { QuizResultScreen } from '@/components/game/quiz';

export default function ClockResultScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <QuizResultScreen
      headerContent={
        <div className="flex justify-center mb-3">
          <ClockFace hour={12} minute={0} size={100} />
        </div>
      }
      theme="violet"
      onRestart={onRestart}
    />
  );
}
