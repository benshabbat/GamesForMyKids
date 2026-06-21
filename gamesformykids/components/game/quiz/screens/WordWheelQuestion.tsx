'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import type { WordWheelQuestion as WheelQ } from '@/lib/quiz/data/word-wheel';

type SpinPhase = 'ready' | 'spinning' | 'answering';

const WHEEL_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
] as const;

interface Props {
  current: WheelQ;
  choices: string[];
  onSelect: (choice: string) => void;
}

export default function WordWheelQuestion({ current, choices, onSelect }: Props) {
  const [spinPhase, setSpinPhase] = useState<SpinPhase>('ready');
  const [rotation, setRotation] = useState(0);
  const rotRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setSpinPhase('ready');
  }, [current.id]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const spin = useCallback(() => {
    if (spinPhase !== 'ready') return;
    setSpinPhase('spinning');

    const startRot = rotRef.current;
    const totalSpins = (4 + Math.floor(Math.random() * 3)) * 360 + Math.random() * 360;
    const finalRot = startRot + totalSpins;
    const duration = 2500;
    const startTime = performance.now();

    function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

    function animate(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const cur = startRot + (finalRot - startRot) * easeOut(t);
      rotRef.current = cur;
      setRotation(cur);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rotRef.current = finalRot;
        setRotation(finalRot);
        setSpinPhase('answering');
        speakHebrew(current.prompt);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [spinPhase, current.prompt]);

  const emojiMap: Record<string, string> = {
    [current.answer]: current.answerEmoji,
    [current.wrongOptions[0]]: current.wrongEmojis[0],
    [current.wrongOptions[1]]: current.wrongEmojis[1],
    [current.wrongOptions[2]]: current.wrongEmojis[2],
  };

  const conicGradient = WHEEL_COLORS.map((c, i) => `${c} ${i * 45}deg ${(i + 1) * 45}deg`).join(', ');

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #6c3fe8 0%, #b83ef0 100%)' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress theme="violet" />

        {/* Spinning wheel */}
        <div className="relative w-44 h-44 mx-auto mt-4 mb-5">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-10 text-2xl select-none leading-none">
            ▼
          </div>
          {/* Disc */}
          <div
            className="w-full h-full rounded-full border-4 border-purple-900 shadow-lg"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(${conicGradient})`,
            }}
          />
          {/* Center cap */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-purple-700 flex items-center justify-center shadow-inner">
              {spinPhase === 'answering' ? (
                <span className="text-3xl font-black text-purple-800 leading-none">{current.letter}</span>
              ) : (
                <span className="text-2xl">🎡</span>
              )}
            </div>
          </div>
        </div>

        {spinPhase === 'ready' && (
          <div className="text-center">
            <p className="text-base font-bold text-purple-700 mb-4">לחץ לסובב את הגלגל!</p>
            <button
              onClick={spin}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-xl px-10 py-3 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              🌀 סובב!
            </button>
          </div>
        )}

        {spinPhase === 'spinning' && (
          <p className="text-center text-lg font-bold text-purple-600 animate-pulse mt-2">
            מסתובב...
          </p>
        )}

        {spinPhase === 'answering' && (
          <>
            <div className="text-center mb-4 bg-purple-50 rounded-2xl px-3 py-2">
              <span className="text-2xl">{current.categoryEmoji}</span>
              <p className="text-base font-black text-purple-800 mt-1 leading-snug">{current.prompt}</p>
            </div>
            <QuizAnswerGrid
              choices={choices}
              correctValue={current.answer}
              onSelect={onSelect}
              theme="violet"
              cols={2}
              renderChoice={(choice) => (
                <div className="flex flex-col items-center gap-1 py-1">
                  <span className="text-4xl leading-none">{emojiMap[choice] ?? '❓'}</span>
                  <span className="text-sm font-bold mt-1">{choice}</span>
                </div>
              )}
            />
            <QuizFeedback
              correctLabel={current.answer}
              theme="violet"
              correctMsg={`✅ ${current.answer} ${current.answerEmoji} — מתחיל ב-${current.letter}!`}
              wrongMsg={`💜 הנכון: ${current.answer} ${current.answerEmoji}`}
            />
          </>
        )}
      </div>
    </div>
  );
}
