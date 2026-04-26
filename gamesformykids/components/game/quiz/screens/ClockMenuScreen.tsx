'use client';
import ClockFace from './ClockFace';

interface Props { onStart: () => void; }

export default function ClockMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 p-6 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full text-center">
        <div className="flex justify-center mb-4">
          <ClockFace hour={10} minute={10} size={160} />
        </div>
        <h1 className="text-3xl font-bold text-indigo-800 mb-3">הכרת השעון</h1>
        <p className="text-indigo-600 mb-8">ראה את השעון — בחר את השעה הנכונה!</p>
        <button onClick={onStart}
          className="w-full py-5 rounded-2xl text-white font-bold text-2xl bg-gradient-to-l from-violet-500 to-indigo-600 shadow-xl hover:opacity-90 active:scale-95 transition-all">
          🕐 התחל!
        </button>
      </div>
    </div>
  );
}
