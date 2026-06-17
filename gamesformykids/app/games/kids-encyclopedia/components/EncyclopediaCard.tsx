'use client';

import { useEffect } from 'react';
import { ENCYCLOPEDIA_ENTRIES, ENCYCLOPEDIA_CATEGORIES } from '@/lib/constants/encyclopediaData';
import { useEncyclopediaStore } from '../encyclopediaStore';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

export default function EncyclopediaCard() {
  const selectedEntryId = useEncyclopediaStore((s) => s.selectedEntryId);
  const selectedCategory = useEncyclopediaStore((s) => s.selectedCategory);
  const closeCard = useEncyclopediaStore((s) => s.closeCard);
  const toggleCollection = useEncyclopediaStore((s) => s.toggleCollection);
  const collection = useEncyclopediaStore((s) => s.collection);

  const entries = selectedCategory ? (ENCYCLOPEDIA_ENTRIES[selectedCategory] ?? []) : [];
  const entry = entries.find((e) => e.id === selectedEntryId) ?? null;
  const cat = ENCYCLOPEDIA_CATEGORIES.find((c) => c.id === selectedCategory);
  const inCollection = entry ? collection.has(entry.id) : false;

  useEffect(() => {
    if (!entry) return;
    const text = `${entry.name}. ${entry.facts.join('. ')}`;
    speakHebrew(text);
  }, [entry]);

  if (!entry) return null;

  const handleSpeak = () => {
    const text = `${entry.name}. ${entry.facts.join('. ')}`;
    speakHebrew(text);
  };

  const handlePrint = () => {
    const printContent = `
      <html dir="rtl"><head><title>${entry.name}</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
        h1 { font-size: 3em; }
        h2 { font-size: 1.8em; }
        ul { list-style: none; font-size: 1.2em; line-height: 2; }
      </style></head>
      <body>
        <p style="font-size:5em;margin:0">${entry.emoji}</p>
        <h1>${entry.name}</h1>
        <h2>${cat?.emoji ?? ''} ${cat?.name ?? ''}</h2>
        <ul>${entry.facts.map((f) => `<li>✅ ${f}</li>`).join('')}</ul>
        <p style="margin-top:40px;color:#888">📚 אנציקלופדיה לילדים</p>
      </body></html>
    `;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(printContent);
    win.document.close();
    win.print();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full">
        <button
          onClick={closeCard}
          className="mb-4 bg-white rounded-xl px-4 py-2 shadow text-blue-700 font-bold"
        >
          ← חזרה
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className={`bg-linear-to-br ${cat?.bgGradient ?? 'from-blue-400 to-blue-600'} p-8 text-center`}>
            <p className="text-8xl mb-2">{entry.emoji}</p>
            <h2 className="text-3xl font-bold text-white">{entry.name}</h2>
            <p className="text-white/80 text-sm">{cat?.emoji} {cat?.name}</p>
          </div>

          <div className="p-6">
            <ul className="space-y-3 mb-6">
              {entry.facts.map((fact, i) => (
                <li key={i} className="flex gap-3 text-gray-700 text-lg">
                  <span className="text-2xl shrink-0">{'🌟✨⭐'[i]}</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleSpeak}
                className="bg-blue-100 text-blue-700 rounded-xl p-3 text-center font-bold text-sm active:scale-95 transition-transform"
              >
                🔊 הקשב
              </button>
              <button
                onClick={() => entry && toggleCollection(entry.id)}
                className={`rounded-xl p-3 text-center font-bold text-sm active:scale-95 transition-transform ${
                  inCollection
                    ? 'bg-yellow-400 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {inCollection ? '⭐ שמור!' : '☆ שמור'}
              </button>
              <button
                onClick={handlePrint}
                className="bg-green-100 text-green-700 rounded-xl p-3 text-center font-bold text-sm active:scale-95 transition-transform"
              >
                🖨️ הדפס
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
