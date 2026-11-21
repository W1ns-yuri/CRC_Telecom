import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "./Icon";
import { JsonLd } from "./JsonLd";
import { SITE } from "@/lib/site";

type Crumb = { label: string; href?: React.ComponentProps<typeof Link>["href"]; url?: string };

export function PageHero({ eyebrow, title, lead, crumbs, children }: { eyebrow?: string; title: string; lead?: string; crumbs: Crumb[]; children?: React.ReactNode }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy text-on-navy">
      <svg viewBox="0 0 120 120" aria-hidden="true" className="absolute -right-24 -bottom-40 -z-10 size-[560px] opacity-[0.07] sm:-right-10">
        {["M38 56 A26 26 0 0 1 64 82", "M38 36 A46 46 0 0 1 84 82", "M38 16 A66 66 0 0 1 104 82"].map((d) => (
          <path key={d} d={d} fill="none" stroke="#5EEAD4" strokeWidth="9" strokeLinecap="round" />
        ))}
      </svg>
      <div className="wrap pt-10 pb-16 lg:pt-14 lg:pb-24">
        <nav aria-label="Breadcrumb" className="text-[13.5px]">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                {c.href ? <Link href={c.href} className="text-on-navy-soft no-underline hover:text-white">{c.label}</Link> : <span aria-current="page" className="text-white">{c.label}</span>}
                {i < crumbs.length - 1 && <span aria-hidden="true" className="text-on-navy-soft">/</span>}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow mt-10">{eyebrow}</p>}
        <h1 className={`${eyebrow ? "mt-4" : "mt-10"} max-w-[20ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.025em] text-white`}>{title}</h1>
        {lead && <p className="mt-6 max-w-[60ch] text-[clamp(16px,1.4vw,19px)] text-on-navy">{lead}</p>}
        {children}
      </div>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, ...(c.url ? { item: SITE.url + c.url } : {}) })),
      }} />
    </section>
  );
}

export async function CtaBand({ title, text, button }: { title?: string; text?: string; button?: string }) {
  const t = await getTranslations("home");
  return (
    <section className="relative isolate overflow-hidden bg-teal text-navy" aria-labelledby="cta-h">
      <svg viewBox="0 0 120 120" aria-hidden="true" className="absolute top-1/2 -right-40 -z-10 size-[520px] -translate-y-1/2 lg:-right-16 lg:size-[680px]">
        {["M38 56 A26 26 0 0 1 64 82", "M38 36 A46 46 0 0 1 84 82", "M38 16 A66 66 0 0 1 104 82"].map((d) => (
          <path key={d} d={d} fill="none" stroke="rgba(11,37,69,.13)" strokeWidth="11" strokeLinecap="round" />
        ))}
      </svg>
      <div className="wrap grid items-center gap-8 py-16 lg:grid-cols-[1.4fr_auto] lg:py-24">
        <div data-reveal>
          <h2 id="cta-h" className="text-[clamp(28px,4vw,54px)] font-semibold leading-[1.05] tracking-[-0.025em]">{title ?? t("ctaH")}</h2>
          <p className="mt-4 max-w-[52ch] text-[18px] text-navy">{text ?? t("ctaP")}</p>
        </div>
        <Link href="/contact" className="btn btn-navy justify-self-start" data-reveal data-magnetic>{button ?? t("ctaBtn")}<Icon name="arrow" strokeWidth={2} /></Link>
      </div>
    </section>
  );
}

export function Faq({ items, title }: { items: { q: string; a: string }[]; title: string }) {
  return (
    <section aria-labelledby="faq-h">
      <h2 id="faq-h" className="h-section">{title}</h2>
      <div className="mt-8 border-t border-line">
        {items.map((f) => (
          <details key={f.q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[18px] font-semibold text-navy">
              {f.q}
              <span className="grid size-9 shrink-0 place-items-center rounded-ctl border border-line text-navy transition-transform duration-300 group-open:rotate-45"><Icon name="plus" className="size-4" strokeWidth={2} /></span>
            </summary>
            <p className="max-w-[68ch] pb-6 text-[16px]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Placeholder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex items-center justify-center rounded-ctl border-[1.5px] border-dashed border-[#B8C4D3] px-4 py-3 text-center text-[13px] text-ink-soft ${className}`}>{children}</div>;
}
