import Link from 'next/link';
import { Metadata } from 'next';
import NotFoundSuggestions from '@/components/marketing/NotFoundSuggestions';

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
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="text-8xl mb-6">🎮</div>

          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            אופס! 404
          </h1>

          <p className="text-xl text-purple-600 mb-6">
            הדף שחיפשתם לא נמצא
          </p>

          <p className="text-gray-600 mb-8">
            אולי הקישור שגוי או שהדף הועבר למקום אחר?
          </p>

          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              🏠 חזרה לעמוד הראשי
            </Link>
          </div>

          <NotFoundSuggestions />
        </div>
      </div>
    </div>
  );
}
