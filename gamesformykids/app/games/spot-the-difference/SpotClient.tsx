'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { speakHebrew } from '@/lib/utils/speech/speaker';

interface Diff {
  index: number;
  altEmoji: string;
  hint: string;
}

interface Scene {
  name: string;
  emoji: string;
  bg: string;
  cols: number;
  items: string[];
  diffs: Diff[];
}

const SCENES: Scene[] = [
  {
    name: 'חיות', emoji: '🐾', bg: 'from-green-100 to-emerald-200',
    cols: 5,
    items: [
      '🐶','🐱','🐭','🐹','🐰',
      '🦊','🐻','🐼','🐨','🐯',
      '🦁','🐮','🐷','🐸','🐵',
      '🐔','🐧','🐦','🐤','🦜',
    ],
    diffs: [
      { index: 2,  altEmoji: '🐹', hint: 'הכלב שינה' },
      { index: 7,  altEmoji: '🐨', hint: 'הפנדה שינה' },
      { index: 11, altEmoji: '🦙', hint: 'הפרה שינתה' },
      { index: 16, altEmoji: '🦚', hint: 'הפינגווין שינה' },
      { index: 18, altEmoji: '🐦', hint: 'האפרוח שינה' },
    ],
  },
  {
    name: 'מטבח', emoji: '🍴', bg: 'from-orange-100 to-yellow-200',
    cols: 5,
    items: [
      '🍕','🍔','🌮','🌯','🥗',
      '🍱','🍛','🍲','🥘','🥣',
      '🥞','🧇','🥓','🥚','🍳',
      '🥩','🍗','🍖','🌽','🥦',
    ],
    diffs: [
      { index: 0,  altEmoji: '🍰', hint: 'הפיצה שינתה' },
      { index: 5,  altEmoji: '🍣', hint: 'הקופסה שינתה' },
      { index: 10, altEmoji: '🥐', hint: 'הלביבות שינו' },
      { index: 15, altEmoji: '🍖', hint: 'הבשר שינה' },
      { index: 18, altEmoji: '🥒', hint: 'התירס שינה' },
    ],
  },
  {
    name: 'גן', emoji: '🌳', bg: 'from-lime-100 to-green-200',
    cols: 5,
    items: [
      '🌳','🌲','🌴','🌵','🌾',
      '🍀','🌿','🌱','🌸','🌺',
      '🌻','🌼','💐','🌷','🌹',
      '🏡','🚗','🚕','🐕','🐈',
    ],
    diffs: [
      { index: 1,  altEmoji: '🌺', hint: 'עץ שינה' },
      { index: 6,  altEmoji: '🌸', hint: 'הצמח שינה' },
      { index: 12, altEmoji: '🌻', hint: 'הזר שינה' },
      { index: 17, altEmoji: '🚙', hint: 'המכונית שינתה' },
      { index: 19, altEmoji: '🐱', hint: 'החתול שינה' },
    ],
  },
  {
    name: 'ים', emoji: '🌊', bg: 'from-blue-100 to-cyan-200',
    cols: 5,
    items: [
      '🐠','🐟','🐡','🦈','🐙',
      '🦑','🦐','🦞','🦀','🐚',
      '🪸','🐚','🐬','🐳','🐋',
      '🦭','🐊','🐢','🌊','💧',
    ],
    diffs: [
      { index: 0,  altEmoji: '🐡', hint: 'הדג שינה' },
      { index: 4,  altEmoji: '🦑', hint: 'התמנון שינה' },
      { index: 9,  altEmoji: '🪸', hint: 'הצדפה שינתה' },
      { index: 13, altEmoji: '🐋', hint: 'הדולפין שינה' },
      { index: 17, altEmoji: '🐟', hint: 'הצב שינה' },
    ],
  },
  {
    name: 'שמים', emoji: '🌟', bg: 'from-indigo-100 to-purple-200',
    cols: 5,
    items: [
      '☀️','🌤️','⛅','🌥️','☁️',
      '🌦️','🌧️','⛈️','🌩️','🌨️',
      '❄️','🌬️','🌈','🌙','⭐',
      '✨','💫','🌟','🌠','🌌',
    ],
    diffs: [
      { index: 0,  altEmoji: '🌝', hint: 'השמש שינתה' },
      { index: 4,  altEmoji: '🌩️', hint: 'הענן שינה' },
      { index: 9,  altEmoji: '☃️', hint: 'השלג שינה' },
      { index: 14, altEmoji: '🌑', hint: 'הכוכב שינה' },
      { index: 17, altEmoji: '💥', hint: 'הכוכב שינה' },
    ],
  },
];

const TIMER_START = 90;
const DIFF_POINTS = 20;

type Phase = 'menu' | 'playing' | 'result';

export default function SpotClient() {
  const [phase, setPhase]         = useState<Phase>('menu');
  const [sceneIdx, setSceneIdx]   = useState(0);
  const [found, setFound]         = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft]   = useState(TIMER_START);
  const [score, setScore]         = useState(0);
  const [wrongIdx, setWrongIdx]   = useState<number | null>(null);
  const [shakePanel, setShake]    = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const startScene = useCallback((idx: number, initialScore = 0) => {
    setSceneIdx(idx);
    setFound(new Set());
    setTimeLeft(TIMER_START);
    setScore(initialScore);
    setWrongIdx(null);
    setPhase('playing');
    const s = SCENES[idx]!;
    setTimeout(() => speakHebrew(`מצא 5 הבדלים ב${s.name}!`), 300);
  }, []);

  const startGame = useCallback(() => {
    const idx = Math.floor(Math.random() * SCENES.length);
    startScene(idx, 0);
  }, [startScene]);

  // Countdown timer
  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          stopTimer();
          setPhase('result');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return stopTimer;
  }, [phase, stopTimer]);

  const handleTap = useCallback((index: number, fromAltPanel: boolean) => {
    if (phase !== 'playing') return;
    const scene = SCENES[sceneIdx]!;
    const diff = scene.diffs.find(d => d.index === index);

    if (diff && !found.has(index)) {
      const newFound = new Set(found);
      newFound.add(index);
      setFound(newFound);
      const newScore = score + DIFF_POINTS;
      setScore(newScore);
      speakHebrew(`כן! מצאת! ${diff.hint}`);

      if (newFound.size >= scene.diffs.length) {
        stopTimer();
        setTimeout(() => {
          setPhase('result');
          speakHebrew(`מדהים! מצאת את כל ה-5 הבדלים!`);
        }, 600);
      }
    } else if (!diff || found.has(index)) {
      setWrongIdx(index);
      setShake(true);
      speakHebrew('לא הבדל כאן!');
      if (flashRef.current) clearTimeout(flashRef.current);
      flashRef.current = setTimeout(() => {
        setWrongIdx(null);
        setShake(false);
      }, 500);
    }
  }, [phase, sceneIdx, found, score, stopTimer]);

  useEffect(() => () => {
    stopTimer();
    if (flashRef.current) clearTimeout(flashRef.current);
  }, [stopTimer]);

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-purple-900 mb-2">מצא את ההבדל</h1>
          <p className="text-purple-600 text-lg">מצא 5 הבדלים בין שתי התמונות!</p>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-6">
          {SCENES.map(s => (
            <div key={s.name} className="text-center">
              <div className="text-3xl">{s.emoji}</div>
              <p className="text-xs text-gray-600 mt-1">{s.name}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/80 rounded-2xl p-4 mb-6 text-sm text-purple-800 space-y-1 max-w-xs w-full text-center">
          <p>👀 שתי תמונות זהות כמעט</p>
          <p>🔍 מצא 5 הבדלים</p>
          <p>⏱️ 90 שניות לכל שלב</p>
          <p>⭐ 20 נקודות לכל הבדל</p>
        </div>
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl px-10 py-4 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          התחל! 🔍
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const scene = SCENES[sceneIdx]!;
    const stars = found.size >= 5 ? 3 : found.size >= 3 ? 2 : 1;
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 text-center max-w-sm w-full shadow-xl">
          <div className="text-5xl mb-3">{found.size >= 5 ? '🏆' : found.size >= 3 ? '🥈' : '🥉'}</div>
          <h2 className="text-2xl font-bold text-purple-900 mb-1">
            {found.size >= 5 ? 'מדהים!' : 'כל הכבוד!'}
          </h2>
          <p className="text-gray-500 mb-2">מצאת {found.size} מתוך 5 הבדלים</p>
          <div className="text-4xl font-bold text-yellow-500 mb-1">{score}</div>
          <p className="text-gray-400 text-sm mb-2">נקודות</p>
          <div className="flex justify-center gap-1 text-3xl mb-5">
            {Array.from({ length: 3 }, (_, i) => <span key={i}>{i < stars ? '⭐' : '☆'}</span>)}
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                const next = (sceneIdx + 1) % SCENES.length;
                startScene(next, score);
              }}
              className="bg-purple-500 text-white font-bold px-5 py-3 rounded-xl hover:bg-purple-600 transition"
            >
              סצנה הבאה →
            </button>
            <button
              onClick={() => { stopTimer(); setPhase('menu'); }}
              className="bg-gray-200 text-gray-700 font-bold px-5 py-3 rounded-xl hover:bg-gray-300 transition"
            >
              תפריט
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  const scene = SCENES[sceneIdx]!;

  // Build panel B items
  const itemsA = scene.items;
  const itemsB = scene.items.map((e, i) => {
    const d = scene.diffs.find(d => d.index === i);
    return d ? d.altEmoji : e;
  });

  const timerColor = timeLeft <= 15 ? 'text-red-500' : timeLeft <= 30 ? 'text-orange-500' : 'text-green-600';

  const renderPanel = (items: string[], panel: 'A' | 'B') => (
    <div
      className={`bg-white/80 rounded-2xl p-2 shadow-md flex-1 transition-all ${shakePanel ? 'animate-pulse' : ''}`}
    >
      <p className="text-center text-xs text-gray-500 mb-1 font-bold">תמונה {panel === 'A' ? 'א' : 'ב'}</p>
      <div
        className="grid gap-0.5"
        style={{ gridTemplateColumns: `repeat(${scene.cols}, 1fr)` }}
      >
        {items.map((emoji, i) => {
          const isFound   = scene.diffs.some(d => d.index === i) && found.has(i);
          const isWrong   = wrongIdx === i;
          return (
            <button
              key={i}
              onClick={() => handleTap(i, panel === 'B')}
              className={`
                aspect-square text-xl sm:text-2xl flex items-center justify-center rounded-lg transition-all
                ${isFound  ? 'bg-green-300 ring-2 ring-green-500 scale-105' : ''}
                ${isWrong  ? 'bg-red-200 scale-95' : ''}
                ${!isFound && !isWrong ? 'hover:bg-purple-100 active:scale-95' : ''}
              `}
            >
              {emoji}
              {isFound && <span className="absolute text-xs text-green-700">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br ${scene.bg} p-3`}>
      {/* HUD */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{scene.emoji}</span>
          <span className="font-bold text-purple-900 text-sm">{scene.name}</span>
        </div>
        <div className={`font-bold text-xl ${timerColor}`}>⏱️ {timeLeft}</div>
        <div className="bg-yellow-400 text-gray-800 font-bold px-3 py-1 rounded-full text-sm">{score}</div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-purple-700">הבדלים:</span>
        {scene.diffs.map((d, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-all ${found.has(d.index) ? 'bg-green-400 border-green-500' : 'bg-white border-gray-300'}`}
          >
            {found.has(d.index) ? '✓' : i + 1}
          </div>
        ))}
        <span className="text-sm text-purple-700 mr-1">{found.size}/5</span>
      </div>

      {/* Two panels */}
      <div className="flex flex-col sm:flex-row gap-2 flex-1">
        {renderPanel(itemsA, 'A')}
        {renderPanel(itemsB, 'B')}
      </div>

      <p className="text-center text-xs text-purple-600 mt-2">לחץ על ההבדל בכל אחת מהתמונות</p>
    </div>
  );
}
