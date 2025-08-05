import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'דף לא נמצא',
  description: 'הדף שחיפשת לא קיים. חזור לדף הבית כדי לגלות משחקים מהנים!',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Fun illustration */}
        <div className="text-8xl mb-6">🎮</div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          אופס! הדף לא נמצא
        </h1>
        
        <p className="text-gray-600 mb-8">
          נראה שהדף שחיפשת איבד את דרכו... 
          בואו נחזור למשחקים המהנים!
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            חזרה לדף הבית
          </Link>
          
          <Link
            href="/games"
            className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            כל המשחקים
          </Link>
        </div>
        
        {/* Additional fun elements */}
        <div className="mt-8 text-4xl space-x-2">
          <span className="inline-block animate-bounce">🧩</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>🎨</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>🎯</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>🌟</span>
        </div>
      </div>
    </div>
  );
}
