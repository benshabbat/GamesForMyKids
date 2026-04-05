'use client';

import { useBrickBreakerGame } from './useBrickBreakerGame';

export default function BrickBreakerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    padX: W / 2 - PAD_W / 2,
    ballX: W / 2,
    ballY: PAD_Y - BALL_R - 2,
    ballVX: 3,
    ballVY: -4,
    launched: false,
    bricks: makeBricks(),
    score: 0,
    best: 0,
    lives: 3,
    level: 1,
    raf: 0,
    frame: 0,
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string }[],
  });
  const [ui, setUi] = useState<{ phase: Phase; score: number; best: number; lives: number; level: number }>(
    { phase: 'menu', score: 0, best: 0, lives: 3, level: 1 }
  );

  const startGame = useCallback((level = 1) => {
    const s = st.current;
    s.phase = 'playing';
    s.padX = W / 2 - PAD_W / 2;
    s.ballX = W / 2;
    s.ballY = PAD_Y - BALL_R - 2;
    const spd = 3.5 + (level - 1) * 0.5;
    s.ballVX = spd;
    s.ballVY = -(spd + 0.5);
    s.launched = false;
    s.bricks = makeBricks();
    s.score = level === 1 ? 0 : s.score;
    s.lives = level === 1 ? 3 : s.lives;
    s.level = level;
    s.particles = [];
    setUi({ phase: 'playing', score: s.score, best: s.best, lives: s.lives, level });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function brickRect(i: number) {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = 10 + col * BRICK_W;
      const y = BRICK_TOP + row * (BRICK_H + BRICK_PAD);
      return { x, y, w: BRICK_W - BRICK_PAD, h: BRICK_H };
    }

    function loop() {
      const s = st.current;
      s.frame++;

      if (s.phase === 'playing') {
        if (!s.launched) {
          s.ballX = s.padX + PAD_W / 2;
          s.ballY = PAD_Y - BALL_R - 2;
        } else {
          // Move ball
          s.ballX += s.ballVX;
          s.ballY += s.ballVY;

          // Walls
          if (s.ballX - BALL_R <= 0) { s.ballX = BALL_R; s.ballVX = Math.abs(s.ballVX); }
          if (s.ballX + BALL_R >= W) { s.ballX = W - BALL_R; s.ballVX = -Math.abs(s.ballVX); }
          if (s.ballY - BALL_R <= 0) { s.ballY = BALL_R; s.ballVY = Math.abs(s.ballVY); }

          // Paddle
          if (s.ballY + BALL_R >= PAD_Y && s.ballY + BALL_R <= PAD_Y + PAD_H &&
            s.ballX >= s.padX && s.ballX <= s.padX + PAD_W) {
            const rel = (s.ballX - s.padX) / PAD_W - 0.5; // -0.5 to 0.5
            const spd = Math.sqrt(s.ballVX ** 2 + s.ballVY ** 2);
            s.ballVX = rel * spd * 2.2;
            s.ballVY = -Math.abs(s.ballVY);
          }

          // Bottom
          if (s.ballY + BALL_R > H) {
            s.lives--;
            s.launched = false;
            s.ballX = s.padX + PAD_W / 2;
            s.ballY = PAD_Y - BALL_R - 2;
            if (s.lives <= 0) {
              s.lives = 0;
              s.phase = 'dead';
              if (s.score > s.best) s.best = s.score;
              setUi({ phase: 'dead', score: s.score, best: s.best, lives: 0, level: s.level });
            } else {
              setUi(u => ({ ...u, lives: s.lives }));
            }
          }

          // Bricks
          for (let i = 0; i < s.bricks.length; i++) {
            if (!s.bricks[i].alive) continue;
            const { x, y, w, h } = brickRect(i);
            if (s.ballX + BALL_R > x && s.ballX - BALL_R < x + w &&
              s.ballY + BALL_R > y && s.ballY - BALL_R < y + h) {
              s.bricks[i].alive = false;
              s.score += 10;
              // Bounce direction
              const overlapLeft = s.ballX + BALL_R - x;
              const overlapRight = x + w - (s.ballX - BALL_R);
              const overlapTop = s.ballY + BALL_R - y;
              const overlapBottom = y + h - (s.ballY - BALL_R);
              const minX = Math.min(overlapLeft, overlapRight);
              const minY = Math.min(overlapTop, overlapBottom);
              if (minX < minY) s.ballVX *= -1; else s.ballVY *= -1;
              // Particles
              const colors = ROW_COLORS[s.bricks[i].row];
              for (let p = 0; p < 6; p++) {
                s.particles.push({
                  x: x + w / 2, y: y + h / 2,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5,
                  life: 1,
                  color: colors[Math.floor(Math.random() * colors.length)],
                });
              }
              setUi(u => ({ ...u, score: s.score }));
            }
          }

          // Win check
          if (s.bricks.every(b => !b.alive)) {
            const nextLevel = s.level + 1;
            s.phase = nextLevel > 5 ? 'won' : 'playing';
            if (nextLevel > 5) {
              s.phase = 'won';
              if (s.score > s.best) s.best = s.score;
              setUi({ phase: 'won', score: s.score, best: s.best, lives: s.lives, level: s.level });
            } else {
              startGame(nextLevel);
            }
          }
        }

        // Particles
        s.particles = s.particles.filter(p => {
          p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.04;
          return p.life > 0;
        });
      }

      // Draw background
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0f0c29');
      bg.addColorStop(1, '#302b63');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Bricks
      for (let i = 0; i < s.bricks.length; i++) {
        if (!s.bricks[i].alive) continue;
        const { x, y, w, h } = brickRect(i);
        const [c1, c2] = ROW_COLORS[s.bricks[i].row];
        const g = ctx.createLinearGradient(x, y, x, y + h);
        g.addColorStop(0, c1);
        g.addColorStop(1, c2);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 4);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, w - 4, 5, 3);
        ctx.fill();
      }

      // Particles
      for (const p of s.particles) {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Ball glow
      const ballGlow = ctx.createRadialGradient(s.ballX, s.ballY, 0, s.ballX, s.ballY, BALL_R * 2.5);
      ballGlow.addColorStop(0, 'rgba(255,255,255,0.4)');
      ballGlow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = ballGlow;
      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, BALL_R * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Ball
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, BALL_R, 0, Math.PI * 2);
      ctx.fill();

      // Paddle
      const padGrad = ctx.createLinearGradient(s.padX, PAD_Y, s.padX + PAD_W, PAD_Y);
      padGrad.addColorStop(0, '#60A5FA');
      padGrad.addColorStop(0.5, '#93C5FD');
      padGrad.addColorStop(1, '#60A5FA');
      ctx.fillStyle = padGrad;
      ctx.beginPath();
      ctx.roundRect(s.padX, PAD_Y, PAD_W, PAD_H, 6);
      ctx.fill();

      // "Tap to launch" hint
      if (s.phase === 'playing' && !s.launched) {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('הקש להשיק! 🏏', W / 2, PAD_Y - 20);
      }

      s.raf = requestAnimationFrame(loop);
    }

    const rafId = requestAnimationFrame(loop);
    st.current.raf = rafId;
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, [startGame]);

  // Mouse/touch paddle
  const movePaddle = useCallback((clientX: number, rect: DOMRect) => {
    const scaleX = W / rect.width;
    const mx = (clientX - rect.left) * scaleX;
    st.current.padX = Math.max(0, Math.min(W - PAD_W, mx - PAD_W / 2));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    movePaddle(e.clientX, e.currentTarget.getBoundingClientRect());
  }, [movePaddle]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    movePaddle(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
  }, [movePaddle]);

  const handleClick = useCallback(() => {
    const s = st.current;
    if (s.phase === 'playing' && !s.launched) {
      s.launched = true;
    } else if (s.phase === 'menu') {
      startGame(1);
    }
  }, [startGame]);

  // Keyboard
  useEffect(() => {
    let left = false, right = false;
    const interval = setInterval(() => {
      const s = st.current;
      if (s.phase !== 'playing') return;
      if (left) s.padX = Math.max(0, s.padX - 8);
      if (right) s.padX = Math.min(W - PAD_W, s.padX + 8);
    }, 16);
    const kd = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') left = true;
      if (e.key === 'ArrowRight') right = true;
      if (e.code === 'Space') { e.preventDefault(); handleClick(); }
    };
    const ku = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') left = false;
      if (e.key === 'ArrowRight') right = false;
    };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { clearInterval(interval); window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, [handleClick]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-5 mb-2 text-white text-center">
          <div><p className="text-2xl font-black text-yellow-300">{ui.score}</p><p className="text-xs text-yellow-500">ניקוד</p></div>
          <div><p className="text-lg">{Array(ui.lives).fill('❤️').join('')}</p><p className="text-xs text-red-400">חיים</p></div>
          <div><p className="text-2xl font-black text-blue-300">Lv.{ui.level}</p><p className="text-xs text-blue-500">רמה</p></div>
        </div>
      )}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          className="rounded-3xl shadow-2xl border-4 border-purple-700 cursor-none"
          style={{ touchAction: 'none', maxHeight: '85vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/60">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">🧱</div>
              <h1 className="text-2xl font-black text-purple-700 mb-1">שובר לבנים</h1>
              <p className="text-gray-500 text-sm mb-5">הזז את המחבט ושבור את כל הלבנים!<br />5 רמות של כיף</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={() => startGame(1)} className="w-full py-4 rounded-2xl bg-gradient-to-l from-purple-500 to-indigo-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {(ui.phase === 'dead' || ui.phase === 'won') && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/60">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">{ui.phase === 'won' ? '🏆' : '💔'}</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">{ui.phase === 'won' ? 'ניצחת! מדהים!' : 'נגמרו החיים!'}</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-purple-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-purple-600">{ui.score}</p>
                  <p className="text-xs text-purple-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={() => startGame(1)} className="w-full py-4 rounded-2xl bg-gradient-to-l from-purple-500 to-indigo-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 flex gap-4">
          <button onPointerDown={nudgeLeft} className="bg-purple-700/80 text-white rounded-xl px-7 py-3 text-xl font-bold active:bg-purple-500 touch-none">◄</button>
          <button onPointerDown={handleClick} className="bg-white/20 text-white rounded-xl px-6 py-3 text-sm font-bold active:bg-white/40 touch-none">🏸 השק</button>
          <button onPointerDown={nudgeRight} className="bg-purple-700/80 text-white rounded-xl px-7 py-3 text-xl font-bold active:bg-purple-500 touch-none">►</button>
        </div>
      )}
    </div>
  );
}
