import { Metadata } from 'next';
import DrawingGameClient from './components/DrawingGameClient';

// מטא-דאטה עבור הדף
export const metadata: Metadata = {
  title: 'משחק ציורים דיגיטליים - משחקים לילדים',
  description: 'משחק ציורים מהנה וחינוכי לילדים. ציירו, צבעו ותיצרו יצירות אמנות יפות! כלי ציור מתקדמים וידידותיים לילדים.',
  keywords: ['ציור דיגיטלי', 'משחקים לילדים', 'יצירה', 'אמנות', 'צביעה', 'יצירתיות', 'כלי ציור'],
  openGraph: {
    title: 'משחק ציורים דיגיטליים - משחקים לילדים',
    description: 'משחק ציורים מהנה וחינוכי לילדים. ציירו, צבעו ותיצרו יצירות אמנות יפות!',
    type: 'article',
    url: 'https://gamesformykids.vercel.app/games/drawing',
    images: [
      {
        url: '/images/games/drawing-og.png',
        width: 1200,
        height: 630,
        alt: 'משחק ציורים דיגיטליים לילדים',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'משחק ציורים דיגיטליים - משחקים לילדים',
    description: 'משחק ציורים מהנה וחינוכי לילדים',
    images: ['/images/games/drawing-twitter.png'],
  },
  alternates: {
    canonical: '/games/drawing',
  },
};

// Server Component שמכיל את ה-metadata ומעביר לקליינט
export default function DrawingGamePage() {
  return <DrawingGameClient />;
}
