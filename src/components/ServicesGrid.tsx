"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Icon } from "./Icon";

type Item = { id: string; slug: string; icon: string; group: string; groupLabel: string; name: string; short: string; offers: string[] };

export function ServicesGrid({ items, groups, allLabel, more, filterLabel }: { items: Item[]; groups: { id: string; label: string }[]; allLabel: string; more: string; filterLabel: string }) {
  const [f, setF] = useState("all");
  const tabs = [{ id: "all", label: allLabel }, ...groups];
  return (
    <>
      <div role="group" aria-label={filterLabel} className="mb-6 flex flex-wrap gap-2">
        {tabs.map((g) => (
          <button key={g.id} type="button" aria-pressed={f === g.id} onClick={() => setF(g.id)}
            className={`rounded-ctl border-[1.5px] px-4 py-2 text-[14px] font-medium transition-colors ${f === g.id ? "border-navy bg-navy text-white" : "border-line bg-white text-navy hover:border-navy"}`}>
            {g.label}
          </button>
        ))}
      </div>
      <ul className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => {
          const dim = f !== "all" && s.group !== f;
          return (
            <li key={s.id} className={`border-r border-b border-line transition-opacity duration-300 ${dim ? "opacity-30" : ""}`}>
              <Link href={{ pathname: "/services/[slug]", params: { slug: s.slug } }} tabIndex={dim ? -1 : undefined}
                className="group relative flex h-full flex-col gap-3 overflow-hidden bg-white p-6 text-slate no-underline transition-colors duration-500 hover:bg-navy focus-visible:bg-navy lg:min-h-[300px] lg:p-7">
                <span className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-ctl bg-grey text-navy transition-colors duration-300 group-hover:bg-teal group-focus-visible:bg-teal"><Icon name={s.icon} /></span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft group-hover:text-teal-light group-focus-visible:text-teal-light">{s.groupLabel}</span>
                </span>
                <h3 className="mt-3 text-[20px] font-semibold leading-snug transition-colors group-hover:text-white group-focus-visible:text-white">{s.name}</h3>
                <p className="text-[15.5px] leading-relaxed group-hover:text-on-navy group-focus-visible:text-on-navy">{s.short}</p>
                <ul className="flex flex-wrap gap-1.5 overflow-hidden lg:max-h-0 lg:opacity-0 lg:transition-[max-height,opacity] lg:duration-500 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-24 lg:group-focus-visible:opacity-100">
                  {s.offers.slice(0, 3).map((o) => (
                    <li key={o} className="rounded-chip bg-grey px-2 py-1 text-[12.5px] text-navy lg:bg-teal-light/15 lg:text-teal-light">{o}</li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[14px] font-semibold text-navy group-hover:text-teal-light group-focus-visible:text-teal-light">
                  {more}<Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                </span>
                <svg viewBox="0 0 120 120" aria-hidden="true" className="pointer-events-none absolute -right-8 -bottom-8 size-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {["M38 56 A26 26 0 0 1 64 82", "M38 36 A46 46 0 0 1 84 82", "M38 16 A66 66 0 0 1 104 82"].map((d) => (
                    <path key={d} d={d} fill="none" stroke="rgba(94,234,212,.35)" strokeWidth="7" strokeLinecap="round" />
                  ))}
                </svg>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
