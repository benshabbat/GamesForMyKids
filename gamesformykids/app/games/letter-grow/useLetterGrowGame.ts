'use client';
import { useState, useRef, useCallback } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { useCanvasResize } from '@/hooks/canvas/useCanvasResize';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import { shuffle as shuffled } from '@/lib/utils/game/cardUtils';
import {
  LETTER_WORDS,
  ROUNDS_PER_GAME,
  CATCHES_TO_EVOLVE,
  MAX_LIVES,
  BUCKET_W,
  BUCKET_H,
  LETTER_RADIUS,
  SPAWN_INTERVAL,
  FALL_SPEED_MIN,
  FALL_SPEED_MAX,
  type FallingLetter,
  type LetterWord,
} from './letterGrowConstants';
import { drawLetterGrowScene } from './letterGrowDraw';

export { ROUNDS_PER_GAME, CATCHES_TO_EVOLVE, MAX_LIVES } from './letterGrowConstants';
export type { LetterWord } from './letterGrowConstants';

let _nextId = 0;

export function useLetterGrowGame() {
  const [phase, setPhase] = useState<'menu' | 'playing' | 'evolving' | 'result'>('menu');
  const [lives, setLives] = useState(MAX_LIVES);
  const [catchCount, setCatchCount] = useState(0);
  const [score, setScore] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [evolveInfo, setEvolveInfo] = useState<LetterWord | null>(null);
  const [hurtFlash, setHurtFlash] = useState(false);

  const phaseRef = useRef<'menu' | 'playing' | 'evolving' | 'result'>('menu');
  const livesRef = useRef(MAX_LIVES);
  const catchCountRef = useRef(0);
  const scoreRef = useRef(0);
  const roundIdxRef = useRef(0);
  const roundLettersRef = useRef<LetterWord[]>([]);
  const fallingRef = useRef<FallingLetter[]>([]);
  const bucketXRef = useRef(0.5);
  const spawnTimerRef = useRef(0);

  const currentTarget = () => roundLettersRef.current[roundIdxRef.current];

  const spawnLetter = useCallback((W: number) => {
    const target = currentTarget();
    if (!target) return;
    const isTarget = Math.random() < 0.55;
    let letter: string;
    if (isTarget) {
      letter = target.letter;
    } else {
      const others = LETTER_WORDS.filter(lw => lw.letter !== target.letter);
      letter = (others[Math.floor(Math.random() * others.length)] ?? LETTER_WORDS[0]!).letter;
    }
    fallingRef.current.push({
      id: _nextId++,
      x: LETTER_RADIUS + Math.random() * (W - LETTER_RADIUS * 2),
      y: -LETTER_RADIUS,
      vy: FALL_SPEED_MIN + Math.random() * (FALL_SPEED_MAX - FALL_SPEED_MIN),
      letter,
      isTarget,
    });
  }, []);

  const advanceRound = useCallback(() => {
    const next = roundIdxRef.current + 1;
    scoreRef.current = next;
    setScore(next);
    if (next >= ROUNDS_PER_GAME) {
      phaseRef.current = 'result';
      setPhase('result');
    } else {
      roundIdxRef.current = next;
      setRoundIdx(next);
      catchCountRef.current = 0;
      setCatchCount(0);
      fallingRef.current = [];
      spawnTimerRef.current = 0;
      phaseRef.current = 'playing';
      setPhase('playing');
      const nextTarget = roundLettersRef.current[next];
      if (nextTarget) speakHebrew(nextTarget.letter);
    }
  }, []);

  const triggerEvolution = useCallback(() => {
    const target = currentTarget();
    if (!target) return;
    phaseRef.current = 'evolving';
    setPhase('evolving');
    setEvolveInfo(target);
    fallingRef.current = [];
    speakHebrew(target.word);
    setTimeout(() => advanceRound(), 2800);
  }, [advanceRound]);

  const startGame = useCallback(() => {
    const chosen = shuffled(LETTER_WORDS).slice(0, ROUNDS_PER_GAME);
    roundLettersRef.current = chosen;
    roundIdxRef.current = 0;
    livesRef.current = MAX_LIVES;
    catchCountRef.current = 0;
    scoreRef.current = 0;
    fallingRef.current = [];
    spawnTimerRef.current = 0;
    bucketXRef.current = 0.5;
    setLives(MAX_LIVES);
    setCatchCount(0);
    setScore(0);
    setRoundIdx(0);
    setEvolveInfo(null);
    phaseRef.current = 'playing';
    setPhase('playing');
    speakHebrew(chosen[0]?.letter ?? '');
  }, []);

  const canvasRef = useCanvasLoop(useCallback((ctx: CanvasRenderingContext2D, dt: number) => {
    if (phaseRef.current !== 'playing') return;

    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    spawnTimerRef.current -= dt;
    if (spawnTimerRef.current <= 0) {
      spawnLetter(W);
      spawnTimerRef.current = SPAWN_INTERVAL;
    }

    const bucketX = bucketXRef.current * W;
    const bucketY = H - BUCKET_H - 12;

    const survived: FallingLetter[] = [];
    let caught: FallingLetter | null = null;
    for (const fl of fallingRef.current) {
      fl.y += fl.vy * dt;
      if (fl.y - LETTER_RADIUS > H) continue;
      if (!caught && fl.y + LETTER_RADIUS >= bucketY && fl.y - LETTER_RADIUS <= bucketY + BUCKET_H) {
        const dx = Math.abs(fl.x - bucketX);
        if (dx < BUCKET_W / 2 + LETTER_RADIUS * 0.4) { caught = fl; continue; }
      }
      survived.push(fl);
    }
    fallingRef.current = survived;

    if (caught) {
      if (caught.isTarget) {
        catchCountRef.current += 1;
        setCatchCount(catchCountRef.current);
        if (catchCountRef.current >= CATCHES_TO_EVOLVE) { triggerEvolution(); return; }
      } else {
        livesRef.current -= 1;
        setLives(livesRef.current);
        setHurtFlash(true);
        setTimeout(() => setHurtFlash(false), 300);
        if (livesRef.current <= 0) { phaseRef.current = 'result'; setPhase('result'); return; }
      }
    }

    const target = roundLettersRef.current[roundIdxRef.current];
    drawLetterGrowScene(ctx, W, H, fallingRef.current, bucketX, bucketY, target);
  }, [spawnLetter, triggerEvolution]));

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    bucketXRef.current = Math.max(0.05, Math.min(0.95, (e.clientX - rect.left) / rect.width));
  }, []);

  useCanvasResize(canvasRef);

  const target = roundLettersRef.current[roundIdx];

  return {
    phase, lives, catchCount, score, roundIdx, evolveInfo, hurtFlash,
    target, canvasRef, startGame, handlePointerMove,
  };
}
