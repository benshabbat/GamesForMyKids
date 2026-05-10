import { Metadata } from 'next';
import SettingsClient from './SettingsClient';

export const metadata: Metadata = {
  title: 'הגדרות | GamesForMyKids',
  description: 'התאם אישית את חווית המשחק שלך',
  robots: { index: false },
};

export default function SettingsPage() {
  return <SettingsClient />;
}
