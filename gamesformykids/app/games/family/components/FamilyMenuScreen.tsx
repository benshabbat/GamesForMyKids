'use client';

const FAMILY_PREVIEW = [
  { emoji: '👴', label: 'סבא' },
  { emoji: '👵', label: 'סבתא' },
  { emoji: '👨', label: 'אבא' },
  { emoji: '👩', label: 'אמא' },
  { emoji: '👦', label: 'אח' },
  { emoji: '👧', label: 'אחות' },
  { emoji: '🧑', label: 'בן דוד' },
  { emoji: '👶', label: 'תינוק' },
];

interface Props {
  onStart: () => void;
}

export default function FamilyMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="text-8xl mb-4">👨‍👩‍👧‍👦</div>
      <h1 className="text-4xl font-bold text-rose-700 mb-2">המשפחה</h1>
      <p className="text-gray-600 mb-6 text-center">למד על קשרים משפחתיים!</p>
      <div className="grid grid-cols-4 gap-2 mb-8">
        {FAMILY_PREVIEW.map(f => (
          <div key={f.label} className="bg-white rounded-xl p-3 text-center shadow">
            <div className="text-3xl">{f.emoji}</div>
            <div className="text-xs text-gray-600 mt-1 font-bold">{f.label}</div>
          </div>
        ))}
      </div>
      <button onClick={onStart}
        className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xl font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
        👨‍👩‍👧 התחל משחק!
      </button>
    </div>
  );
}
