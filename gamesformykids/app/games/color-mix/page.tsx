import ColorMixGameClient from './ColorMixGameClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ערבוב צבעים | GamesForMyKids',
  description: 'מה מקבלים כשמערבבים שני צבעים? משחק צבעים לילדים!',
};

export default function ColorMixPage() {
  return <ColorMixGameClient />;
}
