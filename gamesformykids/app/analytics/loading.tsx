export default function AnalyticsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
        <div className="h-16 bg-white rounded-2xl shadow-sm" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 bg-white rounded-2xl shadow-sm" />
          <div className="h-40 bg-white rounded-2xl shadow-sm" />
          <div className="h-40 bg-white rounded-2xl shadow-sm" />
          <div className="h-40 bg-white rounded-2xl shadow-sm" />
        </div>
      </div>
    </div>
  );
}
