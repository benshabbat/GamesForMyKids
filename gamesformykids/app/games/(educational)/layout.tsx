export default function EducationalGamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="educational-games min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* כותרת חינוכית */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 mb-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-4xl">🎓</span>
            <h2 className="text-3xl font-bold">משחקים חינוכיים</h2>
            <span className="text-4xl">📚</span>
          </div>
          <p className="text-center text-lg text-blue-100">
            משחקים שמפתחים כישורים קוגניטיביים, מתמטיים ולשוניים
          </p>
        </div>
      </div>

      {/* תוכן המשחקים */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="font-bold text-blue-800">פיתוח זיכרון</h3>
              <p className="text-sm text-blue-600">חיזוק היכולת לזכור ולחשוב</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="font-bold text-green-800">למידת מספרים</h3>
              <p className="text-sm text-green-600">מתמטיקה בצורה מהנה</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-purple-800">ריכוז וקשב</h3>
              <p className="text-sm text-purple-600">שיפור הקשב והריכוז</p>
            </div>
          </div>
        </div>

        {/* תוכן המשחק */}
        {children}
      </div>

      {/* פוטר חינוכי */}
      <footer className="mt-12 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-indigo-100">
            💡 טיפ: שחקו 15-20 דקות בכל פעם לתוצאות הטובות ביותר
          </p>
        </div>
      </footer>
    </div>
  );
}
