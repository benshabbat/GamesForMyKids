/**
 * Analytics hook for tracking user interactions and game performance
 * Implements privacy-friendly analytics following GDPR guidelines
 */

import { useEffect, useCallback } from 'react';
import { env } from '@/lib/env';

interface GameEvent {
  gameType: string;
  action: 'start' | 'complete' | 'quit' | 'pause' | 'resume';
  level?: number | undefined;
  score?: number | undefined;
  timeSpent?: number | undefined;
  difficulty?: string | undefined;
}

interface UserEvent {
  category: string;
  action: string;
  label?: string | undefined;
  value?: number | undefined;
}

// Privacy-safe analytics without personal data
export function useAnalytics() {
  // Initialize analytics (only in production)
  useEffect(() => {
    if (env.IS_PRODUCTION && env.NEXT_PUBLIC_GA_ID) {
      // Google Analytics 4 initialization
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${env.NEXT_PUBLIC_GA_ID}', {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
      `;
      document.head.appendChild(script2);
    }
  }, []);

  // Track game events
  const trackGameEvent = useCallback((event: GameEvent) => {
    // Console logging for development
    if (env.IS_DEVELOPMENT) {
      // Only console.warn and console.error are allowed by ESLint
      console.warn('🎮 Game Event:', event);
    }

    // Send to analytics in production
    if (env.IS_PRODUCTION && typeof window.gtag === 'function') {
      window.gtag('event', event.action, {
        event_category: 'game',
        event_label: event.gameType,
        custom_parameter_level: event.level,
        custom_parameter_score: event.score,
        custom_parameter_time: event.timeSpent,
        custom_parameter_difficulty: event.difficulty,
      });
    }

    // Store in local analytics (privacy-safe)
    storeLocalAnalytics('game_event', event);
  }, []);

  // Track user interactions
  const trackUserEvent = useCallback((event: UserEvent) => {
    // Console logging for development
    if (env.IS_DEVELOPMENT) {
      console.warn('👤 User Event:', event);
    }

    // Send to analytics in production
    if (env.IS_PRODUCTION && typeof window.gtag === 'function') {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }

    // Store in local analytics
    storeLocalAnalytics('user_event', event);
  }, []);

  // Track page views
  const trackPageView = useCallback((page: string, title?: string) => {
    if (env.IS_DEVELOPMENT) {
      console.warn('📄 Page View:', page, title);
    }

    if (env.IS_PRODUCTION && typeof window.gtag === 'function') {
      window.gtag('config', env.NEXT_PUBLIC_GA_ID!, {
        page_path: page,
        page_title: title,
      });
    }

    storeLocalAnalytics('page_view', { page, title });
  }, []);

  // Track performance metrics
  const trackPerformance = useCallback((metrics: {
    component: string;
    renderTime: number;
    loadTime?: number | undefined;
  }) => {
    if (env.IS_DEVELOPMENT) {
      console.warn('⚡ Performance:', metrics);
    }

    if (env.IS_PRODUCTION && typeof window.gtag === 'function') {
      window.gtag('event', 'performance_metric', {
        event_category: 'performance',
        event_label: metrics.component,
        custom_parameter_render_time: metrics.renderTime,
        custom_parameter_load_time: metrics.loadTime,
      });
    }

    storeLocalAnalytics('performance', metrics);
  }, []);

  // Track errors (without sensitive data)
  const trackError = useCallback((error: {
    component: string;
    errorType: string;
    message?: string;
  }) => {
    if (env.IS_DEVELOPMENT) {
      console.error('❌ Error:', error);
    }

    if (env.IS_PRODUCTION && typeof window.gtag === 'function') {
      window.gtag('event', 'exception', {
        description: `${error.component}: ${error.errorType}`,
        fatal: false,
      });
    }

    storeLocalAnalytics('error', error);
  }, []);

  return {
    trackGameEvent,
    trackUserEvent,
    trackPageView,
    trackPerformance,
    trackError,
  };
}

// Privacy-safe local analytics storage
function storeLocalAnalytics(type: string, data: unknown) {
  try {
    const timestamp = new Date().toISOString();
    const event = { type, data, timestamp };
    
    // Get existing analytics data
    const existing = localStorage.getItem('gfmk_analytics') || '[]';
    const analytics = JSON.parse(existing);
    
    // Add new event
    analytics.push(event);
    
    // Keep only last 100 events to avoid storage bloat
    if (analytics.length > 100) {
      analytics.splice(0, analytics.length - 100);
    }
    
    // Store back
    localStorage.setItem('gfmk_analytics', JSON.stringify(analytics));
  } catch (error) {
    // Ignore storage errors
    console.warn('Failed to store analytics:', error);
  }
}

// Hook for specific game analytics
export function useGameAnalytics(gameType: string) {
  const { trackGameEvent, trackUserEvent, trackPerformance } = useAnalytics();

  const startGame = useCallback((level?: number, difficulty?: string) => {
    trackGameEvent({
      gameType,
      action: 'start',
      level,
      difficulty,
    });
  }, [gameType, trackGameEvent]);

  const completeGame = useCallback((score: number, timeSpent: number, level?: number) => {
    trackGameEvent({
      gameType,
      action: 'complete',
      score,
      timeSpent,
      level,
    });
  }, [gameType, trackGameEvent]);

  const quitGame = useCallback((timeSpent: number, level?: number) => {
    trackGameEvent({
      gameType,
      action: 'quit',
      timeSpent,
      level,
    });
  }, [gameType, trackGameEvent]);

  const trackInteraction = useCallback((action: string, label?: string) => {
    trackUserEvent({
      category: 'game_interaction',
      action: `${gameType}_${action}`,
      label,
    });
  }, [gameType, trackUserEvent]);

  return {
    startGame,
    completeGame,
    quitGame,
    trackInteraction,
    trackPerformance: (renderTime: number, loadTime?: number) => {
      const perfData: { component: string; renderTime: number; loadTime?: number | undefined } = {
        component: gameType,
        renderTime,
      };
      if (loadTime !== undefined) {
        perfData.loadTime = loadTime;
      }
      return trackPerformance(perfData);
    },
  };
}

// Get analytics data (for admin/debugging)
export function getAnalyticsData() {
  try {
    const data = localStorage.getItem('gfmk_analytics');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Clear analytics data (for privacy compliance)
export function clearAnalyticsData() {
  try {
    localStorage.removeItem('gfmk_analytics');
  } catch {
    // Ignore errors
  }
}
