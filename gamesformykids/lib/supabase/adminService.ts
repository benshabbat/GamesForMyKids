/**
 * ===============================================
 * Admin Service — client-callable wrappers around /api/admin/** routes
 * ===============================================
 * These hit route handlers (not supabase.from() directly) because role
 * changes/suspend/delete need server-side requireAdmin() checks and, for
 * suspend/delete, the service-role key which must never reach the client.
 */

import type { GameOverrideStatus } from '@/lib/registry/gameOverrides';

interface ActionResult {
  success: boolean;
  error?: string;
}

async function postJson(url: string, body: unknown, method: 'POST' | 'DELETE' = 'POST'): Promise<ActionResult> {
  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    const data = await res.json();
    return data as ActionResult;
  } catch {
    return { success: false, error: 'שגיאת רשת' };
  }
}

export function setUserRole(userId: string, role: 'user' | 'admin'): Promise<ActionResult> {
  return postJson(`/api/admin/users/${userId}/role`, { role });
}

export function suspendUser(userId: string, action: 'suspend' | 'unsuspend'): Promise<ActionResult> {
  return postJson(`/api/admin/users/${userId}/suspend`, { action });
}

export function deleteUser(userId: string): Promise<ActionResult> {
  return postJson(`/api/admin/users/${userId}/delete`, undefined, 'DELETE');
}

export function setGameOverride(gameId: string, status: GameOverrideStatus): Promise<ActionResult> {
  return postJson(`/api/admin/games/${gameId}/override`, { status });
}
