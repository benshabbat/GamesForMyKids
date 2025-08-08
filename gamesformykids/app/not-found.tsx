import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - דף לא נמצא | משחקים לילדים',
  description: 'הדף שחיפשתם לא נמצא. חזרו לעמוד הראשי לגלות משחקים מהנים לילדים בגיל 2-5.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          {/* אמוג'י גדול */}
          <div className="text-8xl mb-6">🎮</div>
          
          {/* כותרת */}
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            אופס! 404
          </h1>
          
          {/* תיאור */}
          <p className="text-xl text-purple-600 mb-6">
            הדף שחיפשתם לא נמצא
          </p>
          
          <p className="text-gray-600 mb-8">
            אולי הקישור שגוי או שהדף הועבר למקום אחר?
          </p>
          
          {/* כפתורי פעולה */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              🏠 חזרה לעמוד הראשי
            </Link>
          </div>
          
          {/* עצות נוספות */}
          <div className="mt-8 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
            <h3 className="font-bold text-yellow-800 mb-2">💡 עצות חיפוש</h3>
            <ul className="text-sm text-yellow-700 space-y-1 text-right">
              <li>• בדקו את כתיבת הקישור</li>
              <li>• נסו לחזור לעמוד הקודם</li>
              <li>• חפשו במשחקים הזמינים</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
