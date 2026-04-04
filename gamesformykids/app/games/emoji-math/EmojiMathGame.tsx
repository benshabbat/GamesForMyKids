'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

const EMOJIS = ['🍎','🌟','🐶','🎈','🍕','🚗','🌸','🦋','🍦','🎸','🐱','🏆','🍇','🦄','🎯'];

type Op = '+' | '-';
type Phase = 'menu' | 'playing' | 'dead';

interface Question { a: number; b: number; op: Op; answer: number; choices: number[]; emojiA: string; emojiB: string; }

function rnd(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pickEmoji() { return EMOJIS[Math.floor(Math.random() * EMOJIS.length)]; }

function makeQuestion(level: number): Question {
  const maxNum = Math.min(5 + level * 2, 15);
  const op: Op = level < 3 ? '+' : (Math.random() < 0.6 ? '+' : '-');
  let a: number, b: number;
  if (op === '+') {
    a = rnd(1, maxNum); b = rnd(1, maxNum - a + 1);
  } else {
    a = rnd(2, maxNum); b = rnd(1, a);
  }
  const answer = op === '+' ? a + b : a - b;
  const wrong = new Set<number>();
  while (wrong.size < 3) {
    const w = answer + rnd(-3, 3);
    if (w !== answer && w >= 0 && w <= 20) wrong.add(w);
  }
  const choices = [...wrong, answer].sort(() => Math.random() - 0.5);
  const e1 = pickEmoji(), e2 = op === '+' ? pickEmoji() : e1;
  return { a, b, op, answer, choices, emojiA: e1, emojiB: e2 };
}

const TIME_PER_Q = 8;

export default function EmojiMathGame() {
  const [phase,    setPhase]    = useState<Phase>('menu');
  const [q,        setQ]        = useState<Question>(makeQuestion(1));
  const [score,    setScore]    = useState(0);
  const [best,     setBest]     = useState(0);
  const [lives,    setLives]    = useState(3);
  const [level,    setLevel]    = useState(1);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [streak,   setStreak]   = useState(0);

  const phaseRef  = useRef<Phase>('menu');
  const scoreRef  = useRef(0);
  const livesRef  = useRef(3);
  const levelRef  = useRef(1);
  const streakRef = useRef(0);

  const nextQ = useCallback(() => {
    setQ(makeQuestion(levelRef.current));
    setTimeLeft(TIME_PER_Q);
    setFeedback(null);
  }, []);

  const startGame = useCallback(() => {
    phaseRef.current = 'playing'; scoreRef.current = 0; livesRef.current = 3;
    levelRef.current = 1; streakRef.current = 0;
    setPhase('playing'); setScore(0); setLives(3); setLevel(1); setStreak(0);
    setQ(makeQuestion(1)); setTimeLeft(TIME_PER_Q); setFeedback(null);
  }, []);

  useEffect(() => {
    if (phase !== 'playing' || feedback) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const nl = livesRef.current - 1; livesRef.current = nl; setLives(nl);
          streakRef.current = 0; setStreak(0);
          setFeedback('wrong');
          if (nl <= 0) { phaseRef.current = 'dead'; setPhase('dead'); setBest(b => Math.max(b, scoreRef.current)); }
          return TIME_PER_Q;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, feedback]);

  useEffect(() => {
    if (!feedback || phaseRef.current !== 'playing') return;
    const t = setTimeout(nextQ, 900);
    return () => clearTimeout(t);
  }, [feedback, nextQ]);

  const tap = useCallback((choice: number) => {
    if (phaseRef.current !== 'playing' || feedback) return;
    if (choice === q.answer) {
      const ns = streakRef.current + 1; streakRef.current = ns; setStreak(ns);
      const bonus = ns >= 3 ? 20 : 10;
      scoreRef.current += bonus; setScore(scoreRef.current);
      if (scoreRef.current > 0 && scoreRef.current % 50 === 0) {
        levelRef.current++; setLevel(levelRef.current);
      }
      setFeedback('correct');
    } else {
      const nl = livesRef.current - 1; livesRef.current = nl; setLives(nl);
      streakRef.current = 0; setStreak(0);
      setFeedback('wrong');
      if (nl <= 0) { phaseRef.current = 'dead'; setPhase('dead'); setBest(b => Math.max(b, scoreRef.current)); }
    }
  }, [feedback, q.answer]);

  const renderEmojis = (count: number, emoji: string) =>
    Array.from({ length: Math.min(count, 15) }, (_, i) => (
      <span key={i} className="text-2xl leading-none">{emoji}</span>
    ));

  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-4">🧮</div>
        <h1 className="text-3xl font-black text-gray-700 mb-2">מתמטיקה עם אמוג&apos;י</h1>
        <p className="text-gray-500 text-sm mb-2">ספור את האמוג&apos;י ופתור את התרגיל!</p>
        <p className="text-gray-400 text-xs mb-6">3 חיים · רצף מנצח = +20 נקודות</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: {best}</p>}
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all">
          🧮 התחל!
        </button>
      </div>
    </div>
  );

  if (phase === 'dead') return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-3">🤓</div>
        <h2 className="text-2xl font-black text-gray-700 mb-4">כל הכבוד על המאמץ!</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-orange-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-orange-600">{score}</p>
            <p className="text-xs text-orange-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all">
          🔄 שוב!
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {/* HUD */}
      <div className="flex gap-5 mb-4 text-center">
        <div>
          <p className="text-2xl font-black text-orange-600">{score}</p>
          <p className="text-xs text-orange-400">ניקוד</p>
        </div>
        <div className="flex gap-1 items-center">{[0,1,2].map(i=><span key={i} className={`text-xl ${i<lives?'':'opacity-20'}`}>❤️</span>)}</div>
        <div><p className={`text-2xl font-black ${timeLeft<=2?'text-red-500 animate-pulse':'text-orange-700'}`}>{timeLeft}</p><p className="text-xs text-orange-400">שניות</p></div>
        {streak >= 2 && <div><p className="text-2xl font-black text-yellow-500">🔥{streak}</p><p className="text-xs text-yellow-400">רצף</p></div>}
      </div>

      {/* Question */}
      <div className={`w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl mb-5 transition-all duration-200 ${
        feedback==='correct'?'ring-4 ring-green-400 bg-green-50':feedback==='wrong'?'ring-4 ring-red-400 bg-red-50':''
      }`}>
        <p className="text-center text-gray-400 text-xs mb-3">רמה {level}</p>
        <div className="flex flex-wrap gap-1 justify-center mb-3 min-h-12 p-2 bg-orange-50 rounded-2xl">
          {renderEmojis(q.a, q.emojiA)}
        </div>
        <div className="text-center text-2xl font-black text-gray-700 my-2">
          {q.op === '+' ? '➕' : '➖'}
        </div>
        <div className="flex flex-wrap gap-1 justify-center mb-3 min-h-12 p-2 bg-yellow-50 rounded-2xl">
          {renderEmojis(q.b, q.emojiB)}
        </div>
        <p className="text-center text-4xl font-black text-gray-700">= ?</p>
        <div className="mt-3 bg-gray-100 rounded-full h-1.5">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${(timeLeft/TIME_PER_Q)*100}%` }} />
        </div>
      </div>

      {/* Choices */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {q.choices.map(c => (
          <button
            key={c}
            onClick={() => tap(c)}
            disabled={!!feedback}
            className="py-5 rounded-3xl bg-white font-black text-3xl text-gray-700 shadow-xl border-2 border-orange-200 active:scale-90 hover:border-orange-400 transition-all disabled:opacity-60"
          >{c}</button>
        ))}
      </div>
    </div>
  );
}
