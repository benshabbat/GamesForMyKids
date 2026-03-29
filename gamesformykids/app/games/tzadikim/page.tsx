import dynamic from 'next/dynamic';

const TzadikimGame = dynamic(() => import('./TzadikimGame'), { ssr: false });

export const metadata = {
  title: 'סיפורי צדיקים',
  description: 'למד על גדולי ישראל ומה שלמדנו מהם',
};

export default function TzadikimPage() {
  return <TzadikimGame />;
}
