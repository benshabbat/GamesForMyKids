import { Metadata } from 'next';
import HealthyFoodGameClient from './HealthyFoodGameClient';

export const metadata: Metadata = {
  title: 'אוכל בריא | GamesForMyKids',
  description: 'לימוד על תזונה נכונה ואוכל בריא בצורה מהנה!',
};

export default function HealthyFoodPage() {
  return <HealthyFoodGameClient />;
}
