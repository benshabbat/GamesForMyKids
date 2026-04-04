'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

const FACTS = [
  { fact: 'לכלב יש ארבע רגליים', answer: true, emoji: '🐕' },
  { fact: 'השמש היא כוכב', answer: true, emoji: '☀️' },
  { fact: 'דגים נושמים בעזרת ריאות', answer: false, emoji: '🐟' },
  { fact: 'לעכביש יש שמונה רגליים', answer: true, emoji: '🕷️' },
  { fact: 'הירח פולט אור עצמי', answer: false, emoji: '🌙' },
  { fact: 'לדולפין יש ריאות', answer: true, emoji: '🐬' },
  { fact: 'לנחש יש רגליים', answer: false, emoji: '🐍' },
  { fact: 'עכביש הוא חרק', answer: false, emoji: '🕷️' },
  { fact: 'ענבים הם פרי', answer: true, emoji: '🍇' },
  { fact: 'זברה שייכת למשפחת הסוסים', answer: true, emoji: '🦓' },
  { fact: 'פינגווין יכול לעוף', answer: false, emoji: '🐧' },
  { fact: 'תפוח גדל על עץ', answer: true, emoji: '🍎' },
  { fact: 'לחתול יש שש רגליים', answer: false, emoji: '🐈' },
  { fact: 'השמיים כחולים ביום', answer: true, emoji: '🌤️' },
  { fact: 'לדבורה יש כנפיים', answer: true, emoji: '🐝' },
  { fact: 'בננה היא ירק', answer: false, emoji: '🍌' },
  { fact: 'ציפורים מטילות ביצים', answer: true, emoji: '🐦' },
  { fact: 'לדג יש רגליים', answer: false, emoji: '🐠' },
  { fact: 'הלב שואב דם בגוף', answer: true, emoji: '❤️' },
  { fact: 'ים שתייה מלוח', answer: true, emoji: '🌊' },
  { fact: 'קוף אוהב בננות', answer: true, emoji: '🐒' },
  { fact: 'לפרפר שלוש זוגות כנפיים', answer: false, emoji: '🦋' },
  { fact: 'אריה הוא חיית בית', answer: false, emoji: '🦁' },
  { fact: 'שלג צבעו לבן', answer: true, emoji: '❄️' },
  { fact: 'תות שדה הוא פרי', answer: true, emoji: '🍓' },
];

const TIME_PER_Q = 6;
type Phase = 'menu' | 'playing' | 'dead';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TrueFalseGame() {
  const [phase, setPhase]       = useState<Phase>('menu');
  const [deck, setDeck]         = useState(shuffle(FACTS));
  const [idx, setIdx]           = useState(0);
  const [score, setScore]       = useState(0);
  const [best, setBest]         = useState(0);
  const [lives, setLives]       = useState(3);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const phaseRef  = useRef<Phase>('menu');
  const scoreRef  = useRef(0);
  const livesRef  = useRef(3);
  const idxRef    = useRef(0);
  const deckRef   = useRef(shuffle(FACTS));

  const nextQ = useCallback(() => {
    const nextIdx = idxRef.current + 1;
    if (nextIdx >= deckRef.current.length) {
      // reshuffle for next round
      deckRef.current = shuffle(FACTS);
      setDeck([...deckRef.current]);
      idxRef.current = 0;
    } else {
      idxRef.current = nextIdx;
    }
    setIdx(idxRef.current);
    setTimeLeft(TIME_PER_Q);
    setFeedback(null);
  }, []);

  const startGame = useCallback(() => {
    const d = shuffle(FACTS);
    deckRef.current = d;
    idxRef.current  = 0;
    scoreRef.current = 0;
    livesRef.current = 3;
    phaseRef.current = 'playing';
    setDeck(d);
    setIdx(0);
    setScore(0);
    setLives(3);
    setTimeLeft(TIME_PER_Q);
    setFeedback(null);
    setPhase('playing');
  }, []);

  // Countdown
  useEffect(() => {
    if (phase !== 'playing' || feedback) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // time out = wrong
          const newLives = livesRef.current - 1;
          livesRef.current = newLives;
          setLives(newLives);
          setFeedback('wrong');
          if (newLives <= 0) {
            phaseRef.current = 'dead';
            setPhase('dead');
            setBest(b => Math.max(b, scoreRef.current));
          }
          return TIME_PER_Q;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, feedback]);

  // Auto-advance after feedback
  useEffect(() => {
    if (!feedback || phaseRef.current !== 'playing') return;
    const t = setTimeout(nextQ, 800);
    return () => clearTimeout(t);
  }, [feedback, nextQ]);

  const answer = useCallback((choice: boolean) => {
    if (phaseRef.current !== 'playing' || feedback) return;
    const correct = choice === deckRef.current[idxRef.current].answer;
    if (correct) {
      const ns = scoreRef.current + 10;
      scoreRef.current = ns;
      setScore(ns);
      setFeedback('correct');
    } else {
      const nl = livesRef.current - 1;
      livesRef.current = nl;
      setLives(nl);
      setFeedback('wrong');
      if (nl <= 0) {
        phaseRef.current = 'dead';
        setPhase('dead');
        setBest(b => Math.max(b, scoreRef.current));
      }
    }
  }, [feedback]);

  const q = deck[idx];

  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-3xl font-black text-gray-700 mb-2">נכון או לא נכון?</h1>
        <p className="text-gray-500 text-sm mb-2">קרא את המשפט ולחץ ✅ או ❌</p>
        <p className="text-gray-400 text-xs mb-6">3 חיים · {TIME_PER_Q} שניות לכל שאלה</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: {best}</p>}
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all">
          ✅ התחל!
        </button>
      </div>
    </div>
  );

  if (phase === 'dead') return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-3">🧠</div>
        <h2 className="text-2xl font-black text-gray-700 mb-4">כל הכבוד על הניסיון!</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-teal-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-teal-600">{score}</p>
            <p className="text-xs text-teal-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all">
          🔄 שוב!
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {/* HUD */}
      <div className="flex gap-6 mb-5 text-center">
        <div><p className="text-2xl font-black text-teal-600">{score}</p><p className="text-xs text-teal-400">ניקוד</p></div>
        <div className="flex gap-1 items-center">{[0,1,2].map(i=><span key={i} className={`text-2xl ${i<lives?'':'opacity-20'}`}>❤️</span>)}</div>
        <div><p className={`text-2xl font-black ${timeLeft<=2?'text-red-500 animate-pulse':'text-cyan-600'}`}>{timeLeft}</p><p className="text-xs text-cyan-400">שניות</p></div>
      </div>

      {/* Question card */}
      <div className={`w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl mb-6 transition-all duration-200 ${
        feedback === 'correct' ? 'ring-4 ring-green-400 bg-green-50' :
        feedback === 'wrong'   ? 'ring-4 ring-red-400 bg-red-50' : ''
      }`}>
        <div className="text-5xl mb-4">{q?.emoji}</div>
        <p className="text-xl font-bold text-gray-700 leading-relaxed">{q?.fact}</p>
        {feedback && (
          <p className={`text-3xl mt-3 ${feedback==='correct'?'text-green-500':'text-red-500'}`}>
            {feedback === 'correct' ? '✅ נכון!' : q?.answer ? '❌ אוי! זה נכון' : '❌ אוי! זה לא נכון'}
          </p>
        )}
        {/* Progress bar */}
        <div className="mt-4 bg-gray-100 rounded-full h-2">
          <div className="bg-gradient-to-r from-teal-400 to-cyan-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${(timeLeft/TIME_PER_Q)*100}%` }} />
        </div>
      </div>

      {/* Answer buttons */}
      <div className="flex gap-5 w-full max-w-sm">
        <button
          onClick={() => answer(true)}
          disabled={!!feedback}
          className="flex-1 py-6 rounded-3xl bg-green-500 text-white font-black text-5xl shadow-xl active:scale-90 hover:bg-green-400 transition-all disabled:opacity-60"
        >✅</button>
        <button
          onClick={() => answer(false)}
          disabled={!!feedback}
          className="flex-1 py-6 rounded-3xl bg-red-500 text-white font-black text-5xl shadow-xl active:scale-90 hover:bg-red-400 transition-all disabled:opacity-60"
        >❌</button>
      </div>
    </div>
  );
}
