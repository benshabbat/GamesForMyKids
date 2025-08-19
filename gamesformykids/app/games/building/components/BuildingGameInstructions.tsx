'use client';

export default function GameInstructions() {
  return (
    <div className="mt-4 md:mt-6 text-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 inline-block max-w-4xl">
        <h3 className="text-white font-bold text-lg md:text-xl mb-3 md:mb-4 flex items-center justify-center gap-2">
          📖 מדריך משחק קצר
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-white/90">
          <div>
            <h4 className="font-semibold mb-2 text-sm md:text-base">🎨 צבעים</h4>
            <ul className="text-xs md:text-sm space-y-1">
              <li>• בחר צבע מהפלטה</li>
              <li>• צורות חדשות יצבעו בצבע הנבחר</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-sm md:text-base">🎮 בניה</h4>
            <ul className="text-xs md:text-sm space-y-1">
              <li>• לחץ על צורות להוספה</li>
              <li>• גרור צורות במקום הרצוי</li>
              <li>• לחץ לבחירה וסיבוב</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-sm md:text-base">✨ כלים מיוחדים</h4>
            <ul className="text-xs md:text-sm space-y-1">
              <li>• רגיל: צורות פשוטות</li>
              <li>• קסם: אפקטים מיוחדים</li>
              <li>• קשת: צבעים אקראיים</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
