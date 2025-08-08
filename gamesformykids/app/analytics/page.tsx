import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Analytics וביצועים | משחקים לילדים',
  description: 'מעקב אחר ביצועי האתר והשימוש במשחקים החינוכיים שלנו.',
  robots: {
    index: false, // Don't index analytics page
    follow: false,
  },
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* כותרת */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-4">
            📊 Analytics וביצועים
          </h1>
          <p className="text-xl text-purple-600">
            מעקב אחר ביצועי האתר והשימוש במשחקים
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Google Analytics */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              📈 Google Analytics
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-800">✅ מותקן ופעיל</h3>
                <p className="text-green-700 text-sm">
                  Google Analytics 4 מותקן ומעקב אחר תנועה באתר
                </p>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>קובץ:</strong> components/GoogleAnalytics.tsx</p>
                <p><strong>משתנה סביבה:</strong> NEXT_PUBLIC_GA_ID</p>
                <p><strong>סטטוס:</strong> {process.env.NODE_ENV === 'production' ? 'פעיל בפרודקשן' : 'לא פעיל בפיתוח'}</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              ⚡ ביצועים
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-800">Next.js App Router</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-800">Turbopack (Dev)</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-800">Image Optimization</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-800">Service Worker</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
            </div>
          </div>

          {/* SEO Status */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              🔍 SEO Status
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-800">robots.txt</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-800">sitemap.xml</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-800">Open Graph</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-800">Structured Data</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-800">OG Images</span>
                <span className="text-yellow-600 font-bold">⚠️</span>
              </div>
            </div>
          </div>

          {/* Tools & Commands */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              🛠️ כלי ניתוח
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2">Bundle Analysis</h3>
                <code className="text-sm bg-gray-200 px-2 py-1 rounded">
                  npm run build:analyze
                </code>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2">SEO Check</h3>
                <code className="text-sm bg-gray-200 px-2 py-1 rounded">
                  npm run seo:check
                </code>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2">Lighthouse</h3>
                <p className="text-sm text-gray-600">
                  פתח Developer Tools → Lighthouse
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            🚀 פעולות מהירות
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a 
              href="/sitemap.xml" 
              target="_blank"
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
            >
              <h3 className="font-bold text-blue-800 mb-2">📄 צפייה ב-Sitemap</h3>
              <p className="text-blue-600 text-sm">בדוק את מפת האתר</p>
            </a>
            <a 
              href="/robots.txt" 
              target="_blank"
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
            >
              <h3 className="font-bold text-green-800 mb-2">🤖 צפייה ב-Robots.txt</h3>
              <p className="text-green-600 text-sm">בדוק הוראות זחילה</p>
            </a>
            <a 
              href="/manifest.json" 
              target="_blank"
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
            >
              <h3 className="font-bold text-purple-800 mb-2">📱 צפייה ב-Manifest</h3>
              <p className="text-purple-600 text-sm">בדוק הגדרות PWA</p>
            </a>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            🏠 חזרה לעמוד הראשי
          </Link>
        </div>
      </div>
    </div>
  );
}
