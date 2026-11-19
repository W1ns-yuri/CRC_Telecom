"use client";
import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/** Плавный скролл (Lenis) + мягкое появление блоков с атрибутом data-reveal.
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
    return () => { clearTimeout(id); ctx.revert(); };
  }, [pathname]);

  return null;
}
