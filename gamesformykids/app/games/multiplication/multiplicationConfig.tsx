import type { ReactNode } from 'react';
import type { TimedMathConfig } from '@/components/game/shared/TimedMathGame';
import { useMultiplicationGameStore, stopMultiplicationTimer } from './multiplicationGameStore';
import {
  LEVELS, QUESTIONS_PER_LEVEL, MIXED_LEVEL, MultiplicationQuestion, getTimeForLevel,
} from './data/tables';
import { isLevelMastered } from './masteryStorage';

// globals.css forces `direction: rtl` on every element (`* { direction: rtl }`), which
// overrides inherited direction on any child — so equations need this on each element
// that renders one, not just a shared ancestor.
function Eq({ children }: { children: ReactNode }) {
  return <span style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}>{children}</span>;
}

export const MULTIPLICATION_CONFIG: TimedMathConfig<number, MultiplicationQuestion> = {
  useStore: useMultiplicationGameStore,
  stopTimer: stopMultiplicationTimer,
  totalQuestions: QUESTIONS_PER_LEVEL,
  timePerQuestion: getTimeForLevel,

  emoji: '✖️',
  title: 'לוח הכפל',
  description: 'בחר לוח כפל ותתחיל!',
  gradient: 'from-violet-50 to-purple-100',
  levels: LEVELS,
  getKey: (lv) => lv,
  renderLevelItem: (lv) => (
    <span className="flex flex-col items-center leading-none">
      <span>{lv === MIXED_LEVEL ? '🎲' : lv}</span>
      {isLevelMastered(lv) && <span className="text-sm mt-0.5">⭐</span>}
    </span>
  ),
  levelColumns: 5,
  levelGap: 3,
  levelButtonClass: 'aspect-square rounded-2xl text-2xl font-black text-white shadow-lg hover:scale-105 active:scale-95 transition bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500',
  menuFooter: (
    <p className="text-center text-purple-500 text-sm mt-4">
      {QUESTIONS_PER_LEVEL} שאלות כל סבב • 🎲 = תרגול מעורב • ⭐ = לוח שנשלט
    </p>
  ),

  renderLevelLabel: (lv) => (lv === MIXED_LEVEL ? 'תרגול מעורב' : `לוח ${lv}`),
  renderEquation: (q) => <Eq>{q.a} × {q.b} = ?</Eq>,
  renderFeedbackText: (q, ok) => (
    <>
      {ok ? '✅ נכון! ' : '❌ '}
      <Eq>{q.a} × {q.b} = {q.answer}</Eq>
    </>
  ),
  answerHoverClass: 'hover:border-purple-400 hover:bg-purple-50',

  renderResultTitle: (lv) => (lv === MIXED_LEVEL ? 'תרגול מעורב — סיום!' : `לוח ${lv} — סיום!`),
  accentText700: 'text-purple-700',
  accentText500: 'text-purple-500',
  accentBg100: 'bg-purple-100',
  advanceBtn: 'from-purple-500 to-violet-600',
  gradientBtn: 'from-purple-500 to-violet-600',
  resultBg: 'bg-purple-50',
  resultBar: 'bg-purple-400',
  renderWrongList: (wrong) => {
    const unique = Array.from(new Map(wrong.map((q) => [`${q.a}x${q.b}`, q])).values());
    return (
      <div className="mt-4 rounded-2xl bg-purple-50 p-4 text-right">
        <p className="font-bold text-purple-700 mb-2">כדאי לתרגל עוד:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {unique.map((q) => (
            <span key={`${q.a}x${q.b}`} className="bg-white rounded-xl px-3 py-1 text-purple-700 font-bold shadow-sm">
              <Eq>{q.a} × {q.b} = {q.answer}</Eq>
            </span>
          ))}
        </div>
      </div>
    );
  },
};
