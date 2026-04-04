import { Metadata } from 'next';
import DinoRunnerClient from './DinoRunnerClient';

export const metadata: Metadata = {
  title: 'דינוזאור קופץ | GamesForMyKids',
  description: 'עזור לדינוזאור לקפוץ מעל המכשולים ולהגיע רחוק ככל האפשר!',
};

export default function DinoRunnerPage() {
  return <DinoRunnerClient />;
}
