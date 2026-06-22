'use client';
import { useState, useEffect } from 'react';
import { SectionContainer } from './SectionContainer';

const LS_KEY = 'gfk_colorblind';

export function ColorblindSection() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      const on = stored === 'true';
      setEnabled(on);
      document.documentElement.dataset.colorblind = on ? 'true' : '';
    } catch {}
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try {
      if (next) {
        localStorage.setItem(LS_KEY, 'true');
        document.documentElement.dataset.colorblind = 'true';
      } else {
        localStorage.removeItem(LS_KEY);
        document.documentElement.dataset.colorblind = '';
      }
    } catch {}
  };

  return (
    <SectionContainer title="נגישות" emoji="♿">
      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
        <div>
          <p className="font-medium text-gray-800">מצב עיוורי צבעים 🎨</p>
          <p className="text-sm text-gray-500">מחליף ירוק/אדום לכחול/כתום (מותאם לדאוטרנופיה ופרוטנופיה)</p>
        </div>
        <button
          onClick={toggle}
          role="switch"
          aria-checked={enabled}
          className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-500' : 'bg-gray-300'}`}
          aria-label="הפעל מצב עיוורי צבעים"
        >
          <span
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`}
          />
        </button>
      </div>
    </SectionContainer>
  );
}
