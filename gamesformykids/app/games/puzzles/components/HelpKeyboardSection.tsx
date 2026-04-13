import HelpSection from './HelpSection';

export default function HelpKeyboardSection() {
  return (
    <HelpSection color="orange" title="⌨️ קיצורי מקלדת:">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div><strong>H:</strong> הפעל/כבה רמזים</div>
        <div><strong>D:</strong> הפעל/כבה מצב ניפוי באגים</div>
        <div><strong>S:</strong> ערבב חלקים</div>
        <div><strong>R:</strong> התחל מחדש</div>
        <div><strong>?:</strong> פתח/סגור עזרה</div>
        <div><strong>Escape:</strong> סגור עזרה</div>
      </div>
    </HelpSection>
  );
}
