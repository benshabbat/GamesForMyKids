export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6" dir="rtl">
      <div className="max-w-2xl mx-auto space-y-4 animate-pulse">
        <div className="h-32 bg-white rounded-2xl shadow-sm" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-24 bg-white rounded-2xl shadow-sm" />
          <div className="h-24 bg-white rounded-2xl shadow-sm" />
          <div className="h-24 bg-white rounded-2xl shadow-sm" />
        </div>
        <div className="h-48 bg-white rounded-2xl shadow-sm" />
        <div className="h-48 bg-white rounded-2xl shadow-sm" />
      </div>
    </div>
  );
}
