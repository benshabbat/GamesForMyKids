import { Metadata } from 'next';
import NumberBubblesClient from './NumberBubblesClient';
export const metadata: Metadata = { title: '🔢 בועות מספרים | משחקים לילדים', description: 'פוצץ את הבועות לפי סדר המספרים!' };
export default function Page() { return <NumberBubblesClient />; }
