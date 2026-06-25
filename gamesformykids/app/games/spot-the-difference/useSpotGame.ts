'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { speakHebrew } from '@/lib/utils/speech/speaker';

interface Diff {
  index: number;
  altEmoji: string;
  hint: string;
}

export interface Scene {
  name: string;
  emoji: string;
  bg: string;
  cols: number;
  items: string[];
  diffs: Diff[];
}

export const SCENES: Scene[] = [
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

export const TIMER_START = 90;
export const DIFF_POINTS = 20;

export type Phase = 'menu' | 'playing' | 'result';

export function useSpotGame() {
  const [phase, setPhase]       = useState<Phase>('menu');
  const [sceneIdx, setSceneIdx] = useState(0);
  const [found, setFound]       = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(TIMER_START);
  const [score, setScore]       = useState(0);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [shakePanel, setShake]  = useState(false);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs to avoid stale closures
  const phaseRef    = useRef<Phase>('menu');
  const sceneIdxRef = useRef(0);
  const foundRef    = useRef<Set<number>>(new Set());
  const scoreRef    = useRef(0);

  phaseRef.current    = phase;
  sceneIdxRef.current = sceneIdx;
  foundRef.current    = found;
  scoreRef.current    = score;

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

  const handleTap = useCallback((index: number) => {
    if (phaseRef.current !== 'playing') return;
    const scene = SCENES[sceneIdxRef.current]!;
    const foundSet = foundRef.current;
    const diff = scene.diffs.find(d => d.index === index);

    if (diff && !foundSet.has(index)) {
      const newFound = new Set(foundSet);
      newFound.add(index);
      setFound(newFound);
      const newScore = scoreRef.current + DIFF_POINTS;
      setScore(newScore);
      speakHebrew(`כן! מצאת! ${diff.hint}`);

      if (newFound.size >= scene.diffs.length) {
        stopTimer();
        setTimeout(() => {
          setPhase('result');
          speakHebrew('מדהים! מצאת את כל ה-5 הבדלים!');
        }, 600);
      }
    } else {
      setWrongIdx(index);
      setShake(true);
      speakHebrew('לא הבדל כאן!');
      if (flashRef.current) clearTimeout(flashRef.current);
      flashRef.current = setTimeout(() => {
        setWrongIdx(null);
        setShake(false);
      }, 500);
    }
  }, [stopTimer]);

  useEffect(() => () => {
    stopTimer();
    if (flashRef.current) clearTimeout(flashRef.current);
  }, [stopTimer]);

  return {
    phase, sceneIdx, found, timeLeft, score, wrongIdx, shakePanel,
    setPhase, startGame, startScene, handleTap, stopTimer,
    scene: SCENES[sceneIdx]!,
    SCENES,
  };
}
