'use client';
import { useState, useEffect } from 'react';
import { SectionContainer } from './SectionContainer';

const CB_KEY = 'gfk_colorblind';
const RM_KEY = 'gfk_reduced_motion';

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

export function ColorblindSection() {
  const [colorblind, setColorblind] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    try {
      const cb = localStorage.getItem(CB_KEY) === 'true';
      setColorblind(cb);
      document.documentElement.dataset.colorblind = cb ? 'true' : '';

      const osReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const rm = localStorage.getItem(RM_KEY) === 'true' || osReducedMotion;
      setReducedMotion(rm);
      document.documentElement.dataset.reducedMotion = rm ? 'true' : '';
    } catch {}
  }, []);

  const toggleColorblind = () => {
    const next = !colorblind;
    setColorblind(next);
    try {
      if (next) { localStorage.setItem(CB_KEY, 'true'); document.documentElement.dataset.colorblind = 'true'; }
      else { localStorage.removeItem(CB_KEY); document.documentElement.dataset.colorblind = ''; }
    } catch {}
  };

  const toggleReducedMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    try {
      if (next) { localStorage.setItem(RM_KEY, 'true'); document.documentElement.dataset.reducedMotion = 'true'; }
      else { localStorage.removeItem(RM_KEY); document.documentElement.dataset.reducedMotion = ''; }
    } catch {}
  };

  return (
    <SectionContainer title="נגישות" emoji="♿">
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
          <div>
            <p className="font-medium text-gray-800">מצב עיוורי צבעים 🎨</p>
            <p className="text-sm text-gray-500">מחליף ירוק/אדום לכחול/כתום (מותאם לדאוטרנופיה ופרוטנופיה)</p>
          </div>
          <Toggle enabled={colorblind} onToggle={toggleColorblind} label="הפעל מצב עיוורי צבעים" />
        </div>
        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
          <div>
            <p className="font-medium text-gray-800">הפחת תנועה 🧘</p>
            <p className="text-sm text-gray-500">מבטל אנימציות ומעברים (מומלץ לרגישות חושית ו-ADHD)</p>
          </div>
          <Toggle enabled={reducedMotion} onToggle={toggleReducedMotion} label="הפחת תנועה" />
        </div>
      </div>
    </SectionContainer>
  );
}
