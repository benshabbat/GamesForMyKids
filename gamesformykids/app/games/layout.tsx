import Link from 'next/link';

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="p-4 bg-white shadow-md">
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
        >
          ← חזרה לעמוד הראשי
        </Link>
      </nav>
      {children}
    </div>
  );
}