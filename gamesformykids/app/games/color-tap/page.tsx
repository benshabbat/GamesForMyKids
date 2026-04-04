import { Metadata } from 'next';
import ColorTapClient from './ColorTapClient';

export const metadata: Metadata = {
  title: '🎨 צבע נכון | משחקים לילדים',
  description: 'לחץ על הצבע הנכון לפני שהזמן נגמר!',
};

export default function Page() {
  return <ColorTapClient />;
}
