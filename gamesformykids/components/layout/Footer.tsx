import { GamesRegistry } from "@/lib/registry/gamesRegistry";

function Footer() {
  // קבלת מספר המשחקים הזמינים אוטומטית
  const availableGamesCount = GamesRegistry.getAvailableGamesCount();
  const totalGamesCount = GamesRegistry.getTotalGamesCount();
  const gamesInDevelopment = totalGamesCount - availableGamesCount;
  
  return (
    <footer className="mt-16 py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">{availableGamesCount}</div>
            <div className="text-lg font-semibold text-gray-700">משחקים זמינים</div>
            <div className="text-sm text-gray-500">מוכנים לשחק!</div>
          </div>
          
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-4xl font-bold text-pink-600 mb-2">2-5</div>
            <div className="text-lg font-semibold text-gray-700">גילאי המטרה</div>
            <div className="text-sm text-gray-500">שנים</div>
          </div>
          
          {gamesInDevelopment > 0 && (
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-orange-600 mb-2">{gamesInDevelopment}</div>
              <div className="text-lg font-semibold text-gray-700">משחקים חדשים</div>
              <div className="text-sm text-gray-500">בפיתוח</div>
            </div>
          )}
        </div>
        
        {/* Main footer content */}
        <div className="text-center">
          <div className="text-4xl mb-4">💜</div>
          <p className="text-xl font-semibold text-purple-700 mb-2">נוצר במיוחד לילדים בגיל 2-5</p>
          <p className="text-gray-600 mb-4">משחקים בטוחים, חינוכיים ומהנים לכל המשפחה</p>
          
          {/* Features list */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="bg-purple-100 px-3 py-1 rounded-full">🔒 בטוח לילדים</span>
            <span className="bg-blue-100 px-3 py-1 rounded-full">📱 מתאים לנייד</span>
            <span className="bg-green-100 px-3 py-1 rounded-full">🎯 חינוכי</span>
            <span className="bg-yellow-100 px-3 py-1 rounded-full">🎮 מהנה</span>
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