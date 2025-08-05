'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | undefined;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined as undefined });
  };

  override render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

// Default error fallback component
function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-red-600 text-6xl mb-4">😵</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          אופס! משהו השתבש
        </h2>
        <p className="text-gray-600 mb-6">
          אירעה שגיאה בלתי צפויה. אנא נסה שוב או רענן את הדף.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 mb-2">
              פרטי השגיאה (רק במצב פיתוח)
            </summary>
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
        <button
          onClick={resetError}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          נסה שוב
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
