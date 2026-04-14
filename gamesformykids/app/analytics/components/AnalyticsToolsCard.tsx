const TOOLS = [
  { title: 'Bundle Analysis', command: 'npm run build:analyze' },
  { title: 'SEO Check', command: 'npm run seo:check' },
];

export function AnalyticsToolsCard() {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
        🛠️ כלי ניתוח
      </h2>
      <div className="space-y-3">
        {TOOLS.map(({ title, command }) => (
          <div key={title} className="p-3 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
            <code className="text-sm bg-gray-200 px-2 py-1 rounded">{command}</code>
          </div>
        ))}
        <div className="p-3 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-2">Lighthouse</h3>
          <p className="text-sm text-gray-600">פתח Developer Tools → Lighthouse</p>
        </div>
      </div>
    </div>
  );
}
