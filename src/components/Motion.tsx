"use client";
import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

/** Плавный скролл (Lenis), появление блоков с data-reveal, раскрытие заголовков .h-section по строкам,
 *  «магнитные» кнопки с data-magnetic.
 *  Всё отключается при prefers-reduced-motion. Контент виден и без JS. */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
      gsap.set(els, { y: 28, opacity: 0 });
      ScrollTrigger.batch(els, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08, clearProps: "transform,opacity" }),
      });
    });
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);

    // Заголовки секций: строки выезжают из-под маски. SplitText сам ставит aria-label, текст читается целиком.
    gsap.registerPlugin(SplitText);
    const splits: SplitText[] = [];
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      gsap.utils.toArray<HTMLElement>(".h-section").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
        const sp = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line", aria: "auto" });
        splits.push(sp);
        gsap.from(sp.lines, { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.09, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
    });

    // Магнитные кнопки: только мышь, не тач.
    const offs: (() => void)[] = [];
    if (matchMedia("(pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.25); yTo((e.clientY - r.top - r.height / 2) * 0.35); };
        const leave = () => { xTo(0); yTo(0); };
        el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
        offs.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); gsap.set(el, { clearProps: "transform" }); });
      });
    }

    return () => { alive = false; clearTimeout(id); ctx.revert(); splits.forEach((s) => s.revert()); offs.forEach((f) => f()); };
  }, [pathname]);

  return null;
}
