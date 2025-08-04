import { Metadata } from 'next';
import DrawingGameClient from './DrawingGameClient';

// מטא-דאטה עבור הדף
export const metadata: Metadata = {
  title: 'משחק ציורים - משחקים לילדים',
  description: 'משחק ציורים מהנה וחינוכי לילדים. ציירו, צבעו ותיצרו יצירות אמנות יפות!',
  keywords: ['ציור', 'משחקים לילדים', 'יצירה', 'אמנות'],
};

// Server Component שמכיל את ה-metadata ומעביר לקליינט
export default function DrawingGamePage() {
  return <DrawingGameClient />;
}
