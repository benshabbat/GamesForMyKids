'use client';
import { useState, useEffect } from 'react';

const ONBOARDED_KEY = 'gfk_onboarded';

export function useOnboardingModal(totalSteps: number) {
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
    if (step < totalSteps - 1) setStep((s) => s + 1);
    else close();
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  return { step, visible, next, prev, close };
}
