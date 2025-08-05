'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'שגיאה במערכת',
  description: 'אירעה שגיאה בלתי צפויה במערכת',
};

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Global error:', error);
    
    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="he" dir="rtl">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Error illustration */}
            <div className="text-8xl mb-6">😵</div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              אופס! משהו השתבש
            </h1>
            
            <p className="text-gray-600 mb-8">
              אירעה שגיאה בלתי צפויה. אנא נסה שוב או רענן את הדף.
            </p>
            
            {/* Error details for development */}
            {process.env.NODE_ENV === 'development' && (
              <details className="mb-6 text-left bg-gray-50 p-4 rounded-lg">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                  פרטי השגיאה (רק במצב פיתוח)
                </summary>
                <div className="text-xs text-gray-600 space-y-2">
                  <div>
                    <strong>Message:</strong> {error.message}
                  </div>
                  {error.digest && (
                    <div>
                      <strong>Digest:</strong> {error.digest}
                    </div>
                  )}
                  {error.stack && (
                    <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
                      {error.stack}
                    </pre>
                  )}
                </div>
              </details>
            )}
            
            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                נסה שוב
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                רענן את הדף
              </button>
              
              <Link
                href="/"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                חזרה לדף הבית
              </Link>
            </div>
            
            {/* Fun animations */}
            <div className="mt-8 text-2xl space-x-2">
              <span className="inline-block animate-pulse">💫</span>
              <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>🔧</span>
              <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>⚡</span>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
