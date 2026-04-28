'use client';

import MathRaceProgressBar from './MathRaceProgressBar';
import MathRaceQuestion from './MathRaceQuestion';

interface Question {
  text: string;
  answer: number;
  choices: number[];
}

interface Props {
  q: Question;
  score: number;
  timeLeft: number;
  feedback: 'correct' | 'wrong' | null;
  streak: number;
  correct: number;
  total: number;
  accuracy: number;
  gameTime: number;
  onTap: (choice: number) => void;
}

export default function MathRacePlayScreen({ q, score, timeLeft, feedback, streak, correct, total, accuracy, gameTime, onTap }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      <MathRaceProgressBar timeLeft={timeLeft} score={score} streak={streak} gameTime={gameTime} />
      <MathRaceQuestion q={q} feedback={feedback} streak={streak} onTap={onTap} />
      <p className="mt-4 text-xs text-indigo-400">{correct}/{total} נכון · {accuracy}% דיוק</p>
    </div>
  );
}
