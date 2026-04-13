export default function HelpStepsSection() {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="font-bold text-blue-800 mb-2">📋 שלבי המשחק:</h3>
      <ol className="list-decimal list-inside space-y-2 text-blue-700">
        <li>העלה תמונה מהמחשב שלך</li>
        <li>בחר רמת קושי (2x2 עד 5x5)</li>
        <li>גרור את החלקים למקום הנכון בלוח</li>
        <li>השלם את הפאזל במהירות הגבוהה ביותר!</li>
      </ol>
    </div>
  );
}
