'use client';
import { useState, useEffect } from 'react';

const ONBOARDED_KEY = 'gfk_onboarded';

const STEPS = [
  {
    emoji: '👋',
    title: 'ברוכים הבאים!',
    body: 'כאן תמצאו עשרות משחקים חינוכיים בעברית לילדים. בחרו קטגוריה ולחצו על משחק כדי להתחיל!',
  },
  {
    emoji: '🎮',
    title: 'איך משחקים?',
    body: 'האפליקציה תאמר מילה בקול. הקשיבו טוב ולחצו על הכרטיס הנכון מבין האפשרויות.',
  },
  {
    emoji: '🏆',
    title: 'קבלו ניקוד!',
    body: 'על כל תשובה נכונה תקבלו נקודות. נסו לשבור את השיא שלכם! שחקו כמה שתרצו — הכל בחינם.',
  },
];

export default function OnboardingModal() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(ONBOARDED_KEY)) setVisible(true);
    } catch {}
  }, []);

  const close = () => {
    try { localStorage.setItem(ONBOARDED_KEY, '1'); } catch {}
    setVisible(false);
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else close();
  };

  if (!visible) return null;

  const current = STEPS[step]!;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-label="ברוכים הבאים"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-4">{current.emoji}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{current.title}</h2>
        <p className="text-gray-600 leading-relaxed mb-6">{current.body}</p>

        {/* Step dots */}
        <div className="flex justify-center gap-2 mb-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === step ? 'bg-purple-600' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 font-semibold hover:bg-gray-50 transition-colors"
            >
              ← אחורה
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 py-3 rounded-2xl bg-purple-600 text-white font-bold hover:bg-purple-700 active:scale-95 transition-[transform,background-color]"
          >
            {step < STEPS.length - 1 ? 'הבא ←' : '✓ בואו נשחק!'}
          </button>
        </div>

        <button
          onClick={close}
          className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          דלג
        </button>
      </div>
    </div>
  );
}
