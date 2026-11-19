"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { useAlternates } from "./Alternates";
import { SERVICES } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { AREAS } from "@/content/areas";
import { SITE } from "@/lib/site";
import { tr } from "@/lib/i18n-text";
import type { Locale } from "@/i18n/routing";

type Item = { label: string; href: React.ComponentProps<typeof Link>["href"] };
type Menu = { key: string; label: string; href: Item["href"]; items?: Item[]; all?: string };

export function Header() {
  const t = useTranslations("nav");
  const ta = useTranslations("a11y");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const menus: Menu[] = [
    {
      key: "services", label: t("services"), href: "/services", all: t("allServices"),
      items: SERVICES.map((s) => ({ label: tr(s.name, locale), href: { pathname: "/services/[slug]", params: { slug: tr(s.slug, locale) } } })),
    },
    {
      key: "industries", label: t("industries"), href: "/industries",
      items: INDUSTRIES.map((i) => ({ label: tr(i.name, locale), href: { pathname: "/industries/[slug]", params: { slug: tr(i.slug, locale) } } })),
    },
    {
      key: "areas", label: t("areas"), href: "/areas",
      items: AREAS.map((a) => ({ label: tr(a.name, locale), href: { pathname: "/areas/[slug]", params: { slug: tr(a.slug, locale) } } })),
    },
    { key: "about", label: t("about"), href: "/about" },
    { key: "support", label: t("support"), href: "/support" },
    { key: "contact", label: t("contact"), href: "/contact" },
  ];

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { setOpen(false); setDrop(null); }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setDrop(null); } };
    const onClick = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setDrop(null); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("click", onClick); };
  }, [open]);

  return (
    <>
      <div className="bg-navy text-[13px] text-on-navy">
        <div className="wrap flex items-center justify-between gap-6 py-2">
          <div className="flex min-w-0 gap-6 overflow-hidden whitespace-nowrap">
            <span className="hidden sm:inline">{SITE.address.full}</span>
            <a href={`mailto:${SITE.email}`} className="text-teal-light no-underline hover:underline">{SITE.email}</a>
            <a href={SITE.phoneHref} className="text-teal-light no-underline hover:underline">{SITE.phone}</a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${scrolled ? "border-line shadow-[0_8px_30px_-22px_rgba(11,37,69,.45)]" : "border-transparent"}`}>
        <div className="wrap flex items-center gap-4 py-3.5">
          <Link href="/" className="block w-[130px] shrink-0 py-1 lg:w-[172px]" aria-label="CRC Telecom">
            <Logo className="block h-auto w-full" />
          </Link>

          <nav ref={navRef} aria-label={t("home")} className="ml-auto hidden xl:block">
            <ul className="flex items-center">
              {menus.map((m) => (
                <li key={m.key} className="relative" onMouseEnter={() => m.items && setDrop(m.key)} onMouseLeave={() => setDrop(null)}>
                  {m.items ? (
                    <button
                      type="button"
                      aria-expanded={drop === m.key}
                      aria-controls={`dd-${m.key}`}
                      onClick={(e) => { e.stopPropagation(); setDrop(drop === m.key ? null : m.key); }}
                      className="flex items-center gap-1 whitespace-nowrap rounded-ctl px-2.5 py-2.5 text-[15px] font-medium text-navy hover:bg-grey"
                    >
                      {m.label}
                      <Icon name="chevron" className={`size-4 transition-transform duration-300 ${drop === m.key ? "rotate-180" : ""}`} strokeWidth={2} />
                    </button>
                  ) : (
                    <Link href={m.href} className="block whitespace-nowrap rounded-ctl px-2.5 py-2.5 text-[15px] font-medium text-navy no-underline hover:bg-grey">{m.label}</Link>
                  )}
                  {m.items && (
                    <div id={`dd-${m.key}`} hidden={drop !== m.key} className="absolute left-0 top-full pt-2">
                      <ul className={`rounded-media border border-line bg-white p-2 shadow-[0_24px_60px_-30px_rgba(11,37,69,.45)] ${m.key === "services" ? "grid w-[560px] grid-cols-2" : "w-[300px]"}`}>
                        {m.items.map((it) => (
                          <li key={it.label}>
                            <Link href={it.href} className="block rounded-ctl px-3 py-2.5 text-[14.5px] text-navy no-underline hover:bg-grey">{it.label}</Link>
                          </li>
                        ))}
                        <li className={m.key === "services" ? "col-span-2" : ""}>
                          <Link href={m.href} className="mt-1 flex items-center gap-2 rounded-ctl border-t border-line px-3 py-2.5 text-[14px] font-semibold text-navy no-underline hover:bg-grey">
                            {m.all ?? m.label} <Icon name="arrow" className="size-4" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto xl:ml-2"><LocaleSwitch locale={locale} tone="light" /></div>
          <a href={SITE.phoneHref} className="hidden items-center gap-2 whitespace-nowrap text-[15px] font-semibold text-navy no-underline md:inline-flex" aria-label={`${t("call")} ${SITE.phone}`}>
            <Icon name="phone" className="size-[18px] text-teal" strokeWidth={1.9} />
            <span className="xl:sr-only 2xl:not-sr-only">{SITE.phone}</span>
          </a>
          <Link href="/contact" className="btn btn-navy hidden !px-4 !py-3 !text-[14.5px] sm:inline-flex">{t("quote")}</Link>
          <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-nav" aria-label={ta("menu")} className="grid size-11 place-items-center rounded-ctl bg-grey text-navy sm:ml-0 xl:hidden">
            <Icon name="menu" strokeWidth={2} />
          </button>
        </div>
      </header>

      <div id="mobile-nav" hidden={!open} className="fixed inset-0 z-[60] overflow-y-auto bg-navy text-on-navy xl:hidden" role="dialog" aria-modal="true" aria-label={ta("menu")}>
        <div className="wrap flex items-center justify-between py-4">
          <Link href="/" className="block w-[130px]" aria-label="CRC Telecom"><Logo variant="white" className="h-auto w-full" /></Link>
          <button type="button" onClick={() => setOpen(false)} aria-label={ta("close")} className="grid size-11 place-items-center rounded-ctl bg-white/10 text-white">
            <Icon name="close" strokeWidth={2} />
          </button>
        </div>
        <nav className="wrap pb-10" aria-label={ta("menu")}>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {menus.map((m) => (
              <li key={m.key}>
                {m.items ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-[22px] font-semibold text-white">
                      {m.label}
                      <Icon name="plus" className="size-5 text-teal-light transition-transform duration-300 group-open:rotate-45" strokeWidth={2} />
                    </summary>
                    <ul className="grid gap-1 pb-4">
                      {m.items.map((it) => (
                        <li key={it.label}><Link href={it.href} className="block py-2 text-[16px] text-on-navy no-underline">{it.label}</Link></li>
                      ))}
                      <li><Link href={m.href} className="block py-2 text-[15px] font-semibold text-teal-light no-underline">{m.all ?? m.label} →</Link></li>
                    </ul>
                  </details>
                ) : (
                  <Link href={m.href} className="block py-4 font-display text-[22px] font-semibold text-white no-underline">{m.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href="/contact" className="btn btn-teal justify-center">{t("quote")}</Link>
            <a href={SITE.phoneHref} className="btn btn-ghost justify-center"><Icon name="phone" />{SITE.phone}</a>
          </div>
          <div className="mt-8"><LocaleSwitch locale={locale} /></div>
        </nav>
      </div>
    </>
  );
}

export function LocaleSwitch({ locale, tone = "dark" }: { locale: Locale; tone?: "dark" | "light" }) {
  const alt = useAlternates();
  const ta = useTranslations("a11y");
  const items: { l: Locale; label: string; full: string }[] = [
    { l: "fr", label: "FR", full: "Français" },
    { l: "en", label: "EN", full: "English" },
  ];
  return (
    <div role="group" aria-label={ta("lang")} className={`inline-flex rounded-full p-[3px] ${tone === "light" ? "bg-grey" : "bg-white/10"}`}>
      {items.map(({ l, label, full }) => (
        <a
          key={l}
          href={alt?.[l] ?? `/${l}`}
          hrefLang={l === "fr" ? "fr-CA" : "en-CA"}
          lang={l === "fr" ? "fr-CA" : "en-CA"}
          aria-current={l === locale ? "true" : undefined}
          title={full}
          className={`rounded-full px-2.5 py-1.5 text-[12px] font-semibold tracking-[0.06em] no-underline ${l === locale ? (tone === "light" ? "bg-navy text-white" : "bg-teal text-navy") : tone === "light" ? "text-slate hover:text-navy" : "text-on-navy hover:text-white"}`}
        >
          {label}
        </a>
      ))}
    </div>
  );
}
