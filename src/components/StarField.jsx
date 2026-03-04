import { useEffect, useRef } from "react";

/**
 * Full-screen canvas background.
 *  - Dark mode : twinkling star field + shooting stars + subtle grid
 *  - Light mode: interactive particle network with mouse attraction
 *
 * Reads `dark` via a ref so the canvas loop never needs to restart on theme change.
 */
export default function StarField({ dark }) {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const raf       = useRef(null);
  const darkRef   = useRef(dark);

  // Keep darkRef in sync without restarting the animation loop
  useEffect(() => { darkRef.current = dark; }, [dark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    /* ── resize ── */
    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── mouse tracking ── */
    const onMouse = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse);

    /* ──────────────────────────────────────────
       DARK MODE DATA — stars & shooters
    ────────────────────────────────────────── */
    const STAR_COUNT = 170;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      r:     Math.random() * 1.3 + 0.2,
      alpha: Math.random() * 0.55 + 0.12,
      ts:    Math.random() * 0.012 + 0.004,  // twinkle speed
      to:    Math.random() * Math.PI * 2,     // twinkle offset
      depth: Math.random() * 0.7 + 0.3,      // parallax depth
    }));

    const shooters = [];
    let shooterTimer = 0;
    const spawnShooter = () => shooters.push({
      x: Math.random() * W,
      y: Math.random() * H * 0.45,
      vx: (Math.random() * 3.5 + 2) * (Math.random() > 0.5 ? 1 : -1),
      vy: Math.random() * 2 + 0.8,
      len: Math.random() * 100 + 60,
      life: 0,
      maxLife: Math.random() * 55 + 38,
    });

    /* ──────────────────────────────────────────
       LIGHT MODE DATA — particle network
    ────────────────────────────────────────── */
    const NODE_COUNT   = 62;
    const CONNECT_DIST = 130;
    const MOUSE_ATTRACT = 180;

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:     Math.random() * 1200,
      y:     Math.random() * 800,
      vx:    (Math.random() - 0.5) * 0.38,
      vy:    (Math.random() - 0.5) * 0.28,
      r:     Math.random() * 2 + 1.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    /* ── main draw loop ── */
    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      const D  = darkRef.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      if (D) {
        drawDark(ctx, W, H, t, mx, my, stars, shooters, { shooterTimer, spawnShooter });
        shooterTimer++;
        if (shooterTimer > 130 + Math.random() * 170) {
          spawnShooter();
          shooterTimer = 0;
        }
      } else {
        drawLight(ctx, W, H, mx, my, nodes, CONNECT_DIST, MOUSE_ATTRACT);
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Dark mode renderer
───────────────────────────────────────────────────────────── */
function drawDark(ctx, W, H, t, mx, my, stars, shooters, { spawnShooter }) {
  const pmx = (mx / W - 0.5) * 20;
  const pmy = (my / H - 0.5) * 14;

  // faint grid
  ctx.lineWidth = 0.4;
  ctx.strokeStyle = "rgba(80,130,255,0.025)";
  const COLS = 14, ROWS = 9;
  for (let c = 0; c <= COLS; c++) {
    const px = (c / COLS) * W + pmx * 0.1;
    ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, H); ctx.stroke();
  }
  for (let r = 0; r <= ROWS; r++) {
    const py = (r / ROWS) * H + pmy * 0.1;
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke();
  }

  // stars
  stars.forEach(s => {
    const twinkle = 0.5 + 0.5 * Math.sin(t * s.ts * 80 + s.to);
    const a  = s.alpha * (0.45 + 0.55 * twinkle);
    const px = s.x * W + pmx * s.depth;
    const py = s.y * H + pmy * s.depth;

    ctx.beginPath();
    ctx.arc(px, py, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(210,225,255,${a})`;
    ctx.fill();

    // glow on larger stars
    if (s.r > 1.0 && a > 0.35) {
      const g = ctx.createRadialGradient(px, py, 0, px, py, s.r * 6);
      g.addColorStop(0, `rgba(160,200,255,${a * 0.28})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath(); ctx.arc(px, py, s.r * 6, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    }
  });

  // shooting stars
  for (let i = shooters.length - 1; i >= 0; i--) {
    const s    = shooters[i];
    s.life++; s.x += s.vx; s.y += s.vy;
    const prog = s.life / s.maxLife;
    const a    = prog < 0.25 ? prog / 0.25 : 1 - (prog - 0.25) / 0.75;
    const spd  = Math.hypot(s.vx, s.vy);
    const ex   = s.x - s.vx * (s.len / spd);
    const ey   = s.y - s.vy * (s.len / spd);

    const g = ctx.createLinearGradient(s.x, s.y, ex, ey);
    g.addColorStop(0, `rgba(230,240,255,${a * 0.9})`);
    g.addColorStop(1, "rgba(180,210,255,0)");

    ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(ex, ey);
    ctx.strokeStyle = g; ctx.lineWidth = 1.3; ctx.stroke();

    if (s.life >= s.maxLife) shooters.splice(i, 1);
  }
}

/* ─────────────────────────────────────────────────────────────
   Light mode renderer
───────────────────────────────────────────────────────────── */
function drawLight(ctx, W, H, mx, my, nodes, CONNECT_DIST, MOUSE_ATTRACT) {
  // update node positions
  nodes.forEach(n => {
    const dx   = mx - n.x;
    const dy   = my - n.y;
    const dist = Math.hypot(dx, dy);
    if (dist < MOUSE_ATTRACT && dist > 1) {
      n.vx += (dx / dist) * 0.012;
      n.vy += (dy / dist) * 0.012;
    }
    n.vx *= 0.985; n.vy *= 0.985;
    n.x  += n.vx;  n.y  += n.vy;
    n.pulse += 0.018;

    // wrap around edges
    if (n.x < -20)    n.x = W + 20;
    if (n.x > W + 20) n.x = -20;
    if (n.y < -20)    n.y = H + 20;
    if (n.y > H + 20) n.y = -20;
  });

  // edges
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < CONNECT_DIST) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(80,110,200,${(1 - d / CONNECT_DIST) * 0.18})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  // nodes
  nodes.forEach(n => {
    const pulse = 0.6 + 0.4 * Math.sin(n.pulse);

    // outer glow
    const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
    g.addColorStop(0, `rgba(70,100,220,${0.18 * pulse * 0.7})`);
    g.addColorStop(1, "rgba(70,100,220,0)");
    ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill();

    // core
    ctx.beginPath(); ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(70,100,210,${0.35 * pulse})`;
    ctx.fill();

    // mouse proximity highlight
    const d = Math.hypot(mx - n.x, my - n.y);
    if (d < 90) {
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(60,100,230,${(1 - d / 90) * 0.55})`;
      ctx.fill();
    }
  });
}
