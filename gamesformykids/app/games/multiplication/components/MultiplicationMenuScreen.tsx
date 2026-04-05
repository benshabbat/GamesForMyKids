'use client';

interface Props {
  levels: number[];
  questionsPerLevel: number;
  timePerQuestion: number;
  onStart: (level: number) => void;
}

export default function MultiplicationMenuScreen({ levels, questionsPerLevel, timePerQuestion, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">✖️</div>
          <h1 className="text-3xl font-bold text-purple-800 mb-2">לוח הכפל</h1>
          <p className="text-purple-600">בחר לוח כפל ותתחיל!</p>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {levels.map(lv => (
            <button key={lv} onClick={() => onStart(lv)}
              className="aspect-square rounded-2xl text-2xl font-black text-white shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500">
              {lv}
            </button>
          ))}
        </div>
        <p className="text-center text-purple-500 text-sm mt-6">
          {questionsPerLevel} שאלות ל-{timePerQuestion} שניות כל אחת
        </p>
      </div>
    </div>
  );
}
