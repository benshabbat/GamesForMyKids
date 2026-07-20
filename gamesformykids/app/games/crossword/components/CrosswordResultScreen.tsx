'use client';

interface Props {
  score: number;
  onNextPuzzle: () => void;
  onRestart: () => void;
}

export default function CrosswordResultScreen({ score, onNextPuzzle, onRestart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="text-center">
        <div className="text-7xl mb-6">🏆</div>
        <h1 className="text-4xl font-bold text-green-800 mb-4">כל הכבוד!</h1>
        <p className="text-2xl text-green-700 mb-2">פתרת את התשבץ!</p>
        <p className="text-xl text-green-600 mb-8">השלמת {score} מילים</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onNextPuzzle}
            className="px-8 py-4 bg-green-500 text-white text-xl font-bold rounded-2xl hover:bg-green-600 active:scale-95 transition-all shadow-lg"
          >
            תשבץ הבא ➡️
          </button>
          <button
            onClick={onRestart}
            className="px-8 py-4 bg-white text-green-700 text-xl font-bold rounded-2xl border-2 border-green-400 hover:bg-green-50 active:scale-95 transition-all shadow-lg"
          >
            תפריט
          </button>
        </div>
      </div>
    </div>
  );
}
