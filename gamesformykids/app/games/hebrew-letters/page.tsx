import { Metadata } from 'next';
import HebrewLettersHub from '@/components/game/hebrew-letters/HebrewLettersHub';

export const metadata: Metadata = {
  title: 'תרגול כתיבה בעברית - אותיות',
  description: 'תרגלו כתיבה של כל האותיות בעברית עם דפי תרגול אינטראקטיביים',
};

export default function HebrewLettersPage() {
  return <HebrewLettersHub />;
}
