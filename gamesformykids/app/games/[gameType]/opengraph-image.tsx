import { ImageResponse } from 'next/og';
import { GAME_UI_CONFIGS } from '@/lib/constants/ui/gameConfigs';
import { GAMES_REGISTRY } from '@/lib/registry/gamesRegistryData';
import { buildStaticParams } from './gamePageUtils';

export const alt = 'GamesForMyKids — משחקים חינוכיים לילדים';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return buildStaticParams();
}

const FALLBACK_BG = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

export default async function Image({ params }: { params: Promise<{ gameType: string }> }) {
  const { gameType = '' } = await params;

  const reg = GAMES_REGISTRY.find((g) => g.id === gameType);
  const config = GAME_UI_CONFIGS[gameType as keyof typeof GAME_UI_CONFIGS];

  const emoji = reg?.emoji ?? '🎮';
  const title = reg?.title ?? gameType.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const bg = config?.colors?.background ?? FALLBACK_BG;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: bg,
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 320, height: 320, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 240, height: 240, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />

        {/* Game emoji */}
        <div style={{ fontSize: 180, lineHeight: 1, marginBottom: 24 }}>
          {emoji}
        </div>

        {/* Game title */}
        <div style={{
          fontSize: 72,
          fontWeight: 700,
          color: 'white',
          textShadow: '0 4px 16px rgba(0,0,0,0.25)',
          direction: 'rtl',
          textAlign: 'center',
          maxWidth: 900,
          lineHeight: 1.2,
          padding: '0 40px',
        }}>
          {title}
        </div>

        {/* Site watermark */}
        <div style={{
          position: 'absolute',
          bottom: 36,
          fontSize: 32,
          color: 'rgba(255,255,255,0.75)',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span>🎮</span>
          <span>GamesForMyKids</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
