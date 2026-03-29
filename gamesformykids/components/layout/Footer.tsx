import { GamesRegistry } from "@/lib/registry/gamesRegistry";

function Footer() {
  // קבלת מספר המשחקים הזמינים אוטומטית
  const availableGamesCount = GamesRegistry.getAvailableGamesCount();
  const totalGamesCount = GamesRegistry.getTotalGamesCount();
  const gamesInDevelopment = totalGamesCount - availableGamesCount;
  
  return (
    <footer className="mt-8 md:mt-16 py-6 md:py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Stats section */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="text-center bg-white rounded-2xl p-3 md:p-6 shadow-lg">
            <div className="text-2xl md:text-4xl font-bold text-purple-600 mb-1 md:mb-2">{availableGamesCount}</div>
            <div className="text-xs md:text-lg font-semibold text-gray-700">משחקים</div>
            <div className="text-xs text-gray-500 hidden sm:block">מוכנים לשחק!</div>
          </div>
          
          <div className="text-center bg-white rounded-2xl p-3 md:p-6 shadow-lg">
            <div className="text-2xl md:text-4xl font-bold text-pink-600 mb-1 md:mb-2">2-5</div>
            <div className="text-xs md:text-lg font-semibold text-gray-700">גילאי מטרה</div>
            <div className="text-xs text-gray-500 hidden sm:block">שנים</div>
          </div>
          
          {gamesInDevelopment > 0 && (
            <div className="text-center bg-white rounded-2xl p-3 md:p-6 shadow-lg">
              <div className="text-2xl md:text-4xl font-bold text-orange-600 mb-1 md:mb-2">{gamesInDevelopment}</div>
              <div className="text-xs md:text-lg font-semibold text-gray-700">בפיתוח</div>
              <div className="text-xs text-gray-500 hidden sm:block">בקרוב!</div>
            </div>
          )}
        </div>
        
        {/* Main footer content */}
        <div className="text-center">
          <div className="text-3xl md:text-4xl mb-2 md:mb-4">💜</div>
          <p className="text-base md:text-xl font-semibold text-purple-700 mb-1 md:mb-2">נוצר במיוחד לילדים בגיל 2-5</p>
          <p className="text-sm text-gray-600 mb-3 md:mb-4 hidden sm:block">משחקים בטוחים, חינוכיים ומהנים לכל המשפחה</p>
          
          {/* Features list */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
            <span className="bg-purple-100 px-2 md:px-3 py-1 rounded-full">🔒 בטוח</span>
            <span className="bg-blue-100 px-2 md:px-3 py-1 rounded-full">📱 נייד</span>
            <span className="bg-green-100 px-2 md:px-3 py-1 rounded-full">🎯 חינוכי</span>
            <span className="bg-yellow-100 px-2 md:px-3 py-1 rounded-full">🎮 מהנה</span>
          </div>
          
          {/* Developer credit */}
          <div className="mt-6 pt-6 border-t border-gray-300">
            <p className="text-sm text-gray-600 mb-2">פותח באהבה על ידי</p>
            <a 
              href="https://www.linkedin.com/in/davidchen-benshabbat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-semibold text-purple-700 hover:text-purple-800 transition-colors underline decoration-2 underline-offset-4"
            >
              דוד-חן בן שבת
            </a>
            <div className="text-xs text-gray-500 mt-1">💼 LinkedIn Profile</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;