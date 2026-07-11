'use client';
import { useState, useEffect } from 'react';
import { SectionContainer } from './SectionContainer';

const DYSLEXIA_KEY = 'gfk_dyslexia_mode';

function Toggle({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-500' : 'bg-gray-300'}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`}
      />
    </button>
  );
}

export function DyslexiaSection() {
  const [dyslexiaMode, setDyslexiaMode] = useState(false);

  useEffect(() => {
    try {
      const dm = localStorage.getItem(DYSLEXIA_KEY) === 'true';
      setDyslexiaMode(dm);
      document.documentElement.dataset.dyslexiaMode = dm ? 'true' : '';
    } catch {}
  }, []);

  const toggleDyslexiaMode = () => {
    const next = !dyslexiaMode;
    setDyslexiaMode(next);
    try {
      if (next) { localStorage.setItem(DYSLEXIA_KEY, 'true'); document.documentElement.dataset.dyslexiaMode = 'true'; }
      else { localStorage.removeItem(DYSLEXIA_KEY); document.documentElement.dataset.dyslexiaMode = ''; }
    } catch {}
  };

  return (
    <SectionContainer title="קריאה נגישה" emoji="📖">
      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
        <div>
          <p className="font-medium text-gray-800">מצב קריאה לדיסלקציה 🔤</p>
          <p className="text-sm text-gray-500">מגדיל מרווח בין אותיות ושורות ומקל על קריאת טקסט במשחקים</p>
        </div>
        <Toggle enabled={dyslexiaMode} onToggle={toggleDyslexiaMode} label="הפעל מצב קריאה לדיסלקציה" />
      </div>
    </SectionContainer>
  );
}
