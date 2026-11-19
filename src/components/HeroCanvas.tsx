"use client";
import { useEffect, useRef } from "react";

/** Волны сигнала, расходящиеся из одной точки — мотив логотипа. */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, vis = true, mx = 0, my = 0, tx = 0, ty = 0;
    const t0 = performance.now();
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size); ro.observe(c);
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; }); io.observe(c);
    const move = (e: PointerEvent) => { const r = c.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5; };
    c.parentElement?.addEventListener("pointermove", move);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!vis) return;
      const t = (now - t0) / 1000;
      mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      const wide = w > 1024;
      const ox = (wide ? w * 0.64 : w * 0.86) + mx * 40;
      const oy = (wide ? h * 0.92 : h * 0.97) + my * 30;
      ctx.clearRect(0, 0, w, h);
      const gs = 34;
      ctx.fillStyle = "rgba(94,234,212,.08)";
      for (let x = (w % gs) / 2; x < w; x += gs) for (let y = (h % gs) / 2; y < h; y += gs) { ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5); }
      const maxR = Math.hypot(w, h) * 0.95, gap = 58, speed = reduce ? 0 : 36;
      const n = Math.ceil(maxR / gap) + 1;
      ctx.lineCap = "round";
      for (let i = 0; i < n; i++) {
        const r = (t * speed + i * gap) % (n * gap);
        if (r < 16) continue;
        const a = Math.max(0, 1 - r / maxR) * 0.5;
        const accent = i % 5 === 0;
        ctx.strokeStyle = accent ? `rgba(94,234,212,${a})` : `rgba(255,255,255,${a * 0.45})`;
        ctx.lineWidth = accent ? 2 : 1.1;
        ctx.beginPath(); ctx.arc(ox, oy, r, -Math.PI * 0.98, -Math.PI * 0.02); ctx.stroke();
      }
      ctx.fillStyle = "#14B8A6";
      ctx.beginPath(); ctx.arc(ox, oy, 7, 0, Math.PI * 2); ctx.fill();
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); c.parentElement?.removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full" />;
}
