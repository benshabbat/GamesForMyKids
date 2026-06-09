'use client';
import { ReactNode, useEffect } from 'react';
import GameMenuGrid, { type MenuCardConfig } from './GameMenuGrid';
import GameResultCard from './GameResultCard';

interface TimedMathStore<Level, Q> {
  phase: 'menu' | 'playing' | 'result';
  level: Level;
  question: Q | null;
  questionNum: number;
  score: number;
  correct: number;
  selected: number | null;
  isCorrect: boolean | null;
  timeLeft: number;
  startGame: (level: Level) => void;
  selectAnswer: (val: number) => void;
  advance: () => void;
  goMenu: () => void;
}

export interface TimedMathConfig<Level, Q extends { answer: number; choices: number[] }> {
  useStore: () => TimedMathStore<Level, Q>;
  stopTimer: () => void;
  onMount?: () => void;
  totalQuestions: number;
  timePerQuestion: number;

  emoji: string;
  title: string;
  description: string;
  gradient: string;
  levels: Level[];
  getKey: (lv: Level) => string | number;
  renderLevelItem: (lv: Level) => ReactNode;
  levelColumns?: 2 | 3 | 4 | 5;
  levelGap?: 2 | 3 | 4 | 6;
  levelButtonClass: string;
  menuFooter?: ReactNode;

  renderLevelLabel: (lv: Level) => string;
  renderEquation: (q: Q) => ReactNode;
  renderFeedbackText: (q: Q, isCorrect: boolean) => string;
  answerHoverClass: string;

  renderResultTitle: (lv: Level) => string;
  accentText700: string;
  accentText500: string;
  accentBg100: string;
  advanceBtn: string;
  gradientBtn: string;
  resultBg: string;
  resultBar: string;
}

export default function TimedMathGame<Level, Q extends { answer: number; choices: number[] }>({
  config,
}: {
  config: TimedMathConfig<Level, Q>;
}) {
  const {
    phase, level, question, questionNum, score, correct,
    selected, isCorrect, timeLeft,
    startGame, selectAnswer, advance, goMenu,
  } = config.useStore();

  useEffect(() => {
    config.onMount?.();
    return config.stopTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'menu') {
    const menuCard: MenuCardConfig = {
      emoji: config.emoji,
      title: config.title,
      description: config.description,
      gradientClass: config.gradient,
    };
    return (
      <GameMenuGrid<Level>
        card={menuCard}
        items={config.levels}
        getKey={config.getKey}
        onSelect={startGame}
        renderItem={config.renderLevelItem}
        buttonClass={config.levelButtonClass}
        {...(config.levelColumns !== undefined && { columns: config.levelColumns })}
        {...(config.levelGap !== undefined && { gap: config.levelGap })}
        {...(config.menuFooter !== undefined && { footer: config.menuFooter })}
      />
    );
  }

  if (phase === 'playing') {
    if (!question) return null;
    const timePct = (timeLeft / config.timePerQuestion) * 100;
    const timerColor = timePct > 60 ? 'bg-green-400' : timePct > 30 ? 'bg-yellow-400' : 'bg-red-400';

    return (
      <div className={`min-h-screen bg-gradient-to-br ${config.gradient} p-4`} dir="rtl">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <button onClick={goMenu} className={`${config.accentText500} text-sm ${config.accentBg100} rounded-full px-3 py-1`}>← חזור</button>
            <span className={`font-bold ${config.accentText700}`}>{config.renderLevelLabel(level)} | שאלה {questionNum + 1}/{config.totalQuestions}</span>
            <span className={`font-bold ${config.accentText700}`}>⭐ {score}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full mb-5 overflow-hidden">
            <div className={`h-full rounded-full transition-[width,background-color] duration-1000 ${timerColor}`} style={{ width: `${timePct}%` }} />
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-10 mb-6 text-center">
            <p className={`text-5xl font-black ${config.accentText700}`}>{config.renderEquation(question)}</p>
            <p className="text-gray-400 mt-3">⏱️ {timeLeft} שניות</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {question.choices.map((choice, i) => {
              let style = `bg-white border-2 border-gray-200 text-gray-700 ${config.answerHoverClass}`;
              if (selected !== null) {
                if (choice === question.answer) style = 'bg-green-500 border-2 border-green-600 text-white';
                else if (choice === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
                else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
              }
              return (
                <button key={i} onClick={() => selectAnswer(choice)} disabled={selected !== null}
                  className={`py-5 rounded-2xl text-3xl font-black transition-transform active:scale-95 ${style}`}>
                  {choice}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <div className="mt-4">
              <div className={`rounded-2xl p-3 mb-3 text-center font-bold text-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {config.renderFeedbackText(question, isCorrect ?? false)}
              </div>
              <button onClick={advance} className={`w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l ${config.advanceBtn} shadow-lg hover:opacity-90 active:scale-95 transition-[transform,opacity]`}>
                {questionNum < config.totalQuestions - 1 ? 'שאלה הבאה ←' : 'תוצאות! 🎉'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const pct = Math.round((correct / config.totalQuestions) * 100);
  return (
    <GameResultCard
      emoji={pct >= 80 ? '🏆' : pct >= 50 ? '😊' : '💪'}
      title={config.renderResultTitle(level)}
      gradientClass={config.gradient}
      buttonClass={config.gradientBtn}
      onRestart={() => startGame(level)}
      secondaryAction={{ label: '📋 רמות', onClick: goMenu }}
    >
      <div className={`${config.resultBg} rounded-2xl p-5`}>
        <p className={`text-4xl font-black ${config.accentText700}`}>{correct} / {config.totalQuestions}</p>
        <p className={`${config.accentText500} text-sm mt-1`}>תשובות נכונות</p>
        <p className={`text-xl font-bold ${config.accentText700} mt-2`}>⭐ {score} נקודות</p>
        <div className="mt-2 h-3 bg-white/50 rounded-full">
          <div className={`h-full ${config.resultBar} rounded-full`} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </GameResultCard>
  );
}
