import { Metadata } from 'next';
import { HebrewLettersProvider } from '@/contexts';
import HebrewLettersHub from './components/HebrewLettersHub';

export const metadata: Metadata = {
  title: 'תרגול כתיבה בעברית - אותיות',
  description: 'תרגלו כתיבה של כל האותיות בעברית עם דפי תרגול אינטראקטיביים',
};

export default function HebrewLettersPage() {
  return (
    <HebrewLettersProvider>
      <HebrewLettersHub />
    </HebrewLettersProvider>
  );
}
