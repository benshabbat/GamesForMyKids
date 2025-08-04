import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-gray-800 mb-4">404</h2>
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">הדף לא נמצא</h1>
        <p className="text-gray-600 mb-8">הדף שחיפשת לא קיים במערכת</p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          חזרה לעמוד הבית
        </Link>
      </div>
    </div>
  )
}
