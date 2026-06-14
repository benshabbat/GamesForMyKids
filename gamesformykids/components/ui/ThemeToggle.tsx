'use client';
import { useState, useEffect } from 'react';

const THEME_KEY = 'gfk_theme';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem(THEME_KEY, next ? 'dark' : 'light'); } catch {}
  };

  if (!mounted) return <div className="w-8 h-8" aria-hidden />;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'עבור למצב בהיר' : 'עבור למצב כהה'}
      title={isDark ? 'עבור למצב בהיר' : 'עבור למצב כהה'}
      className="p-2 rounded-lg bg-white/20 hover:bg-white/40 dark:bg-white/10 dark:hover:bg-white/20 transition-colors text-lg leading-none"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
