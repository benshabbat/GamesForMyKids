export default function PauseOverlay() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 rounded-2xl">
      <div className="bg-white p-6 rounded-xl text-center shadow-2xl">
        <div className="text-4xl mb-3">⏸️</div>
        <div className="text-2xl font-bold text-gray-800">המשחק מושהה</div>
        <div className="text-gray-600 mt-2">לחץ על &quot;המשך&quot; כדי להמשיך</div>
      </div>
    </div>
  );
}
