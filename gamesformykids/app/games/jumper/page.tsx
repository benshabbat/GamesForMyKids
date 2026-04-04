import { Metadata } from 'next';
import JumperClient from './JumperClient';

export const metadata: Metadata = {
  title: '🦘 קפצן | משחקים לילדים',
  description: 'קפץ על הפלטפורמות וטפס גבוה ככל האפשר!',
};

export default function Page() {
  return <JumperClient />;
}
