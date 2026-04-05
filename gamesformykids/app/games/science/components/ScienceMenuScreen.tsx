'use client';

interface Props {
  topics: readonly string[];
  topicEmojis: Record<string, string>;
  onStart: (topic: string) => void;
}

export default function ScienceMenuScreen({ topics, topicEmojis, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🔬</div>
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">מדע לילדים</h1>
          <p className="text-indigo-600">גלה סודות המדע!</p>
        </div>
        <button
          onClick={() => onStart('all')}
          className="w-full mb-5 p-5 rounded-2xl text-white font-bold text-xl shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-l from-cyan-500 to-indigo-600"
        >
          🌟 כל הנושאים
        </button>
        <div className="grid grid-cols-2 gap-3">
          {topics.map(t => (
            <button key={t} onClick={() => onStart(t)}
              className="p-4 rounded-2xl font-bold text-right shadow-md hover:scale-105 active:scale-95 transition-all bg-white border-2 border-indigo-200 hover:border-indigo-400 text-indigo-800">
              <div className="text-3xl mb-1">{topicEmojis[t]}</div>
              <div>{t}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
