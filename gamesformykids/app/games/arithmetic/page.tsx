import ArithmeticGameClient from './ArithmeticGameClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'חשבון מהיר | GamesForMyKids',
  description: 'חבר, חסר וכפל במהירות! משחק חשבון לילדים ברמות שונות.',
};

export default function ArithmeticPage() {
  return <ArithmeticGameClient />;
}
