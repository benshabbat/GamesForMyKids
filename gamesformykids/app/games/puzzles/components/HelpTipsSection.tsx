import HelpSection from './HelpSection';

export default function HelpTipsSection() {
  return (
    <HelpSection color="green" title="💡 טיפים:">
      <ul className="list-disc list-inside space-y-2">
        <li>חלקים נכונים יוצגו עם מסגרת ירוקה וכוכב</li>
        <li>חלקים שגויים יוצגו עם מסגרת אדומה וX</li>
        <li>ניתן לגרור חלקים מהלוח אם הם לא במקום הנכון</li>
        <li>השתמש בכפתור &ldquo;רמזים&rdquo; לעזרה נוספת</li>
      </ul>
    </HelpSection>
  );
}
