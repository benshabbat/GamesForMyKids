export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          שגיאה באימות
        </h1>
        <p className="text-gray-600 mb-6">
          אירעה שגיאה בתהליך האימות. אנא נסה שוב.
        </p>
        <a
          href="/login"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          חזור לעמוד ההתחברות
        </a>
      </div>
    </div>
  )
}
