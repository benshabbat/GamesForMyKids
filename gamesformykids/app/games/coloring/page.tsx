import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'משחק צביעת תמונות - משחקים לילדים',
  description: 'צבע תמונות מהנות! בחר צבעים ומלא ציורים בצבע. משחק יצירתי לילדים בגיל 2-5.',
  keywords: ['צביעה', 'ציור', 'משחקים לילדים', 'יצירה', 'אמנות', 'צבעים'],
  openGraph: {
    title: 'משחק צביעת תמונות - משחקים לילדים',
    description: 'צבע תמונות מהנות! בחר צבעים ומלא ציורים בצבע.',
    type: 'article',
  },
  alternates: {
    canonical: '/games/coloring',
  },
};

const ColoringGameClient = dynamic(() => import('./ColoringGameClient'), { ssr: false });

export default function ColoringPage() {
  return <ColoringGameClient />;
}
