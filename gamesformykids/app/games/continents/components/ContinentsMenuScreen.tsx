'use client';

interface Continent {
  name: string;
  emoji: string;
  countries: number;
}

interface Props {
  continents: Continent[];
  onStart: () => void;
}

export default function ContinentsMenuScreen({ continents, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="text-8xl mb-4">🌍</div>
      <h1 className="text-4xl font-bold text-teal-700 mb-2">יבשות העולם</h1>
      <p className="text-gray-600 mb-6 text-center">גלה את 7 יבשות כדור הארץ!</p>
      <div className="grid grid-cols-2 gap-2 mb-8 w-full max-w-xs">
        {continents.map(c => (
          <div key={c.name} className="bg-white rounded-xl p-2 text-center shadow text-sm">
            <div className="text-2xl">{c.emoji}</div>
            <div className="font-bold text-gray-700 text-xs mt-1">{c.name}</div>
            <div className="text-gray-400 text-xs">{c.countries > 0 ? `${c.countries} מדינות` : 'ללא מדינות'}</div>
          </div>
        ))}
      </div>
      <button onClick={onStart}
        className="px-10 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
        🌐 התחל מסע!
      </button>
    </div>
  );
}
