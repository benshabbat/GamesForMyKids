type StatusItem = { label: string; status: 'ok' | 'warn' };

const SEO_ITEMS: StatusItem[] = [
  { label: 'robots.txt', status: 'ok' },
  { label: 'sitemap.xml', status: 'ok' },
  { label: 'Open Graph', status: 'ok' },
  { label: 'Structured Data', status: 'ok' },
  { label: 'OG Images', status: 'warn' },
];

export function SEOStatusCard() {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
        🔍 SEO Status
      </h2>
      <div className="space-y-3">
        {SEO_ITEMS.map(({ label, status }) => (
          <div
            key={label}
            className={`flex justify-between items-center p-3 rounded-lg ${
              status === 'ok' ? 'bg-green-50' : 'bg-yellow-50'
            }`}
          >
            <span className={status === 'ok' ? 'text-green-800' : 'text-yellow-800'}>{label}</span>
            <span className={`font-bold ${status === 'ok' ? 'text-green-600' : 'text-yellow-600'}`}>
              {status === 'ok' ? '✓' : '⚠️'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
