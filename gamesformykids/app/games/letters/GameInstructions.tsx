export default function GameInstructions() {
  return (
    <div className="bg-white bg-opacity-90 rounded-3xl p-8 mb-8 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        איך משחקים?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
        <div className="text-center">
          <div className="text-4xl mb-3">👂</div>
          <p>
            <strong>1. תשמע</strong>
            <br />
            איזו אות אני אומר
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">🤔</div>
          <p>
            <strong>2. תחשוב</strong>
            <br />
            איך נראית האות
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">👆</div>
          <p>
            <strong>3. תלחץ</strong>
            <br />
            על האות הנכונה
          </p>
        </div>
      </div>
    </div>
  );
}