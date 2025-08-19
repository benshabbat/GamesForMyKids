/**
 * ===============================================
 * טיפוסים לhooks של Analytics
 * ===============================================
 */

export interface UseGamePerformanceProps {
  gameType: string;
  trackingEnabled?: boolean;
  sampleRate?: number;
}

export interface PerformanceMetrics {
  averageResponseTime: number;
  accuracy: number;
  completionRate: number;
  errorRate: number;
  engagementScore: number;
}
