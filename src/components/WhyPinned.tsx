"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Icon";

const ICONS = ["one", "cert", "north", "support"];

/** «Почему CRC»: 4 пункта = точка + 3 дуги эмблемы. На десктопе блок закрепляется, пункты загораются по скроллу. */
export function WhyPinned({ eyebrow, title, points }: { eyebrow: string; title: string; points: { t: string; d: string }[] }) {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(3);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      setStep(0);
      const st = ScrollTrigger.create({
        trigger: root.current, start: "top top", end: "+=220%", pin: true, scrub: true,
        onUpdate: (s) => setStep(Math.min(3, Math.floor(s.progress * 4))),
      });
      return () => { st.kill(); setStep(3); };
    });
    return () => mm.revert();
  }, []);

  const on = (i: number) => i <= step;
  return (
    <section ref={root} className="on-dark overflow-hidden bg-navy text-on-navy" aria-labelledby="why-h">
      <div className="wrap grid items-center gap-12 py-20 lg:min-h-screen lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="why-h" className="h-section mt-4 text-white">{title}</h2>
          <ol className="mt-10 grid">
            {points.map((p, i) => (
              <li key={p.t} className={`grid grid-cols-[44px_1fr] gap-4 border-t border-white/10 py-5 transition-opacity duration-500 ${on(i) ? "opacity-100" : "opacity-35"}`}>
                <span className="grid size-11 place-items-center rounded-ctl border-[1.5px] border-teal-light/40 text-teal-light"><Icon name={ICONS[i]} className="size-5" /></span>
                <div>
                  <h3 className="text-[20px] font-semibold text-white">{p.t}</h3>
                  <p className="mt-1.5 max-w-[46ch] text-[15.5px] text-on-navy">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="order-first mx-auto w-full max-w-[300px] lg:order-none lg:max-w-[480px]" aria-hidden="true">
          <svg viewBox="0 0 120 120" className="h-auto w-full overflow-visible">
            <rect x="0" y="0" width="120" height="120" rx="26" fill="#0F2E55" stroke="rgba(94,234,212,.16)" />
            <circle cx="38" cy="82" r="9" fill={on(0) ? "#14B8A6" : "rgba(20,184,166,.3)"} style={{ transition: "fill .5s" }} />
            {[ "M38 56 A26 26 0 0 1 64 82", "M38 36 A46 46 0 0 1 84 82", "M38 16 A66 66 0 0 1 104 82" ].map((d, i) => (
              <path key={d} d={d} fill="none" strokeWidth="9" strokeLinecap="round" stroke={on(i + 1) ? "#FFFFFF" : "rgba(255,255,255,.12)"} style={{ transition: "stroke .5s" }} />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
