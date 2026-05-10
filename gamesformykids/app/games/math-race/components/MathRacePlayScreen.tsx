'use client';
import { useMathRaceGame, GAME_TIME } from '../useMathRaceGame';
import MathRaceProgressBar from './MathRaceProgressBar';
import MathRaceQuestion from './MathRaceQuestion';
import { useKeyboardControls } from '@/hooks/shared/game-controls/useKeyboardControls';
import { KeyboardHint } from '@/components/game/shared/KeyboardHint';

export default function MathRacePlayScreen() {
  const { q, score, timeLeft, feedback, streak, correct, total, tap, accuracy } = useMathRaceGame();

  useKeyboardControls(
    {
      '1': () => tap(q.choices[0]),
      '2': () => tap(q.choices[1]),
      '3': () => tap(q.choices[2]),
      '4': () => tap(q.choices[3]),
    },
    !feedback,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      <MathRaceProgressBar timeLeft={timeLeft} score={score} streak={streak} gameTime={GAME_TIME} />
      <MathRaceQuestion q={q} feedback={feedback} streak={streak} onTap={tap} />
      <p className="mt-4 text-xs text-indigo-400">{correct}/{total} נכון · {accuracy}% דיוק</p>
      <KeyboardHint
        hints={[
          { key: '1', label: String(q.choices[0]) },
          { key: '2', label: String(q.choices[1]) },
          { key: '3', label: String(q.choices[2]) },
          { key: '4', label: String(q.choices[3]) },
        ]}
        className="mt-1"
      />
    </div>
  );
}
