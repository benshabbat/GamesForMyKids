import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'טוען...',
  description: 'האפליקציה נטענת, אנא המתן',
};

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="text-center">
        {/* Loading animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl">🎮</div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          טוען משחקים מהנים...
        </h2>
        
        <p className="text-gray-600 mb-8">
          אנא המתן בזמן שאנחנו מכינים עבורך את המשחקים הכי מגניבים!
        </p>
        
        {/* Fun animated icons */}
        <div className="flex justify-center space-x-4 text-3xl">
          <span className="inline-block animate-bounce">🧩</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>🎨</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>🎯</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>🌟</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>🎵</span>
        </div>
        
        {/* Progress bar simulation */}
        <div className="mt-8 w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
