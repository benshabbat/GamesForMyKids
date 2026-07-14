'use client';

interface Props {
  onStart: () => void;
}

export default function StoryAgentMenu({ onStart }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-8 max-w-md mx-auto"
      style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fdf4ff 100%)' }}
      dir="rtl"
    >
      <div className="text-center">
        <div className="text-6xl mb-3">🪄</div>
        <h1 className="text-3xl font-bold text-indigo-800">סיפור קסום</h1>
        <p className="text-gray-500 mt-1">כל סיפור שונה — אתה מחליט מה קורה הלאה!</p>
      </div>
      <button
        onClick={onStart}
        className="w-full bg-gradient-to-l from-indigo-500 to-purple-500 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
      >
        ✨ התחל הרפתקה חדשה
      </button>
    </div>
  );
}
