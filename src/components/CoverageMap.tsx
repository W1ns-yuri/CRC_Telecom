"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

type RegionId = "qc" | "on" | "ny" | "vt";
type RegionItem = { id: RegionId; name: string; sub: string; languages: string; slug: string };

// Упрощённые контуры регионов (долгота, широта). Точечная матрица скрывает неточность контуров.
const POLY: Record<string, [number, number][]> = {
  qc: [[-79.5,51.5],[-79.5,47.4],[-78.8,46.3],[-77.2,45.8],[-75.8,45.5],[-74.5,45.3],[-74.7,45.0],[-71.5,45.0],[-71.1,45.3],[-70.3,45.9],[-70.0,46.7],[-69.2,47.4],[-68.3,47.4],[-67.8,47.1],[-66.4,48.0],[-64.3,48.4],[-64.5,49.0],[-66.2,49.2],[-68.6,48.6],[-69.8,47.8],[-70.9,47.1],[-70.0,47.9],[-68.0,49.2],[-66.0,50.2],[-62.0,50.2],[-59.0,50.5],[-57.1,51.4],[-60.0,52.0],[-64.0,52.0],[-64.5,52.8],[-67.0,52.8],[-67.5,54.2],[-66.0,55.0],[-64.6,56.5],[-64.5,60.3],[-67.0,58.6],[-69.3,58.9],[-70.5,61.0],[-73.8,62.4],[-77.6,62.5],[-77.5,60.8],[-78.0,58.5],[-76.6,56.4],[-77.3,55.5],[-79.0,54.6],[-78.7,52.2]],
  on: [[-95.15,49.0],[-95.15,52.8],[-89.0,56.85],[-87.6,56.0],[-85.0,55.3],[-85.0,48.0],[-86.4,48.7],[-88.2,48.3],[-89.2,48.4],[-89.6,48.0],[-90.8,48.2],[-92.5,48.5],[-93.8,48.6],[-94.7,48.8]],
  ny: [[-79.76,42.0],[-79.76,42.27],[-78.9,42.9],[-79.05,43.25],[-77.6,43.3],[-76.2,43.5],[-76.3,44.0],[-75.8,44.4],[-74.7,45.0],[-73.35,45.0],[-73.3,44.5],[-73.4,43.6],[-73.25,42.75],[-73.5,42.05],[-73.5,41.2],[-73.7,41.0],[-74.0,40.6],[-74.25,40.5],[-74.7,41.35],[-75.1,41.8],[-75.35,42.0]],
  li: [[-74.0,40.6],[-73.0,40.75],[-71.86,41.07],[-72.6,40.95],[-73.6,40.95]],
  vt: [[-73.35,45.0],[-71.5,45.0],[-71.6,44.6],[-72.05,44.3],[-72.4,43.6],[-72.55,42.73],[-73.25,42.74],[-73.3,43.6],[-73.4,44.0]],
};
const CITIES = [
  { n: "Mont-Royal", p: [-73.65, 45.5], hq: true },
  { n: "Thunder Bay", p: [-89.25, 48.4] },
  { n: "Kenora", p: [-94.5, 49.77] },
];
const HQ: [number, number] = [-73.65, 45.5];

function inPoly(x: number, y: number, p: [number, number][]) {
  let ins = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const [xi, yi] = p[i], [xj, yj] = p[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) ins = !ins;
  }
  return ins;
}

export function CoverageMap({ regions, label, note }: { regions: RegionItem[]; label: string; note: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<RegionId | null>(null);
  const activeRef = useRef<RegionId | null>(null);
  activeRef.current = active;

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const B = { x0: -97, x1: -56, y0: 39.5, y1: 63.5 }, kx = Math.cos((51 * Math.PI) / 180);
    let w = 0, h = 0, sc = 1, offx = 0, offy = 0, raf = 0, vis = false, start: number | null = null;
    let dots: { x: number; y: number; reg: string | null; d: number }[] = [];
    const t0 = performance.now();
    const proj = (lon: number, lat: number): [number, number] => [offx + (lon - B.x0) * kx * sc, offy + (B.y1 - lat) * sc];
    const unproj = (x: number, y: number): [number, number] => [(x - offx) / (kx * sc) + B.x0, B.y1 - (y - offy) / sc];
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gw = (B.x1 - B.x0) * kx, gh = B.y1 - B.y0;
      sc = Math.min(w / gw, h / gh) * 0.98; offx = (w - gw * sc) / 2; offy = (h - gh * sc) / 2 - h * 0.02;
      const step = Math.max(6, w / 80); const hq = proj(...HQ); dots = [];
      for (let y = step / 2; y < h; y += step) for (let x = step / 2; x < w; x += step) {
        const [lo, la] = unproj(x, y); let reg: string | null = null;
        for (const k in POLY) if (inPoly(lo, la, POLY[k])) { reg = k === "li" ? "ny" : k; break; }
        dots.push({ x, y, reg, d: Math.hypot(x - hq[0], y - hq[1]) });
      }
    };
    size();
    const ro = new ResizeObserver(size); ro.observe(c);
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; if (vis && start === null) start = performance.now(); }, { threshold: 0.2 }); io.observe(c);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!vis) return;
      const t = (now - t0) / 1000, since = reduce ? 99 : (now - (start ?? now)) / 1000;
      const act = activeRef.current;
      ctx.clearRect(0, 0, w, h);
      const hq = proj(...HQ), front = since * Math.max(w, h) * 0.6, step = Math.max(6, w / 80), rr = step * 0.2;
      const span = Math.max(w, h) * 1.2;
      for (const d of dots) {
        if (!d.reg) { ctx.fillStyle = "rgba(148,180,210,.12)"; ctx.beginPath(); ctx.arc(d.x, d.y, rr * 0.8, 0, 6.283); ctx.fill(); continue; }
        const lit = d.d < front, on = act === d.reg, mute = !!act && !on;
        const wave = reduce ? 0 : Math.max(0, 1 - Math.abs(d.d - ((t * 90) % span)) / 24);
        const a = lit ? (mute ? 0.3 : 1) : 0.15;
        ctx.fillStyle = on ? `rgba(94,234,212,${a})` : wave > 0 && lit && !mute ? `rgba(255,255,255,${0.55 + wave * 0.45})` : `rgba(20,184,166,${a * 0.9})`;
        ctx.beginPath(); ctx.arc(d.x, d.y, rr * (on ? 1.55 : 1.25) + wave * rr * 0.5, 0, 6.283); ctx.fill();
      }
      if (!reduce) for (let i = 0; i < 3; i++) {
        const p = (t * 0.55 + i / 3) % 1;
        ctx.strokeStyle = `rgba(94,234,212,${(1 - p) * 0.7})`; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(hq[0], hq[1], 6 + p * w * 0.12, 0, 6.283); ctx.stroke();
      }
      ctx.font = `500 ${Math.max(11, w / 50)}px Inter, system-ui, sans-serif`;
      CITIES.forEach((ci, idx) => {
        const [x, y] = proj(ci.p[0], ci.p[1]);
        const appear = Math.min(1, Math.max(0, (since - 0.6 - idx * 0.15) * 2));
        if (appear <= 0) return;
        if (!ci.hq) {
          const cx = (x + hq[0]) / 2, cy = Math.min(y, hq[1]) - Math.abs(x - hq[0]) * 0.22 - 20;
          ctx.strokeStyle = `rgba(94,234,212,${0.35 * appear})`; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
          ctx.beginPath(); ctx.moveTo(hq[0], hq[1]); ctx.quadraticCurveTo(cx, cy, x, y); ctx.stroke(); ctx.setLineDash([]);
          if (!reduce) {
            const p = (t * 0.3 + idx * 0.3) % 1, q = 1 - p;
            ctx.fillStyle = "#5EEAD4"; ctx.beginPath();
            ctx.arc(q * q * hq[0] + 2 * q * p * cx + p * p * x, q * q * hq[1] + 2 * q * p * cy + p * p * y, 2.2, 0, 6.283); ctx.fill();
          }
        }
        ctx.fillStyle = ci.hq ? "#14B8A6" : "#FFFFFF"; ctx.beginPath(); ctx.arc(x, y, ci.hq ? 6 : 3.2, 0, 6.283); ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${0.92 * appear})`;
        ctx.textAlign = ci.hq ? "right" : "left";
        ctx.fillText(ci.n, x + (ci.hq ? -10 : 9), y + 4);
      });
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
      <ul className="grid gap-2 lg:order-1" onMouseLeave={() => setActive(null)}>
        {regions.map((r) => (
          <li key={r.id}>
            <Link
              href={{ pathname: "/areas/[slug]", params: { slug: r.slug } }}
              onMouseEnter={() => setActive(r.id)}
              onFocus={() => setActive(r.id)}
              onBlur={() => setActive(null)}
              className={`group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-ctl border-[1.5px] px-4 py-4 no-underline transition-[border-color,background-color,transform] duration-300 ${active === r.id ? "translate-x-1.5 border-navy bg-navy" : "border-line bg-white hover:border-navy"}`}
            >
              <span className="size-3 rounded-full bg-teal" aria-hidden="true" />
              <span>
                <b className={`block font-display text-[17px] font-semibold leading-tight ${active === r.id ? "text-white" : "text-navy"}`}>{r.name}</b>
                <small className={`text-[13.5px] ${active === r.id ? "text-on-navy" : "text-slate"}`}>{r.sub}</small>
              </span>
              <span className={`rounded-chip px-2 py-1 text-[11.5px] font-semibold tracking-[0.1em] ${active === r.id ? "bg-white/10 text-teal-light" : "bg-grey text-navy"}`}>{r.languages}</span>
            </Link>
          </li>
        ))}
      </ul>
      <figure className="lg:order-2">
        <div className="relative aspect-square max-w-full overflow-hidden rounded-media bg-navy">
          <canvas ref={ref} role="img" aria-label={label} className="absolute inset-0 h-full w-full" />
        </div>
        <figcaption className="mt-3 text-[13px] text-ink-soft">{note}</figcaption>
      </figure>
    </div>
  );
}
