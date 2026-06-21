'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { speakHebrew } from '@/lib/utils/speech/speaker';

type Zone = 'head' | 'neck' | 'torso' | 'hands' | 'legs' | 'feet';
type Category = 'daily' | 'seasonal' | 'professions';
type Phase = 'menu' | 'playing' | 'result';

interface ClothingItem {
  name: string;
  hebrew: string;
  prompt: string;
  emoji: string;
  zone: Zone;
  category: Category;
}

const CLOTHING: ClothingItem[] = [
  // Daily
  { name: 'hat',        hebrew: 'כּוֹבַע',          prompt: 'שים כובע!',          emoji: '🧢', zone: 'head',   category: 'daily' },
  { name: 'shirt',      hebrew: 'חוּלְצָה',          prompt: 'שים חולצה!',         emoji: '👕', zone: 'torso',  category: 'daily' },
  { name: 'dress',      hebrew: 'שִׂמְלָה',          prompt: 'שים שמלה!',          emoji: '👗', zone: 'torso',  category: 'daily' },
  { name: 'pants',      hebrew: 'מִכְנָסַיִם',        prompt: 'שים מכנסיים!',       emoji: '👖', zone: 'legs',   category: 'daily' },
  { name: 'shoes',      hebrew: 'נַעֲלַיִם',          prompt: 'שים נעליים!',        emoji: '👟', zone: 'feet',   category: 'daily' },
  { name: 'socks',      hebrew: 'גַּרְבַּיִם',        prompt: 'שים גרביים!',        emoji: '🧦', zone: 'feet',   category: 'daily' },
  // Seasonal
  { name: 'coat',       hebrew: 'מְעִיל',            prompt: 'שים מעיל!',          emoji: '🧥', zone: 'torso',  category: 'seasonal' },
  { name: 'scarf',      hebrew: 'צָעִיף',            prompt: 'שים צעיף!',          emoji: '🧣', zone: 'neck',   category: 'seasonal' },
  { name: 'gloves',     hebrew: 'כְּפָפוֹת',          prompt: 'שים כפפות!',         emoji: '🧤', zone: 'hands',  category: 'seasonal' },
  { name: 'boots',      hebrew: 'מַגָּפַיִם',          prompt: 'שים מגפיים!',        emoji: '👢', zone: 'feet',   category: 'seasonal' },
  { name: 'sunglasses', hebrew: 'מִשְׁקְפֵי שֶׁמֶשׁ', prompt: 'שים משקפי שמש!',    emoji: '🕶️', zone: 'head',   category: 'seasonal' },
  { name: 'umbrella',   hebrew: 'מִטְרִיָּה',          prompt: 'שים מטרייה!',        emoji: '☂️', zone: 'hands',  category: 'seasonal' },
  // Professions
  { name: 'hard-hat',   hebrew: 'קַסְדָּה',           prompt: 'שים קסדה!',          emoji: '⛑️', zone: 'head',   category: 'professions' },
  { name: 'graduation', hebrew: 'כּוֹבַע סִיּוּם',    prompt: 'שים כובע סיום!',     emoji: '🎓', zone: 'head',   category: 'professions' },
  { name: 'lab-coat',   hebrew: 'חֲלוּק לָבָן',       prompt: 'שים חלוק לבן!',      emoji: '🥼', zone: 'torso',  category: 'professions' },
  { name: 'backpack',   hebrew: 'תִּיק גַּב',          prompt: 'שים תיק גב!',        emoji: '🎒', zone: 'hands',  category: 'professions' },
  { name: 'stethoscope',hebrew: 'סְטֶתוֹסְקוֹפ',      prompt: 'שים סטטוסקופ!',      emoji: '🩺', zone: 'neck',   category: 'professions' },
];

const ZONE_ORDER: Zone[] = ['head', 'neck', 'torso', 'hands', 'legs', 'feet'];
const ZONE_PLACEHOLDER: Record<Zone, string> = {
  head: '❓', neck: '❓', torso: '❓', hands: '❓', legs: '❓', feet: '❓',
};
const ZONE_LABEL: Record<Zone, string> = {
  head: 'ראש', neck: 'צוואר', torso: 'גוף', hands: 'ידיים', legs: 'רגליים', feet: 'נעליים',
};

const QUESTIONS_PER_GAME = 8;
const CATEGORY_LABELS: Record<Category, string> = {
  daily: '👕 לבוש יומיומי',
  seasonal: '🌦️ לבוש עונתי',
  professions: '🎓 לבוש מקצועי',
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildChoices(correct: ClothingItem, pool: ClothingItem[]): ClothingItem[] {
  const others = shuffle(pool.filter(c => c.name !== correct.name)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export default function DressUpClient() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [questions, setQuestions] = useState<ClothingItem[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [choices, setChoices] = useState<ClothingItem[]>([]);
  const [dressed, setDressed] = useState<Partial<Record<Zone, ClothingItem>>>({});
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startGame = useCallback(() => {
    const qs = shuffle(CLOTHING).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    setQIdx(0);
    setScore(0);
    setDressed({});
    setFeedback(null);
    const first = qs[0]!;
    setChoices(buildChoices(first, CLOTHING));
    setPhase('playing');
    setTimeout(() => speakHebrew(first.prompt), 400);
  }, []);

  const current = questions[qIdx];

  const selectAnswer = useCallback((item: ClothingItem) => {
    if (feedback || !current) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    if (item.name === current.name) {
      setFeedback('correct');
      setScore(s => s + 1);
      setDressed(d => ({ ...d, [current.zone]: current }));
      speakHebrew(`כן! ${current.hebrew}!`);
      timerRef.current = setTimeout(() => {
        const next = qIdx + 1;
        if (next >= questions.length) {
          setPhase('result');
        } else {
          const nextQ = questions[next]!;
          setQIdx(next);
          setChoices(buildChoices(nextQ, CLOTHING));
          setFeedback(null);
          setTimeout(() => speakHebrew(nextQ.prompt), 300);
        }
      }, 1300);
    } else {
      setFeedback('wrong');
      speakHebrew('לא נכון, נסה שוב!');
      timerRef.current = setTimeout(() => setFeedback(null), 900);
    }
  }, [current, feedback, qIdx, questions]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-purple-200 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-8xl mb-4 animate-bounce">👗</div>
        <h1 className="text-4xl font-bold text-purple-800 mb-3">לבוש את הדמות</h1>
        <p className="text-xl text-purple-600 mb-2">הקשב לשם הבגד ובחר את הנכון!</p>
        <div className="flex gap-4 text-lg text-purple-500 mb-8 flex-wrap justify-center">
          <span>👕 יומיומי</span>
          <span>🧥 עונתי</span>
          <span>🎓 מקצועי</span>
        </div>
        <button
          onClick={startGame}
          className="bg-purple-600 hover:bg-purple-700 text-white text-2xl font-bold px-12 py-5 rounded-2xl shadow-xl transform hover:scale-105 transition-transform"
        >
          🎮 התחל!
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / QUESTIONS_PER_GAME) * 100);
    const medal = pct === 100 ? '🥇' : pct >= 75 ? '🥈' : pct >= 50 ? '🥉' : '⭐';
    const msg = pct === 100 ? 'מושלם! לבשת הכל נכון!' : pct >= 75 ? 'כל הכבוד!' : pct >= 50 ? 'יפה מאוד!' : 'נסה שוב!';
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-purple-200 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-8xl mb-4">{medal}</div>
        <h2 className="text-4xl font-bold text-purple-800 mb-2">{msg}</h2>
        <p className="text-2xl text-purple-600 mb-6">{score} מתוך {QUESTIONS_PER_GAME} נכון</p>
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 max-w-sm w-full">
          <p className="text-purple-700 font-bold mb-4 text-lg">הדמות שלבשת:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.values(dressed).map(item => (
              <div key={item.name} className="flex flex-col items-center gap-1">
                <span className="text-4xl">{item.emoji}</span>
                <span className="text-xs text-purple-600">{item.hebrew}</span>
              </div>
            ))}
            {Object.values(dressed).length === 0 && (
              <span className="text-gray-400">אין פריטים</span>
            )}
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold px-10 py-4 rounded-2xl shadow-xl"
        >
          🔄 שחק שוב
        </button>
      </div>
    );
  }

  // Playing phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-purple-200 flex flex-col items-center p-4" dir="rtl">
      {/* Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-4 pt-2">
        <span className="bg-white rounded-full px-4 py-1 text-purple-700 font-bold text-lg shadow">
          {qIdx + 1} / {QUESTIONS_PER_GAME}
        </span>
        <span className="text-purple-600 text-sm font-medium">{CATEGORY_LABELS[current?.category ?? 'daily']}</span>
        <span className="bg-white rounded-full px-4 py-1 text-purple-700 font-bold text-lg shadow">
          ⭐ {score}
        </span>
      </div>

      {/* Character display */}
      <div className="bg-white rounded-3xl shadow-xl p-4 mb-4 w-full max-w-md">
        <div className="flex justify-center gap-6">
          {/* Body zones */}
          <div className="flex flex-col gap-2 items-center">
            {ZONE_ORDER.map(zone => (
              <div key={zone} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-12 text-left">{ZONE_LABEL[zone]}</span>
                <div className={`w-14 h-12 flex items-center justify-center rounded-xl border-2 transition-all ${
                  dressed[zone]
                    ? 'border-purple-300 bg-purple-50'
                    : 'border-dashed border-gray-200 bg-gray-50'
                }`}>
                  <span className="text-3xl">
                    {dressed[zone] ? dressed[zone]!.emoji : ZONE_PLACEHOLDER[zone]}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Character figure */}
          <div className="flex flex-col items-center justify-center text-6xl leading-none">
            <span>🧑</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className={`bg-white rounded-2xl shadow-lg p-4 mb-4 w-full max-w-md text-center border-4 transition-colors ${
        feedback === 'correct' ? 'border-green-400 bg-green-50' :
        feedback === 'wrong' ? 'border-red-300 bg-red-50' :
        'border-purple-200'
      }`}>
        <button
          onClick={() => current && speakHebrew(current.prompt)}
          className="text-2xl font-bold text-purple-700 flex items-center justify-center gap-2 w-full"
        >
          <span className="text-3xl">🔊</span>
          <span>{current?.prompt}</span>
        </button>
        {feedback === 'correct' && (
          <p className="text-green-600 font-bold mt-2 text-lg animate-bounce">✅ כן! {current?.hebrew}!</p>
        )}
        {feedback === 'wrong' && (
          <p className="text-red-500 font-bold mt-2">❌ לא נכון, נסה שוב!</p>
        )}
      </div>

      {/* Choices grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {choices.map(item => (
          <button
            key={item.name}
            onClick={() => selectAnswer(item)}
            disabled={feedback === 'correct'}
            className={`bg-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-2 border-2 transition-all active:scale-95 ${
              feedback === 'correct' && item.name === current?.name
                ? 'border-green-500 bg-green-50 scale-105'
                : feedback === 'wrong' && item.name === current?.name
                ? 'border-purple-300'
                : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
            }`}
          >
            <span className="text-5xl">{item.emoji}</span>
            <span className="text-base font-bold text-purple-800">{item.hebrew}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
