interface AdvancedGameMainProps {
  params: Promise<{ gameType: string }>;
}

// מידע על המשחקים המתקדמים
const GAME_INFO = {
  memory: {
    title: 'משחק זיכרון מתקדם',
    description: 'אתגר הזיכרון האולטימטיבי עם רמות קושי משתנות',
    features: ['זיכרון מתקדם', 'רמות מרובות', 'טיימר', 'ניקוד מתקדם'],
    color: 'from-blue-500 to-blue-600'
  },
  puzzles: {
    title: 'פאזלים מתקדמים',
    description: 'פאזלים מורכבים עם תמונות יפות ואפקטים מיוחדים',
    features: ['תמונות HD', 'חתיכות בגדלים שונים', 'עזרה חכמה', 'שמירת התקדמות'],
    color: 'from-green-500 to-green-600'
  },
  math: {
    title: 'מתמטיקה מתקדמת',
    description: 'תרגילי מתמטיקה מאתגרים עם הסברים ודוגמאות',
    features: ['חיבור וחיסור', 'כפל וחילוק', 'שברים', 'בעיות מילוליות'],
    color: 'from-red-500 to-red-600'
  },
  drawing: {
    title: 'ציור דיגיטלי מתקדם',
    description: 'סטודיו אמנות מלא עם כלים מקצועיים',
    features: ['מברשות מתקדמות', 'שכבות', 'אפקטים', 'שמירה וטעינה'],
    color: 'from-purple-500 to-purple-600'
  },
  builder: {
    title: 'בונה עולמות 3D',
    description: 'בנו עולמות וירטואליים תלת מימדיים מדהימים',
    features: ['בנייה תלת מימדית', 'טקסטורות', 'תאורה', 'שיתוף יצירות'],
    color: 'from-orange-500 to-orange-600'
  }
};

export default async function AdvancedGameMain({ params }: AdvancedGameMainProps) {
  const { gameType } = await params;
  
  const gameInfo = GAME_INFO[gameType as keyof typeof GAME_INFO];
  
  if (!gameInfo) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">❓</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          משחק לא נמצא
        </h2>
        <p className="text-gray-600">
          המשחק שבחרתם אינו זמין כרגע
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* כרטיס מידע על המשחק */}
      <div className={`bg-gradient-to-r ${gameInfo.color} rounded-2xl shadow-lg p-8 text-white`}>
        <h2 className="text-4xl font-bold mb-4">{gameInfo.title}</h2>
        <p className="text-xl opacity-90 mb-6">{gameInfo.description}</p>
        
        {/* תכונות המשחק */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {gameInfo.features.map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <span className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* כפתור התחלה */}
        <div className="flex justify-center">
          <button className="bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg">
            🎮 התחל לשחק עכשיו!
          </button>
        </div>
      </div>

      {/* הוראות מהירות */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          📋 הוראות מהירות
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-lg text-gray-700 mb-3">איך משחקים:</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">1.</span>
                <span>לחצו על כפתור &quot;התחל לשחק&quot;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">2.</span>
                <span>בחרו את רמת הקושי המתאימה</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">3.</span>
                <span>עקבו אחר ההוראות במשחק</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">4.</span>
                <span>תהנו וללמדו!</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg text-gray-700 mb-3">טיפים:</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">💡</span>
                <span>התחילו מרמת קושי נמוכה</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">💡</span>
                <span>השתמשו בכפתור העזרה במקרה הצורך</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">💡</span>
                <span>קחו הפסקות במהלך המשחק</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">💡</span>
                <span>תרגלו כדי להשתפר</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* משחקים קשורים */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          🎯 משחקים דומים
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(GAME_INFO)
            .filter(([key]) => key !== gameType)
            .slice(0, 3)
            .map(([key, info]) => (
              <div key={key} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">{info.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{info.description}</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  נסו גם זה →
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
