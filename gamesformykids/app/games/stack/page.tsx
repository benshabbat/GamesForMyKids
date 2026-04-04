import { Metadata } from 'next';
import StackClient from './StackClient';

export const metadata: Metadata = {
  title: '🏗️ ערם לבנים | משחקים לילדים',
  description: 'הפל לבנים בזמן הנכון ובנה מגדל גבוה ככל האפשר!',
};

export default function Page() {
  return <StackClient />;
}
