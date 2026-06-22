'use client';
import { useState, useEffect, useCallback } from 'react';

export interface TutorialStep {
  emoji: string;
  title: string;
  body: string;
}

interface Props {
  steps: TutorialStep[];
  storageKey: string;
}

export function GameTutorial({ steps, storageKey }: Props) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      if (!localStorage.getItem(storageKey)) setVisible(true);
    } catch {}
  }, [storageKey]);

  const close = useCallback(() => {
    try { localStorage.setItem(storageKey, '1'); } catch {}
    setVisible(false);
  }, [storageKey]);

  const next = useCallback(() => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else close();
  }, [step, steps.length, close]);

  const prev = useCallback(() => setStep(s => Math.max(0, s - 1)), []);

  if (!visible) return null;

  const current = steps[step]!;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-label="הדרכה"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-4">{current.emoji}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{current.title}</h2>
        <p className="text-gray-600 leading-relaxed mb-6">{current.body}</p>

        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === step ? 'bg-indigo-600' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={prev}
              className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 font-semibold hover:bg-gray-50 transition-colors"
            >
              ← אחורה
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
          >
            {step < steps.length - 1 ? 'הבא ←' : '🎮 הבנתי!'}
          </button>
        </div>

        <button
          onClick={close}
          className="mt-3 text-sm text-gray-400 hover:text-gray-600 underline w-full"
        >
          דלג על ההדרכה
        </button>
      </div>
    </div>
  );
}
