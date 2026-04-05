'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const W = 360;
const H = 560;
const PAD_W = 70;
const PAD_H = 12;
const BALL_R = 8;
const WIN_SCORE = 7;
const AI_SPEED = 3.5;

type Phase = 'menu' | 'playing' | 'result';

export function usePongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    phase: 'menu' as Phase,
    playerX: W / 2 - PAD_W / 2, aiX: W / 2 - PAD_W / 2,
    ballX: W / 2, ballY: H / 2, ballVX: 3, ballVY: 4,
    playerScore: 0, aiScore: 0, raf: 0, frame: 0,
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number }[],
  });
  const [ui, setUi] = useState<{ phase: Phase; playerScore: number; aiScore: number }>({ phase: 'menu', playerScore: 0, aiScore: 0 });

  function serveBall(direction: 1 | -1) {
    const s = st.current;
    const spd = 4 + Math.min(s.playerScore + s.aiScore, 8) * 0.2;
    const angle = (Math.random() - 0.5) * 1.0;
    s.ballX = W / 2; s.ballY = H / 2;
    s.ballVX = Math.sin(angle) * spd; s.ballVY = direction * Math.cos(angle) * spd;
  }

  const startGame = useCallback(() => {
    const s = st.current;
    s.phase = 'playing';
    s.playerX = W / 2 - PAD_W / 2; s.aiX = W / 2 - PAD_W / 2;
    s.ballX = W / 2; s.ballY = H / 2;
    const angle = (Math.random() - 0.5) * 1.2, spd = 4;
    s.ballVX = Math.sin(angle) * spd; s.ballVY = (Math.random() < 0.5 ? 1 : -1) * Math.cos(angle) * spd;
    s.playerScore = 0; s.aiScore = 0; s.frame = 0; s.particles = [];
    setUi({ phase: 'playing', playerScore: 0, aiScore: 0 });
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (st.current.phase === 'menu') startGame();
  }, [startGame]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (st.current.phase !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (W / rect.width);
    st.current.playerX = Math.max(0, Math.min(W - PAD_W, mx - PAD_W / 2));
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (st.current.phase !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.touches[0].clientX - rect.left) * (W / rect.width);
    st.current.playerX = Math.max(0, Math.min(W - PAD_W, mx - PAD_W / 2));
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (st.current.phase === 'menu') startGame();
    handleTouchMove(e);
  }, [startGame, handleTouchMove]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function addParticles(x: number, y: number) {
      const s = st.current;
      for (let i = 0; i < 8; i++) s.particles.push({ x, y, vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6, life: 1 });
    }

    function loop() {
      const s = st.current;
      s.frame++;

      if (s.phase === 'playing') {
        s.ballX += s.ballVX; s.ballY += s.ballVY;
        if (s.ballX - BALL_R <= 0) { s.ballX = BALL_R; s.ballVX = Math.abs(s.ballVX); addParticles(s.ballX, s.ballY); }
        if (s.ballX + BALL_R >= W) { s.ballX = W - BALL_R; s.ballVX = -Math.abs(s.ballVX); addParticles(s.ballX, s.ballY); }

        const aiPad_Y = 30;
        const aiCenter = s.aiX + PAD_W / 2;
        if (aiCenter < s.ballX - 2) s.aiX = Math.min(W - PAD_W, s.aiX + AI_SPEED);
        else if (aiCenter > s.ballX + 2) s.aiX = Math.max(0, s.aiX - AI_SPEED);

        const playerPad_Y = H - 45;
        if (s.ballY + BALL_R >= playerPad_Y && s.ballY - BALL_R <= playerPad_Y + PAD_H && s.ballX >= s.playerX && s.ballX <= s.playerX + PAD_W) {
          const rel = (s.ballX - s.playerX) / PAD_W - 0.5;
          const spd = Math.sqrt(s.ballVX ** 2 + s.ballVY ** 2) + 0.1;
          s.ballVX = rel * spd * 2.5; s.ballVY = -Math.abs(s.ballVY);
          addParticles(s.ballX, playerPad_Y);
        }
        if (s.ballY - BALL_R <= aiPad_Y + PAD_H && s.ballY + BALL_R >= aiPad_Y && s.ballX >= s.aiX && s.ballX <= s.aiX + PAD_W) {
          const rel = (s.ballX - s.aiX) / PAD_W - 0.5;
          const spd = Math.sqrt(s.ballVX ** 2 + s.ballVY ** 2) + 0.1;
          s.ballVX = rel * spd * 2.5; s.ballVY = Math.abs(s.ballVY);
          addParticles(s.ballX, aiPad_Y + PAD_H);
        }

        if (s.ballY + BALL_R > H) { s.aiScore++; setUi(u => ({ ...u, aiScore: s.aiScore })); if (s.aiScore >= WIN_SCORE) { s.phase = 'result'; setUi(u => ({ ...u, phase: 'result' })); } else serveBall(-1); }
        if (s.ballY - BALL_R < 0) { s.playerScore++; setUi(u => ({ ...u, playerScore: s.playerScore })); if (s.playerScore >= WIN_SCORE) { s.phase = 'result'; setUi(u => ({ ...u, phase: 'result' })); } else serveBall(1); }

        s.particles = s.particles.filter(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.life -= 0.05; return p.life > 0; });
      }

      ctx.fillStyle = '#0F172A'; ctx.fillRect(0, 0, W, H);
      ctx.setLineDash([10, 10]); ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.textAlign = 'center'; ctx.font = 'bold 48px Arial'; ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillText(String(s.aiScore), W / 2, H / 2 - 15); ctx.fillText(String(s.playerScore), W / 2, H / 2 + 55);

      for (const p of s.particles) { ctx.globalAlpha = p.life; ctx.fillStyle = '#FCD34D'; ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 1;

      const aiPad_Y = 30, playerPad_Y = H - 45;
      const aiGrad = ctx.createLinearGradient(s.aiX, 0, s.aiX + PAD_W, 0);
      aiGrad.addColorStop(0, '#F87171'); aiGrad.addColorStop(1, '#EF4444');
      ctx.fillStyle = aiGrad; ctx.beginPath(); ctx.roundRect(s.aiX, aiPad_Y, PAD_W, PAD_H, 6); ctx.fill();
      const plGrad = ctx.createLinearGradient(s.playerX, 0, s.playerX + PAD_W, 0);
      plGrad.addColorStop(0, '#34D399'); plGrad.addColorStop(1, '#10B981');
      ctx.fillStyle = plGrad; ctx.beginPath(); ctx.roundRect(s.playerX, playerPad_Y, PAD_W, PAD_H, 6); ctx.fill();

      const glow = ctx.createRadialGradient(s.ballX, s.ballY, 0, s.ballX, s.ballY, BALL_R * 3);
      glow.addColorStop(0, 'rgba(255,255,255,0.5)'); glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(s.ballX, s.ballY, BALL_R * 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(s.ballX, s.ballY, BALL_R, 0, Math.PI * 2); ctx.fill();

      s.raf = requestAnimationFrame(loop);
    }

    st.current.raf = requestAnimationFrame(loop);
    const stRef = st.current;
    return () => cancelAnimationFrame(stRef.raf);
  }, []);

  useEffect(() => {
    let left = false, right = false;
    const interval = setInterval(() => {
      const s = st.current;
      if (s.phase !== 'playing') return;
      if (left) s.playerX = Math.max(0, s.playerX - 8);
      if (right) s.playerX = Math.min(W - PAD_W, s.playerX + 8);
    }, 16);
    const kd = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') left = true;
      if (e.key === 'ArrowRight') right = true;
    };
    const ku = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') left = false;
      if (e.key === 'ArrowRight') right = false;
    };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { clearInterval(interval); window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  const playerWon = ui.playerScore >= WIN_SCORE;

  return { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleCanvasClick, playerWon,
    nudgeLeft: () => { const s = st.current; s.playerX = Math.max(0, s.playerX - 45); },
    nudgeRight: () => { const s = st.current; s.playerX = Math.min(W - PAD_W, s.playerX + 45); },
  };
}
