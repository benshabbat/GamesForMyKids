export default function LoginLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg animate-pulse">
        <div className="h-8 bg-blue-100 rounded w-3/4 mx-auto mb-6" />
        <div className="space-y-4">
          <div className="h-10 bg-gray-100 rounded-lg" />
          <div className="h-10 bg-gray-100 rounded-lg" />
          <div className="h-10 bg-blue-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
