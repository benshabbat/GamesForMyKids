export function GoogleAnalyticsCard() {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
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
          <p><strong>סטטוס:</strong> {isProduction ? 'פעיל בפרודקשן' : 'לא פעיל בפיתוח'}</p>
        </div>
      </div>
    </div>
  );
}
