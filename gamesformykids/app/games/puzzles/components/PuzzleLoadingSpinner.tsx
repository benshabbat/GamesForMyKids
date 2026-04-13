export default function PuzzleLoadingSpinner() {
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
      <p className="text-lg text-gray-600">טוען את הפאזל...</p>
    </div>
  );
}
