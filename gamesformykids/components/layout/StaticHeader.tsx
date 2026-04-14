import UserProfile from '../user/UserProfile';
import { HeaderBackground } from './header/HeaderBackground';
import { HeaderHero } from './header/HeaderHero';
import { FeatureHighlights } from './header/FeatureHighlights';

// Server Component - renders statically for better LCP
export function StaticHeader() {
  return (
    <header className="text-center py-6 md:py-12 relative overflow-hidden">
      <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20">
        <UserProfile />
      </div>

      <HeaderBackground />

      <div className="relative z-10">
        <HeaderHero />
        <FeatureHighlights />
      </div>
    </header>
  );
}
