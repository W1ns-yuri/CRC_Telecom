"use client";
import { useState } from "react";
import { Icon } from "./Icon";

/**
 * Бегущая строка с названиями услуг внизу хиро.
 * Только CSS-анимация transform. Есть кнопка паузы (WCAG 2.2.2), при reduced motion строка стоит.
 * Копия списка нужна для бесшовной петли и скрыта от скринридеров.
 */
export function Marquee({ items, label, pause, play }: { items: string[]; label: string; pause: string; play: string }) {
  const [paused, setPaused] = useState(false);
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((s) => (
        <li key={s} className="flex items-center whitespace-nowrap font-display text-[clamp(20px,2.2vw,30px)] font-semibold tracking-[-0.01em] text-white/85">
          {s}
          <svg viewBox="0 0 24 24" aria-hidden="true" className="mx-7 size-5 text-teal-light lg:mx-10">
            <path d="M6 18a2 2 0 1 0 0-.01M6 11a7 7 0 0 1 7 7M6 5a13 13 0 0 1 13 13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative flex items-center border-t border-white/10">
      <div className="marquee group relative min-w-0 flex-1 overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]" data-paused={paused || undefined}>
        <p className="sr-only">{label}: {items.join(", ")}</p>
        <div className="marquee-track flex w-max" aria-hidden="true">
          {row(true)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? play : pause}
        aria-pressed={paused}
        className="marquee-btn mr-4 grid size-9 shrink-0 place-items-center rounded-full text-on-navy ring-1 ring-white/20 hover:text-white hover:ring-white/50 lg:mr-8"
      >
        <Icon name={paused ? "play" : "pause"} className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}
