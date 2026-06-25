'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { speakHebrew } from '@/lib/utils/speech/speaker';

export type Zone = 'head' | 'neck' | 'torso' | 'hands' | 'legs' | 'feet';
export type Category = 'daily' | 'seasonal' | 'professions';
export type Phase = 'menu' | 'playing' | 'result';

export interface ClothingItem {
  name: string;
  hebrew: string;
  prompt: string;
  emoji: string;
  zone: Zone;
  category: Category;
}

export const CLOTHING: ClothingItem[] = [
  { name: 'hat',        hebrew: 'כּוֹבַע',          prompt: 'שים כובע!',          emoji: '🧢', zone: 'head',   category: 'daily' },
  { name: 'shirt',      hebrew: 'חוּלְצָה',          prompt: 'שים חולצה!',         emoji: '👕', zone: 'torso',  category: 'daily' },
  { name: 'dress',      hebrew: 'שִׂמְלָה',          prompt: 'שים שמלה!',          emoji: '👗', zone: 'torso',  category: 'daily' },
  { name: 'pants',      hebrew: 'מִכְנָסַיִם',        prompt: 'שים מכנסיים!',       emoji: '👖', zone: 'legs',   category: 'daily' },
  { name: 'shoes',      hebrew: 'נַעֲלַיִם',          prompt: 'שים נעליים!',        emoji: '👟', zone: 'feet',   category: 'daily' },
  { name: 'socks',      hebrew: 'גַּרְבַּיִם',        prompt: 'שים גרביים!',        emoji: '🧦', zone: 'feet',   category: 'daily' },
  { name: 'coat',       hebrew: 'מְעִיל',            prompt: 'שים מעיל!',          emoji: '🧥', zone: 'torso',  category: 'seasonal' },
  { name: 'scarf',      hebrew: 'צָעִיף',            prompt: 'שים צעיף!',          emoji: '🧣', zone: 'neck',   category: 'seasonal' },
  { name: 'gloves',     hebrew: 'כְּפָפוֹת',          prompt: 'שים כפפות!',         emoji: '🧤', zone: 'hands',  category: 'seasonal' },
  { name: 'boots',      hebrew: 'מַגָּפַיִם',          prompt: 'שים מגפיים!',        emoji: '👢', zone: 'feet',   category: 'seasonal' },
  { name: 'sunglasses', hebrew: 'מִשְׁקְפֵי שֶׁמֶשׁ', prompt: 'שים משקפי שמש!',    emoji: '🕶️', zone: 'head',   category: 'seasonal' },
  { name: 'umbrella',   hebrew: 'מִטְרִיָּה',          prompt: 'שים מטרייה!',        emoji: '☂️', zone: 'hands',  category: 'seasonal' },
  { name: 'hard-hat',   hebrew: 'קַסְדָּה',           prompt: 'שים קסדה!',          emoji: '⛑️', zone: 'head',   category: 'professions' },
  { name: 'graduation', hebrew: 'כּוֹבַע סִיּוּם',    prompt: 'שים כובע סיום!',     emoji: '🎓', zone: 'head',   category: 'professions' },
  { name: 'lab-coat',   hebrew: 'חֲלוּק לָבָן',       prompt: 'שים חלוק לבן!',      emoji: '🥼', zone: 'torso',  category: 'professions' },
  { name: 'backpack',   hebrew: 'תִּיק גַּב',          prompt: 'שים תיק גב!',        emoji: '🎒', zone: 'hands',  category: 'professions' },
  { name: 'stethoscope',hebrew: 'סְטֶתוֹסְקוֹפ',      prompt: 'שים סטטוסקופ!',      emoji: '🩺', zone: 'neck',   category: 'professions' },
];

export const ZONE_ORDER: Zone[] = ['head', 'neck', 'torso', 'hands', 'legs', 'feet'];
export const ZONE_PLACEHOLDER: Record<Zone, string> = {
  head: '❓', neck: '❓', torso: '❓', hands: '❓', legs: '❓', feet: '❓',
};
export const ZONE_LABEL: Record<Zone, string> = {
  head: 'ראש', neck: 'צוואר', torso: 'גוף', hands: 'ידיים', legs: 'רגליים', feet: 'נעליים',
};
export const CATEGORY_LABELS: Record<Category, string> = {
  daily: '👕 לבוש יומיומי',
  seasonal: '🌦️ לבוש עונתי',
  professions: '🎓 לבוש מקצועי',
};

export const QUESTIONS_PER_GAME = 8;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function buildChoices(correct: ClothingItem, pool: ClothingItem[]): ClothingItem[] {
  const others = shuffle(pool.filter(c => c.name !== correct.name)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export function useDressUpGame() {
  const [phase, setPhase]         = useState<Phase>('menu');
  const [questions, setQuestions] = useState<ClothingItem[]>([]);
  const [qIdx, setQIdx]           = useState(0);
  const [choices, setChoices]     = useState<ClothingItem[]>([]);
  const [dressed, setDressed]     = useState<Partial<Record<Zone, ClothingItem>>>({});
  const [score, setScore]         = useState(0);
  const [feedback, setFeedback]   = useState<'correct' | 'wrong' | null>(null);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs for stale-closure–free selectAnswer
  const feedbackRef   = useRef<'correct' | 'wrong' | null>(null);
  const questionsRef  = useRef<ClothingItem[]>([]);
  const qIdxRef       = useRef(0);

  feedbackRef.current  = feedback;
  questionsRef.current = questions;
  qIdxRef.current      = qIdx;

  const startGame = useCallback(() => {
    const qs = shuffle(CLOTHING).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    questionsRef.current = qs;
    setQIdx(0);
    qIdxRef.current = 0;
    setScore(0);
    setDressed({});
    setFeedback(null);
    feedbackRef.current = null;
    const first = qs[0]!;
    setChoices(buildChoices(first, CLOTHING));
    setPhase('playing');
    setTimeout(() => speakHebrew(first.prompt), 400);
  }, []);

  const selectAnswer = useCallback((item: ClothingItem) => {
    const current = questionsRef.current[qIdxRef.current];
    if (feedbackRef.current || !current) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    if (item.name === current.name) {
      setFeedback('correct');
      feedbackRef.current = 'correct';
      setScore(s => s + 1);
      setDressed(d => ({ ...d, [current.zone]: current }));
      speakHebrew(`כן! ${current.hebrew}!`);
      timerRef.current = setTimeout(() => {
        const next = qIdxRef.current + 1;
        if (next >= questionsRef.current.length) {
          setPhase('result');
        } else {
          const nextQ = questionsRef.current[next]!;
          setQIdx(next);
          qIdxRef.current = next;
          setChoices(buildChoices(nextQ, CLOTHING));
          setFeedback(null);
          feedbackRef.current = null;
          setTimeout(() => speakHebrew(nextQ.prompt), 300);
        }
      }, 1300);
    } else {
      setFeedback('wrong');
      feedbackRef.current = 'wrong';
      speakHebrew('לא נכון, נסה שוב!');
      timerRef.current = setTimeout(() => {
        setFeedback(null);
        feedbackRef.current = null;
      }, 900);
    }
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return {
    phase, questions, qIdx, choices, dressed, score, feedback,
    startGame, selectAnswer,
    current: questions[qIdx],
    ZONE_ORDER, ZONE_PLACEHOLDER, ZONE_LABEL, CATEGORY_LABELS, QUESTIONS_PER_GAME,
  };
}
