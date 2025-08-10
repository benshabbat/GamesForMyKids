// Server Component - renders statically for better LCP
export function StaticHeader() {
  return (
    <header className="text-center py-12 relative overflow-hidden">
      {/* Simplified background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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

      {/* Main content */}
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-purple-800 mb-4">
          🎮 משחקים לילדים 🎮
        </h1>
        <p className="text-xl md:text-2xl text-purple-600 font-semibold mb-6">
          משחקים מהנים לגיל 2-5!
        </p>

        {/* Static feature highlights */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            <div className="bg-white/70 rounded-2xl p-4 shadow-md">
              <div className="text-3xl mb-2">🎯</div>
              <h2 className="font-bold text-purple-800">למידה מהנה</h2>
              <p className="text-sm text-purple-600">אותיות, מספרים וצורות</p>
            </div>
            <div className="bg-white/70 rounded-2xl p-4 shadow-md">
              <div className="text-3xl mb-2">🧠</div>
              <h2 className="font-bold text-purple-800">פיתוח חשיבה</h2>
              <p className="text-sm text-purple-600">זיכרון ופתרון בעיות</p>
            </div>
            <div className="bg-white/70 rounded-2xl p-4 shadow-md">
              <div className="text-3xl mb-2">🎨</div>
              <h2 className="font-bold text-purple-800">יצירתיות</h2>
              <p className="text-sm text-purple-600">ציור ובנייה</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
