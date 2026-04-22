import UserProfile from '../user/UserProfile';
import { HeaderBackground } from './header/HeaderBackground';
import { HeaderHero } from './header/HeaderHero';
import { FeatureHighlights } from './header/FeatureHighlights';

// Server Component - renders statically for better LCP
export function StaticHeader() {
  return (
    <header className="text-center py-6 md:py-8 lg:py-12 relative overflow-hidden">
      <HeaderBackground />

      <div className="relative z-10">
        <div className="flex justify-end px-4 mb-2">
          <UserProfile />
        </div>
        <HeaderHero />
        <FeatureHighlights />
      </div>
    </header>
  );
}
