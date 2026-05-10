import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'התחברות | GamesForMyKids',
  description: 'התחבר כדי לשמור את ההתקדמות שלך ולגשת לכל המשחקים',
  robots: { index: false },
};

export default function LoginPage() {
  return <LoginClient />;
}
