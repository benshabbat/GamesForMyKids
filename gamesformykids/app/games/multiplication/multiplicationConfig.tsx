import type { TimedMathConfig } from '@/components/game/shared/TimedMathGame';
import { useMultiplicationGameStore, stopMultiplicationTimer } from './multiplicationGameStore';
import { LEVELS, QUESTIONS_PER_LEVEL, TIME_PER_QUESTION, MultiplicationQuestion } from './data/tables';

export const MULTIPLICATION_CONFIG: TimedMathConfig<number, MultiplicationQuestion> = {
  useStore: useMultiplicationGameStore,
  stopTimer: stopMultiplicationTimer,
  totalQuestions: QUESTIONS_PER_LEVEL,
  timePerQuestion: TIME_PER_QUESTION,

  emoji: '✖️',
  title: 'לוח הכפל',
  description: 'בחר לוח כפל ותתחיל!',
  gradient: 'from-violet-50 to-purple-100',
  levels: LEVELS,
  getKey: (lv) => lv,
  renderLevelItem: (lv) => lv,
  levelColumns: 5,
  levelGap: 3,
  levelButtonClass: 'aspect-square rounded-2xl text-2xl font-black text-white shadow-lg hover:scale-105 active:scale-95 transition bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500',
  menuFooter: (
    <p className="text-center text-purple-500 text-sm mt-4">
      {QUESTIONS_PER_LEVEL} שאלות ל-{TIME_PER_QUESTION} שניות כל אחת
    </p>
  ),

  renderLevelLabel: (lv) => `לוח ${lv}`,
  renderEquation: (q) => `${q.a} × ${q.b} = ?`,
  renderFeedbackText: (q, ok) =>
    ok ? `✅ נכון! ${q.a} × ${q.b} = ${q.answer}` : `❌ ${q.a} × ${q.b} = ${q.answer}`,
  answerHoverClass: 'hover:border-purple-400 hover:bg-purple-50',

  renderResultTitle: (lv) => `לוח ${lv} — סיום!`,
  accentText700: 'text-purple-700',
  accentText500: 'text-purple-500',
  accentBg100: 'bg-purple-100',
  advanceBtn: 'from-purple-500 to-violet-600',
  gradientBtn: 'from-purple-500 to-violet-600',
  resultBg: 'bg-purple-50',
  resultBar: 'bg-purple-400',
};
