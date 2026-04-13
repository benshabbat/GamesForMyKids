import HelpSection from './HelpSection';

export default function HelpStepsSection() {
  return (
    <HelpSection color="blue" title="📋 שלבי המשחק:">
      <ol className="list-decimal list-inside space-y-2">
        <li>העלה תמונה מהמחשב שלך</li>
        <li>בחר רמת קושי (2x2 עד 5x5)</li>
        <li>גרור את החלקים למקום הנכון בלוח</li>
        <li>השלם את הפאזל במהירות הגבוהה ביותר!</li>
      </ol>
    </HelpSection>
  );
}
