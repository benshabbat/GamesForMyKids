import { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = {
  title: 'הפרופיל שלי | GamesForMyKids',
  description: 'נהל את פרטי החשבון שלך',
  robots: { index: false },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
