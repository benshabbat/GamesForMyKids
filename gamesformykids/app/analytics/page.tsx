import { Metadata } from 'next';
import Link from 'next/link';
import { AnalyticsPageHeader } from './components/AnalyticsPageHeader';
import { GoogleAnalyticsCard } from './components/GoogleAnalyticsCard';
import { PerformanceCard } from './components/PerformanceCard';
import { SEOStatusCard } from './components/SEOStatusCard';
import { AnalyticsToolsCard } from './components/AnalyticsToolsCard';
import { QuickActions } from './components/QuickActions';

export const metadata: Metadata = {
  title: 'Analytics וביצועים | משחקים לילדים',
  description: 'מעקב אחר ביצועי האתר והשימוש במשחקים החינוכיים שלנו.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <AnalyticsPageHeader />

        <div className="grid md:grid-cols-2 gap-8">
          <GoogleAnalyticsCard />
          <PerformanceCard />
          <SEOStatusCard />
          <AnalyticsToolsCard />
        </div>

        <QuickActions />

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            🏠 חזרה לעמוד הראשי
          </Link>
        </div>
      </div>
    </div>
  );
}
