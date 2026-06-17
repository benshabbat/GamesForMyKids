import type { TimedMathConfig } from '@/components/game/shared/TimedMathGame';
import { useArithmeticGame } from './useArithmeticGame';
import { useArithmeticGameStore, stopArithmeticTimer } from './arithmeticGameStore';
import { LEVELS, LEVEL_EMOJIS, TIME_PER_QUESTION, ArithmeticLevel, ArithmeticQuestion } from './data/questions';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';

export const ARITHMETIC_CONFIG: TimedMathConfig<ArithmeticLevel, ArithmeticQuestion> = {
  useStore: useArithmeticGame,
  stopTimer: stopArithmeticTimer,
  onMount: () => {
    stopArithmeticTimer();
    useArithmeticGameStore.setState({ phase: 'menu', question: null, selected: null, isCorrect: null });
  },
  totalQuestions: QUESTIONS_PER_GAME,
  timePerQuestion: TIME_PER_QUESTION,

  emoji: '➕',
  title: 'חשבון מהיר',
  description: 'בחר רמה ותתחיל!',
  gradient: 'from-blue-50 to-indigo-100',
  levels: LEVELS,
  getKey: (lv) => lv.id,
  renderLevelItem: (lv) => (
    <>
      <div className="text-2xl mb-1">{LEVEL_EMOJIS[lv.id]}</div>
      <div>{lv.label}</div>
      <div className="text-xs opacity-70 mt-1 font-normal">עד {lv.maxNum}{lv.operations.includes('×') ? ' × ' + lv.maxNum : ''}</div>
    </>
  ),
  levelColumns: 2,
  levelGap: 4,
  levelButtonClass: 'p-5 rounded-2xl text-white font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition bg-gradient-to-br from-indigo-500 to-blue-600 text-start',

  renderLevelLabel: (lv) => lv.label,
  renderEquation: (q) => `${q.a} ${q.op} ${q.b} = ?`,
  renderFeedbackText: (q, ok) =>
    ok ? `✅ נכון! ${q.a} ${q.op} ${q.b} = ${q.answer}` : `❌ ${q.a} ${q.op} ${q.b} = ${q.answer}`,
  answerHoverClass: 'hover:border-indigo-400',

  renderResultTitle: (lv) => `${lv.label} — סיום!`,
  accentText700: 'text-indigo-700',
  accentText500: 'text-indigo-500',
  accentBg100: 'bg-indigo-100',
  advanceBtn: 'from-indigo-500 to-blue-600',
  gradientBtn: 'from-indigo-500 to-blue-600',
  resultBg: 'bg-indigo-50',
  resultBar: 'bg-indigo-400',
};
