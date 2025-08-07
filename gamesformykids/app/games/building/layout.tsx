import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'סטודיו הבנייה הקסום - משחקי ילדים',
  description: 'משחק בנייה יצירתי לילדים עם צורות צבעוניות ואפקטים קסומים',
  keywords: ['משחק בנייה', 'ילדים', 'יצירתיות', 'צורות', 'צבעים'],
};

export default function BuildingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
