import UserProfile from '../user/UserProfile';

// Server Component - renders statically for better LCP
export function StaticHeader() {
  return (
    <header className="text-center py-6 md:py-12 relative overflow-hidden">
      {/* User profile in top-right corner */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20">
        <UserProfile />
      </div>

      {/* Simplified background decorative elements - hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        <div className="absolute top-10 left-10 text-6xl opacity-20">
          🌟
        </div>
        <div className="absolute top-16 right-16 text-5xl opacity-20">
          🎈
        </div>
        <div className="absolute bottom-10 left-20 text-4xl opacity-20">
          🎨
        </div>
        <div className="absolute bottom-16 right-12 text-5xl opacity-20">
          📚
        </div>
      </div>

      {/* Main content - Critical for LCP */}
      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-purple-800 mb-2 md:mb-4">
          🎮 משחקים לילדים 🎮
        </h1>
        <p className="text-base md:text-xl lg:text-2xl text-purple-600 font-semibold mb-4 md:mb-6">
          משחקים מהנים לגיל 2-5!
        </p>

        {/* Feature highlights - collapsed on mobile, shown on md+ */}
        <div className="max-w-4xl mx-auto mb-4 md:mb-8 hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            <div className="bg-white/70 rounded-2xl p-4 shadow-md">
              <div className="text-3xl mb-2" role="img" aria-label="target">🎯</div>
              <h2 className="font-bold text-purple-800">למידה מהנה</h2>
              <p className="text-sm text-purple-600">אותיות, מספרים וצורות</p>
            </div>
            <div className="bg-white/70 rounded-2xl p-4 shadow-md">
              <div className="text-3xl mb-2" role="img" aria-label="brain">🧠</div>
              <h2 className="font-bold text-purple-800">פיתוח חשיבה</h2>
              <p className="text-sm text-purple-600">זיכרון ופתרון בעיות</p>
            </div>
            <div className="bg-white/70 rounded-2xl p-4 shadow-md">
              <div className="text-3xl mb-2" role="img" aria-label="art">🎨</div>
              <h2 className="font-bold text-purple-800">יצירתיות</h2>
              <p className="text-sm text-purple-600">ציור ובנייה</p>
            </div>
          </div>
        </div>

        {/* Mobile-only compact badges */}
        <div className="flex justify-center gap-2 md:hidden mb-2">
          <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-bold text-purple-700 shadow-sm">🎯 למידה מהנה</span>
          <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-bold text-purple-700 shadow-sm">🧠 חשיבה</span>
          <span className="bg-white/70 rounded-full px-3 py-1 text-xs font-bold text-purple-700 shadow-sm">🎨 יצירתיות</span>
        </div>
      </div>
    </header>
  );
}
