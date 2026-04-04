import { Metadata } from 'next';
import SimonClient from './SimonClient';

export const metadata: Metadata = {
  title: '🔴 שיימון אומר | משחקים לילדים',
  description: 'זכור את סדר הצבעים וחזור עליהם — משחק זיכרון קלאסי!',
};

export default function Page() {
  return <SimonClient />;
}
