export default function HelpTipsSection() {
  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="font-bold text-green-800 mb-2">💡 טיפים:</h3>
      <ul className="list-disc list-inside space-y-2 text-green-700">
        <li>חלקים נכונים יוצגו עם מסגרת ירוקה וכוכב</li>
        <li>חלקים שגויים יוצגו עם מסגרת אדומה וX</li>
        <li>ניתן לגרור חלקים מהלוח אם הם לא במקום הנכון</li>
        <li>השתמש בכפתור &ldquo;רמזים&rdquo; לעזרה נוספת</li>
      </ul>
    </div>
  );
}
