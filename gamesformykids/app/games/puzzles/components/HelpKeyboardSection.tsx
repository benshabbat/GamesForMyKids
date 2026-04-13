export default function HelpKeyboardSection() {
  return (
    <div className="bg-orange-50 p-4 rounded-lg">
      <h3 className="font-bold text-orange-800 mb-2">⌨️ קיצורי מקלדת:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-orange-700">
        <div><strong>H:</strong> הפעל/כבה רמזים</div>
        <div><strong>D:</strong> הפעל/כבה מצב ניפוי באגים</div>
        <div><strong>S:</strong> ערבב חלקים</div>
        <div><strong>R:</strong> התחל מחדש</div>
        <div><strong>?:</strong> פתח/סגור עזרה</div>
        <div><strong>Escape:</strong> סגור עזרה</div>
      </div>
    </div>
  );
}
