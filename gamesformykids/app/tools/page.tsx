import type { Metadata } from 'next';
import ToolsPageClient from './ToolsPageClient';

export const metadata: Metadata = {
  title: 'כלי כיתה — GamesForMyKids',
  description: 'כלים חינוכיים לכיתה ולבית: גלגל מזל, מחלק קבוצות, מחשבון גיל ועוד.',
  keywords: 'כלי כיתה, גלגל מזל, מחלק קבוצות, כלים חינוכיים, כלים למורים',
};

export default function ToolsPage() {
  return <ToolsPageClient />;
}
