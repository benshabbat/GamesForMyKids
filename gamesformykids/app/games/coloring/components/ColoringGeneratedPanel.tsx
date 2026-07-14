'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/shared/auth/useAuth';
import { useColoringStore } from '../store/coloringStore';
import { fetchGeneratedColoringPages, type GeneratedColoringPage } from '@/lib/supabase/generatedColoringPages';
import type { GenerateColoringPageResponse } from '@/app/api/coloring/generate/route';

export function ColoringGeneratedPanel() {
  const { user, loading: authLoading } = useAuth();
  const setCustomImage = useColoringStore((s) => s.setCustomImage);
  const customImage = useColoringStore((s) => s.customImage);

  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<GeneratedColoringPage[]>([]);

  useEffect(() => {
    if (!user) return;
    fetchGeneratedColoringPages(user.id).then(setPages).catch(() => {});
  }, [user]);

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-4 border-2 border-purple-100 text-center">
        <p className="text-purple-700 font-bold mb-2">✨ רוצים ליצור דף צביעה משלכם עם בינה מלאכותית?</p>
        <Link
          href="/login"
          className="inline-block bg-purple-500 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-600 transition-colors"
        >
          התחברו כדי ליצור
        </Link>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/coloring/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data: GenerateColoringPageResponse = await res.json();
      if (!data.success || !data.page) {
        setError(data.error ?? 'משהו השתבש, נסו שוב');
        return;
      }
      setCustomImage(data.page);
      setPages((prev) => [
        { id: data.page!.id, user_id: user.id, prompt, image_url: data.page!.src, width: data.page!.width, height: data.page!.height, created_at: new Date().toISOString() },
        ...prev,
      ]);
      setPrompt('');
    } catch {
      setError('בעיה בחיבור לשרת, נסו שוב');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-4 border-2 border-purple-100">
      <p className="text-purple-700 font-bold mb-2 text-center">✨ צרו דף צביעה משלכם</p>
      <div className="flex gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="מה תרצו לצייר? למשל: דינוזאור אוכל פיצה"
          rows={2}
          maxLength={200}
          className="flex-1 border-2 border-purple-200 rounded-xl p-2 text-sm resize-none focus:outline-none focus:border-purple-400"
        />
        <button
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 rounded-xl font-bold transition-colors disabled:opacity-40 shrink-0"
        >
          {generating ? '⏳' : '🎨 צור'}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}

      {pages.length > 0 && (
        <div className="flex gap-2 overflow-x-auto mt-3 pb-1">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setCustomImage({ id: page.id, src: page.image_url, width: page.width, height: page.height })}
              className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                customImage?.id === page.id ? 'border-purple-500 scale-105' : 'border-gray-200 hover:border-purple-300'
              }`}
              title={page.prompt}
            >
              <Image src={page.image_url} alt={page.prompt} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
