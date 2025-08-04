export default function AdvancedGamesPage() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="text-8xl mb-6">🎮</div>
      
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        ברוכים הבאים למשחקים מתקדמים!
      </h2>
      
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        כאן תמצאו משחקים מיוחדים ומאתגרים שיפתחו את הכישורים שלכם.
        בחרו משחק מהתפריט בצד השמאלי כדי להתחיל!
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="text-3xl mb-3">🧠</div>
          <h3 className="text-lg font-bold text-blue-800 mb-2">משחקי חשיבה</h3>
          <p className="text-blue-600 text-sm">
            פתחו את הזיכרון והיגיון שלכם עם משחקי חשיבה מאתגרים
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="text-lg font-bold text-green-800 mb-2">משחקי יצירה</h3>
          <p className="text-green-600 text-sm">
            הביעו את עצמכם באמצעות ציור, בנייה ויצירה דיגיטלית
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
          <div className="text-3xl mb-3">🔢</div>
          <h3 className="text-lg font-bold text-red-800 mb-2">משחקי מתמטיקה</h3>
          <p className="text-red-600 text-sm">
            תרגלו מתמטיקה בצורה מהנה ואינטראקטיבית
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
          <div className="text-3xl mb-3">🧩</div>
          <h3 className="text-lg font-bold text-purple-800 mb-2">פאזלים</h3>
          <p className="text-purple-600 text-sm">
            פתרו פאזלים מורכבים ופתחו חשיבה מרחבית
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="text-2xl mb-3">⭐</div>
        <h3 className="text-lg font-bold text-yellow-800 mb-2">
          התחילו עכשיו!
        </h3>
        <p className="text-yellow-700 text-sm">
          בחרו משחק מהתפריט בצד השמאלי והתחילו את ההרפתקה שלכם
        </p>
      </div>
    </div>
  );
}
