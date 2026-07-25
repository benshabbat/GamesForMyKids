'use client'

/**
 * GameOverridesProvider — fetches game_overrides once on mount and populates
 * the module-level cache read by GamesRegistry (lib/registry/gameOverrides.ts).
 * A hidden/featured game may not reflect until this fetch resolves (accepted
 * v1 limitation — see admin panel plan).
 */

import { useEffect, ReactNode } from 'react'
import { setGameOverridesCache } from '@/lib/registry/gameOverrides'
import type { GameOverridesMap } from '@/lib/registry/gameOverrides'

export function GameOverridesProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    fetch('/api/game-overrides')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { overrides: GameOverridesMap } | null) => {
        if (data) setGameOverridesCache(data.overrides)
      })
      .catch(() => {})
  }, [])

  return <>{children}</>
}
