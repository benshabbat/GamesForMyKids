import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות',
  description: 'מדיניות פרטיות למשחקים לילדים - אנחנו מכבדים את הפרטיות שלכם',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            מדיניות פרטיות
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                🛡️ התחייבות לפרטיות
              </h2>
              <p className="mb-4">
                אנחנו באתר &ldquo;משחקים לילדים&rdquo; מתחייבים להגן על הפרטיות של המשתמשים שלנו, 
                במיוחד כשמדובר בילדים. מדיניות הפרטיות הזו מסבירה איך אנחנו אוספים, 
                משתמשים ומגנים על המידע שלכם.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                📊 איסוף מידע
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-green-800 mb-2">✅ מה שאנחנו אוספים:</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>נתוני שימוש אנונימיים (כמו זמן משחק וציונים)</li>
                  <li>מידע טכני (סוג דפדפן, גודל מסך) לשיפור החוויה</li>
                  <li>העדפות משחק (נשמרות במכשיר שלכם בלבד)</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">❌ מה שאנחנו לא אוספים:</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>שמות או פרטים אישיים</li>
                  <li>כתובות אימייל</li>
                  <li>מיקום גיאוגרפי מדויק</li>
                  <li>תמונות או קלטות קול</li>
                  <li>מידע על ילדים מתחת לגיל 13</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                🍪 עוגיות (Cookies)
              </h2>
              <p className="mb-4">
                אנחנו משתמשים בעוגיות טכניות בלבד לשמירת העדפות המשחק שלכם:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>עוגיות הכרחיות:</strong> לשמירת הגדרות כמו עוצמת קול ורמת קושי</li>
                <li><strong>עוגיות ביצועים:</strong> למעקב אחר טעינת הדפים (ללא זיהוי אישי)</li>
                <li><strong>ללא עוגיות שיווק:</strong> אנחנו לא משתמשים בעוגיות למטרות פרסום</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                👶 הגנה על ילדים
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 mb-2">
                  <strong>COPPA Compliance:</strong> האתר שלנו מיועד לילדים ומציית לחוק הגנת הפרטיות של ילדים (COPPA).
                </p>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  <li>לא אוספים מידע אישי מילדים מתחת לגיל 13</li>
                  <li>כל הנתונים נשארים אנונימיים</li>
                  <li>הורים יכולים לבקש מחיקת נתונים בכל עת</li>
                  <li>אין תכונות שיתוף או צ&apos;אט באתר</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                🔒 אבטחת מידע
              </h2>
              <p className="mb-4">
                אנחנו מיישמים אמצעי אבטחה מתקדמים:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>הצפנת HTTPS לכל התקשורת</li>
                <li>שמירת נתונים מקומית במכשיר (ללא שרתים חיצוניים)</li>
                <li>ביקורת אבטחה שוטפת</li>
                <li>אין אחסון של מידע רגיש</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                🌍 זכויות המשתמש
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">הזכויות שלכם:</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>לדעת איזה מידע נאסף</li>
                    <li>לבקש מחיקת נתונים</li>
                    <li>לבטל הסכמה בכל עת</li>
                    <li>לקבל עותק של הנתונים</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">איך להפעיל זכויות:</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>נקו את עוגיות הדפדפן</li>
                    <li>השתמשו במצב פרטי</li>
                    <li>צרו קשר איתנו</li>
                    <li>בטלו הרשאות באתר</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                📱 שירותי צד שלישי
              </h2>
              <p className="mb-4">
                אנחנו עשויים להשתמש בשירותים הבאים (כולם מכבדים פרטיות):
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Google Analytics:</strong> עם הגדרות פרטיות מרביות (אם כלל)</li>
                <li><strong>CDN:</strong> להעברת קבצים מהירה יותר</li>
                <li><strong>Web Fonts:</strong> לגופנים יפים יותר</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                🔄 עדכוני מדיניות
              </h2>
              <p className="mb-4">
                אנחנו עשויים לעדכן את מדיניות הפרטיות מעת לעת. כל שינוי יפורסם באתר 
                עם תאריך העדכון. המשך השימוש באתר לאחר עדכון מהווה הסכמה למדיניות החדשה.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>עדכון אחרון:</strong> אוגוסט 2025
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                📞 יצירת קשר
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <p className="text-blue-800 mb-4">
                  יש לכם שאלות על מדיניות הפרטיות? אנחנו כאן לעזור!
                </p>
                <div className="space-y-2 text-blue-700">
                  <p>📧 <strong>אימייל:</strong> privacy@gamesformykids.com</p>
                  <p>🌐 <strong>אתר:</strong> www.gamesformykids.com</p>
                  <p>📍 <strong>כתובת:</strong> ישראל</p>
                </div>
              </div>
            </section>

            <div className="text-center mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                תודה שאתם בוחרים באתר שלנו ונותנים בנו אמון לשמור על הפרטיות שלכם! 🛡️💙
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
