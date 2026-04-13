export default function LearningBenefits() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
      <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
        ✨ מה תלמדו במשחק? ✨
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4">
          <div className="text-3xl mb-2">🧠</div>
          <h4 className="font-bold text-gray-700">חשיבה לוגית</h4>
          <p className="text-sm text-gray-600">פיתוח יכולת פתרון בעיות</p>
        </div>
        <div className="p-4">
          <div className="text-3xl mb-2">👁️</div>
          <h4 className="font-bold text-gray-700">תפיסה חזותית</h4>
          <p className="text-sm text-gray-600">זיהוי צורות וצבעים</p>
        </div>
        <div className="p-4">
          <div className="text-3xl mb-2">🎯</div>
          <h4 className="font-bold text-gray-700">ריכוז וסבלנות</h4>
          <p className="text-sm text-gray-600">שיפור הקשב והתמדה</p>
        </div>
      </div>
    </div>
  );
}
