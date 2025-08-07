export default function EntertainmentGamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="entertainment-games min-h-screen bg-gradient-to-br from-pink-50 to-orange-100">
      {/* כותרת בידורית */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-6 mb-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-4xl">🎪</span>
            <h2 className="text-3xl font-bold">משחקי בידור</h2>
            <span className="text-4xl">🎈</span>
          </div>
          <p className="text-center text-lg text-pink-100">
            משחקים מהנים ומרגשים לשעות של בידור איכותי
          </p>
        </div>
      </div>

      {/* תוכן המשחקים */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-pink-50 rounded-xl">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-bold text-pink-800">יצירתיות</h3>
              <p className="text-sm text-pink-600">הביעו את עצמכם בצורה יצירתית</p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl mb-2">🎵</div>
              <h3 className="font-bold text-orange-800">מוזיקה וקול</h3>
              <p className="text-sm text-orange-600">משחקים עם צלילים מהנים</p>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-3xl mb-2">🌈</div>
              <h3 className="font-bold text-yellow-800">צבעים וצורות</h3>
              <p className="text-sm text-yellow-600">עולם מלא בצבעים יפים</p>
            </div>
          </div>
        </div>

        {/* תוכן המשחק */}
        {children}
      </div>

      {/* פוטר בידורי */}
      <footer className="mt-12 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-orange-100">
            🎉 הכי חשוב - להנות ולחייך!
          </p>
        </div>
      </footer>
    </div>
  );
}
