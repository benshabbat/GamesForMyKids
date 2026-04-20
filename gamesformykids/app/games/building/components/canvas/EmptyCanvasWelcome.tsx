'use client';

export default function EmptyCanvasWelcome() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white/90">
        <div className="text-6xl md:text-8xl mb-4 md:mb-6 animate-bounce">🎨</div>
        <p className="text-xl md:text-2xl font-bold mb-2">ברוכים הבאים לסטודיו הקסום!</p>
        <p className="text-base md:text-lg mb-3">בחר צבע ולחץ על הצורות כדי להתחיל לבנות</p>
        <div className="space-y-1 text-sm md:text-base opacity-75">
          <p>💡 לחיצה כפולה = סיבוב מהיר</p>
          <p>🎯 לחיצה יחידה = בחירה ושינוי גודל</p>
        </div>
      </div>
    </div>
  );
}
