import { Metadata } from 'next';
import MeteorDodgeClient from './MeteorDodgeClient';

export const metadata: Metadata = {
  title: 'התחמק ממטאורים | GamesForMyKids',
  description: 'הזז את הכוכב והתחמק ממטאורים נופלים!',
};

export default function MeteorDodgePage() {
  return <MeteorDodgeClient />;
}
