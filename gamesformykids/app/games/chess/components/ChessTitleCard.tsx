'use client';

export default function ChessTitleCard() {
  return (
    <div
      className="w-full rounded-3xl px-8 py-8 text-center shadow-2xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(160deg, #2d1a0a 0%, #1a0d02 45%, #2a1508 100%)',
        border: '1px solid rgba(180,120,50,0.25)',
        boxShadow: '0 0 0 1px rgba(255,180,60,0.08), 0 24px 64px rgba(0,0,0,0.7)',
      }}
    >
      {/* Subtle chess-board corner pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, transparent 0% 50%)',
        backgroundSize: '20px 20px',
        borderRadius: 'inherit',
      }} />

      {/* Gold rim line */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,195,80,0.4), transparent)' }} />

      <div className="relative z-10">
        <div
          className="text-7xl mb-3 inline-block"
          style={{ animation: 'float 3s ease-in-out infinite', filter: 'drop-shadow(0 0 16px rgba(251,191,36,0.4))' }}
        >
          ♟
        </div>
        <h1
          className="text-5xl font-extrabold mb-2 tracking-wide"
          style={{
            background: 'linear-gradient(180deg, #fde68a 0%, #f59e0b 50%, #d97706 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            filter: 'drop-shadow(0 2px 6px rgba(180,100,20,0.5))',
          }}
        >
          שחמט
        </h1>
        <p className="text-amber-800/70 text-sm leading-relaxed">
          שחמט קלאסי נגד המחשב<br />
          <span className="text-amber-700/50 text-xs">אתה משחק לבן (♙) מהצד התחתון</span>
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-10px) rotate(4deg); }
        }
      `}</style>
    </div>
  );
}
