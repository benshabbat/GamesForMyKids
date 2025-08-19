
interface CharityGameHeaderProps {
  score: number;
  gameTime: number;
  collectedCoins: number;
  isMobile: boolean;
}

export default function CharityGameHeader({ 
  score, 
  gameTime, 
  collectedCoins, 
  isMobile 
}: CharityGameHeaderProps) {
  return (
    <>
      {/* כותרת מעוצבת */}
      <div className="text-center mb-6">
        <h1 className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 mb-2 drop-shadow-lg ${
          isMobile ? 'text-3xl' : 'text-5xl'
        }`}>
          🪙 משחק קופת הצדקה 🪙
        </h1>
        <p className={`text-purple-700 font-semibold ${isMobile ? 'text-lg' : 'text-xl'}`}>
          עזרו לתרום ולעשות מעשים טובים!
        </p>
      </div>

      {/* הסבר על המשחק */}
      <div className="mt-6 mb-3 text-center">
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl mx-auto shadow-xl border-2 border-purple-200 ${
          isMobile ? 'p-4 max-w-sm' : 'p-6 max-w-2xl'
        }`}>
          <div className={isMobile ? 'text-xl mb-2' : 'text-2xl mb-3'}>💝</div>
          <h3 className={`font-bold text-purple-800 mb-3 ${isMobile ? 'text-lg' : 'text-xl'}`}>
            למה חשובה צדקה?
          </h3>
          <p className={`text-gray-700 leading-relaxed ${isMobile ? 'text-xs' : 'text-sm'}`}>
            צדקה היא מצווה חשובה שמלמדת אותנו לעזור לאחרים ולחלוק מהטוב שלנו.
            במשחק הזה אתם עוזרים לאסוף מטבעות לקופת הצדקה ולומדים על חשיבות הנתינה והעזרה לזולת.
          </p>
          <div className={`flex justify-center gap-4 mt-4 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
            <span>🤝</span>
            <span>❤️</span>
            <span>🌟</span>
          </div>
        </div>
      </div>

      {/* לוח תוצאות מעוצב */}
      <div className="flex justify-center mb-6">
        <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-yellow-300 ${
          isMobile ? 'p-4' : 'p-6'
        }`}>
          <div className={`flex items-center justify-center ${isMobile ? 'gap-4' : 'gap-8'}`}>
            <div className="text-center">
              <div className={`font-bold text-blue-600 mb-1 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                {score}
              </div>
              <div className={`font-semibold text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                💰 ניקוד
              </div>
            </div>
            <div className={`bg-gray-300 ${isMobile ? 'w-px h-8' : 'w-px h-12'}`}></div>
            <div className="text-center">
              <div className={`font-bold text-red-500 mb-1 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                {gameTime}
              </div>
              <div className={`font-semibold text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                ⏰ זמן
              </div>
            </div>
            <div className={`bg-gray-300 ${isMobile ? 'w-px h-8' : 'w-px h-12'}`}></div>
            <div className="text-center">
              <div className={`font-bold text-green-600 mb-1 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                {collectedCoins}
              </div>
              <div className={`font-semibold text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                🪙 מטבעות
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
