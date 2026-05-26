'use client';

interface CompleteViewProps {
  score: number;
  maxScore: number;
  onRestart: () => void;
}

export default function CompleteView({ score, maxScore, onRestart }: CompleteViewProps) {
  const percent = Math.round((score / maxScore) * 100);

  const getMessage = () => {
    if (percent >= 90) return { emoji: '👑', title: 'מדהים! אתה אלוף!', sub: 'ידיעת הצדיקים שלך מצוינת!' };
    if (percent >= 70) return { emoji: '🌟', title: 'כל הכבוד!', sub: 'למדת הרבה על הצדיקים!' };
    if (percent >= 50) return { emoji: '😊', title: 'עבודה טובה!', sub: 'כדאי לקרוא שוב את הסיפורים.' };
    return { emoji: '📖', title: 'המשך ללמוד!', sub: 'נסה שוב וקרא היטב את הסיפורים.' };
  };

  const { emoji, title, sub } = getMessage();
  const stars = Math.ceil((score / maxScore) * 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-lg mx-auto w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">

          {/* אנימציה */}
          <div className="text-8xl mb-4 animate-bounce">{emoji}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-500 mb-6">{sub}</p>

          {/* כוכבים */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-4xl transition-all ${i < stars ? 'opacity-100 scale-110' : 'opacity-20'}`}>
                ⭐
              </span>
            ))}
          </div>

          {/* ניקוד */}
          <div className="bg-amber-50 rounded-2xl p-5 mb-6">
            <p className="text-4xl font-bold text-amber-700 mb-1">{score} / {maxScore}</p>
            <p className="text-amber-600">נקודות</p>
            <div className="mt-3 h-3 bg-amber-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-1000"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="text-amber-500 text-sm mt-1">{percent}% תשובות נכונות</p>
          </div>

          {/* סיפורים שלמדנו */}
          <div className="text-right bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="font-bold text-gray-700 mb-3">📜 הצדיקים שלמדת:</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>✨ הבעל שם טוב – שמחה ואהבה בעבודת ה׳</p>
              <p>📖 רבי עקיבא – לעולם לא מאוחר ללמוד</p>
              <p>🕊️ החפץ חיים – לשמור על הלשון</p>
              <p>🔥 רשב&quot;י – כוח לימוד התורה</p>
              <p>🕯️ רבי מאיר בעל הנס – אמונה חזקה</p>
              <p>🌿 רבי מנחם מנדל – אהבת ארץ ישראל</p>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="w-full py-4 rounded-2xl text-white font-bold text-xl shadow-lg
              bg-gradient-to-l from-amber-500 to-orange-500
              hover:opacity-90 active:scale-95 transition-all"
          >
            🔄 שחק שוב
          </button>
        </div>
      </div>
    </div>
  );
}
