"use client";
import { useEffect, useRef, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { MAP } from "@/content/map-geo";

type RegionId = "qc" | "on" | "ny" | "vt";
type RegionItem = { id: RegionId; name: string; sub: string; languages: string; slug: string };

/** Порядок подсветки: от штаб-квартиры наружу. */
const ORDER: RegionId[] = ["qc", "vt", "ny", "on"];
const CITIES = [
  { id: "tb", n: "Thunder Bay", p: MAP.cities.thunderBay, dx: 14, anchor: "start" as const },
  { id: "kn", n: "Kenora", p: MAP.cities.kenora, dx: -14, anchor: "end" as const },
];

/** Дуга от штаба к городу (квадратичная кривая, выгнутая вверх). */
function arc(a: readonly number[], b: readonly number[]) {
  const cx = (a[0] + b[0]) / 2, cy = Math.min(a[1], b[1]) - Math.abs(a[0] - b[0]) * 0.28;
  return `M${a[0]} ${a[1]} Q${cx} ${cy} ${b[0]} ${b[1]}`;
}

/** Подпись-плашка. Ширина оценивается по числу символов (SVG не умеет «по содержимому» без замера). */
function Pill({ at, text, align = "middle" }: { at: readonly number[]; text: string; align?: "middle" | "start" }) {
  const w = text.length * 12.6 + 26, h = 36;
  const x = align === "middle" ? at[0] - w / 2 : at[0];
  return (
    <g>
      <rect x={x} y={at[1] - h / 2} width={w} height={h} rx="8" fill="#FFFFFF" />
      <text x={x + w / 2} y={at[1] + 8} textAnchor="middle" fill="#0B2545">{text}</text>
    </g>
  );
}

export function CoverageMap({ regions, label, note, hqLabel }: { regions: RegionItem[]; label: string; note: string; hqLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [active, setActive] = useState<RegionId | null>(null);
  // "static" — без JS и при reduced motion всё сразу подсвечено; "pre" → "lit" — анимация при появлении.
  const [phase, setPhase] = useState<"static" | "pre" | "lit">("static");
  const byId = Object.fromEntries(regions.map((r) => [r.id, r])) as Record<RegionId, RegionItem>;

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    if (el.getBoundingClientRect().top < innerHeight * 0.7) return;
    setPhase("pre");
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setPhase("lit"); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lit = phase !== "pre";
  const go = (id: RegionId) => router.push({ pathname: "/areas/[slug]", params: { slug: byId[id].slug } });
  const hq = MAP.cities.hq;

  return (
    <div ref={ref} className={`cov grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 ${lit ? "cov-lit" : ""} ${phase === "lit" ? "cov-anim" : ""}`}>
      <ul className="grid gap-2" onMouseLeave={() => setActive(null)}>
        {regions.map((r) => (
          <li key={r.id}>
            <Link
              href={{ pathname: "/areas/[slug]", params: { slug: r.slug } }}
              onMouseEnter={() => setActive(r.id)}
              onFocus={() => setActive(r.id)}
              onBlur={() => setActive(null)}
              className={`group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-ctl border-[1.5px] px-4 py-4 no-underline transition-[border-color,background-color,transform] duration-300 ${active === r.id ? "translate-x-1.5 border-navy bg-navy" : "border-line bg-white hover:border-navy"}`}
            >
              <span className={`size-3 rounded-full transition-colors duration-300 ${active === r.id ? "bg-teal-light" : "bg-teal"}`} aria-hidden="true" />
              <span>
                <b className={`block font-display text-[17px] font-semibold leading-tight ${active === r.id ? "text-white" : "text-navy"}`}>{r.name}</b>
                <small className={`text-[13.5px] ${active === r.id ? "text-on-navy" : "text-slate"}`}>{r.sub}</small>
              </span>
              <span className={`rounded-chip px-2 py-1 text-[11.5px] font-semibold tracking-[0.1em] ${active === r.id ? "bg-white/10 text-teal-light" : "bg-grey text-navy"}`}>{r.languages}</span>
            </Link>
          </li>
        ))}
      </ul>

      <figure>
        <div className="overflow-hidden rounded-media bg-navy">
          <svg viewBox={`0 0 ${MAP.W} ${MAP.H}`} role="img" aria-label={label} className="block h-auto w-full" onMouseLeave={() => setActive(null)}>
            <defs>
              <clipPath id="cov-nw"><path d={MAP.nwMask} /></clipPath>
              <radialGradient id="cov-glow">
                <stop offset="0" stopColor="#5EEAD4" stopOpacity=".35" />
                <stop offset="1" stopColor="#5EEAD4" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Соседние провинции и штаты: только контекст */}
            <g aria-hidden="true" fill="#11335a" stroke="#1f4a76" strokeWidth="1" strokeLinejoin="round">
              {MAP.context.map((d, i) => <path key={i} d={d} />)}
              <path d={MAP.regions.on} />
            </g>

            {/* Четыре региона из брифа */}
            <g aria-hidden="true" stroke="#0B2545" strokeWidth="1.5" strokeLinejoin="round">
              {ORDER.map((id, i) => (
                <path
                  key={id}
                  d={MAP.regions[id]}
                  clipPath={id === "on" ? "url(#cov-nw)" : undefined}
                  className={`cov-region cursor-pointer ${active === id ? "is-active" : active ? "is-muted" : ""}`}
                  style={{ transitionDelay: phase === "lit" && !active ? `${200 + i * 260}ms` : "0ms" }}
                  onMouseEnter={() => setActive(id)}
                  onClick={() => go(id)}
                />
              ))}
            </g>

            {/* Вода поверх: Великие озёра, залив Святого Лаврентия, Гудзонов залив */}
            <path d={MAP.lakes} fill="#0B2545" aria-hidden="true" pointerEvents="none" />
            <path d={MAP.border} fill="none" stroke="#5EEAD4" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="5 6" aria-hidden="true" />

            {/* Маршруты от штаба */}
            <g aria-hidden="true" fill="none" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round" pointerEvents="none">
              {CITIES.map((c, i) => (
                <path key={c.id} d={arc(hq, c.p)} pathLength={1} className="cov-route" style={{ transitionDelay: `${1300 + i * 250}ms` }} />
              ))}
            </g>

            {/* Подписи регионов: светлые плашки с тёмным текстом (бриф запрещает белый текст на бирюзе) */}
            <g aria-hidden="true" className="cov-labels font-display" pointerEvents="none" fontWeight="600" fontSize="22">
              {(["qc", "on", "ny"] as const).map((id) => <Pill key={id} at={MAP.labels[id]} text={byId[id]?.name ?? ""} />)}
              {/* Вермонт узкий: подпись выносим вправо с выноской */}
              <line x1={MAP.labels.vt[0]} y1={MAP.labels.vt[1]} x2={MAP.labels.vtLabel[0]} y2={MAP.labels.vtLabel[1]} stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="1.5" />
              <circle cx={MAP.labels.vt[0]} cy={MAP.labels.vt[1]} r="3.5" fill="#FFFFFF" />
              <Pill at={MAP.labels.vtLabel} text={byId.vt?.name ?? ""} align="start" />
            </g>

            {/* Города из брифа */}
            <g aria-hidden="true" className="font-sans" pointerEvents="none" fontWeight="600" fontSize="22">
              {CITIES.map((c) => (
                <g key={c.id} className="cov-city">
                  <circle cx={c.p[0]} cy={c.p[1]} r="6" fill="#FFFFFF" stroke="#0B2545" strokeWidth="2.5" />
                  <text x={c.p[0] + c.dx} y={c.p[1] - 10} textAnchor={c.anchor} fill="#FFFFFF" stroke="#0B2545" strokeWidth="5" paintOrder="stroke">{c.n}</text>
                </g>
              ))}
              <circle cx={hq[0]} cy={hq[1]} r="60" fill="url(#cov-glow)" />
              <circle cx={hq[0]} cy={hq[1]} r="10" className="cov-pulse" fill="none" stroke="#5EEAD4" strokeWidth="2" />
              <circle cx={hq[0]} cy={hq[1]} r="10" className="cov-pulse cov-pulse-2" fill="none" stroke="#5EEAD4" strokeWidth="2" />
              <circle cx={hq[0]} cy={hq[1]} r="8" fill="#5EEAD4" stroke="#0B2545" strokeWidth="3" />
              {/* Плашка штаба — слева от точки, над тёмным Онтарио */}
              <g transform={`translate(${hq[0] - 20 - (hqLabel.length * 11 + 28)} ${hq[1] + 6})`}>
                <rect x="0" y="-24" width={hqLabel.length * 11 + 28} height="36" rx="8" fill="#0B2545" stroke="#5EEAD4" strokeOpacity=".6" />
                <text x="14" y="1" fill="#FFFFFF" fontSize="19">{hqLabel}</text>
              </g>
            </g>
          </svg>
        </div>
        <figcaption className="mt-3 text-[13px] text-ink-soft">{note}</figcaption>
      </figure>
    </div>
  );
}
