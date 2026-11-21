import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { WhyPinned } from "@/components/WhyPinned";
import { CoverageMap } from "@/components/CoverageMap";
import { CtaBand, Placeholder } from "@/components/Blocks";
import { SetAlternates } from "@/components/Alternates";
import { Icon } from "@/components/Icon";
import { SERVICES, GROUPS, serviceById } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { AREAS } from "@/content/areas";
import { SITE } from "@/lib/site";
import { tr } from "@/lib/i18n-text";
import { altPaths } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { ...pageMeta({ locale, alt: altPaths("/"), title: t("title"), description: t("description") }), title: { absolute: t("title") } };
}

export default async function Home({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const why = t.raw("why") as { t: string; d: string }[];
  const trust = t.raw("trust") as string[];

  return (
    <>
      <SetAlternates alt={altPaths("/")} />

      {/* 1. Hero */}
      <Hero eyebrow={t("eyebrow")} h1a={t("h1a")} h1b={t("h1b")} sub={t("sub")} quote={tn("quote")} services={t("ctaServices")} call={tn("call")} photoAlt={t("photoAlt")}
        marquee={SERVICES.map((s) => tr(s.name, locale))} marqueeLabel={tn("services")} pauseLabel={t("marqueePause")} playLabel={t("marqueePlay")} />

      {/* 2. Trust bar: факты из брифа + места под данные, которые пришлёт CRC */}
      <section aria-label={t("trustSlots")} className="border-b border-line">
        <ul className="wrap grid gap-x-8 gap-y-3 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((f) => (
            <li key={f} className="flex items-center gap-3 text-[15px] font-medium text-navy">
              <Icon name="check" className="size-5 shrink-0 text-teal" strokeWidth={2.2} />{f}
            </li>
          ))}
        </ul>
        <div className="bg-grey">
          <div className="wrap flex flex-wrap items-center gap-3 py-4">
            <p className="mr-auto text-[13px] text-ink-soft">{t("trustSlots")} : {tc("suppliedByCrc")}</p>
            {[t("slotYears"), t("slotCert"), t("slotPartner"), t("slotPartner")].map((s, i) => <Placeholder key={i} className="!py-2 min-w-[96px] flex-1 sm:flex-none">{s}</Placeholder>)}
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section className="wrap py-20 lg:py-32" aria-labelledby="svc-h">
        <div className="mb-12 max-w-[860px]" data-reveal>
          <p className="eyebrow">{tn("services")}</p>
          <h2 id="svc-h" className="h-section mt-4">{t("servicesH")}</h2>
          <p className="lede mt-5">{t("servicesP")}</p>
        </div>
        <ServicesGrid
          allLabel={t("filterAll")}
          more={tc("learnMore")}
          filterLabel={tn("services")}
          groups={(Object.keys(GROUPS) as (keyof typeof GROUPS)[]).map((g) => ({ id: g, label: tr(GROUPS[g], locale) }))}
          items={SERVICES.map((s) => ({ id: s.id, slug: tr(s.slug, locale), icon: s.icon, group: s.group, groupLabel: tr(GROUPS[s.group], locale), name: tr(s.name, locale), short: tr(s.short, locale), offers: tr(s.offers, locale) }))}
        />
      </section>

      {/* 4. Why CRC — закреплённый блок */}
      <WhyPinned eyebrow={t("whyEyebrow")} title={t("whyH")} points={why} />

      {/* 5. Industries: липкий заголовок слева, список справа. Госсектор первым (бриф). */}
      <section className="bg-grey" aria-labelledby="ind-h">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:py-32">
          <div className="lg:sticky lg:top-32 lg:self-start" data-reveal>
            <h2 id="ind-h" className="h-section">{t("indH")}</h2>
            <p className="lede mt-5">{t("indP")}</p>
            <Link href="/industries" className="link mt-6 inline-block">{tc("seeAll")}</Link>
          </div>
          <ul className="border-t border-[#CFD8E3]">
            {INDUSTRIES.map((ind, i) => (
              <li key={ind.id} data-reveal>
                <Link href={{ pathname: "/industries/[slug]", params: { slug: tr(ind.slug, locale) } }}
                  className="group grid grid-cols-[1fr_auto] items-center gap-6 border-b border-[#CFD8E3] py-7 no-underline">
                  <div>
                    <h3 className="text-[clamp(21px,2.3vw,30px)] font-semibold leading-tight transition-transform duration-500 group-hover:translate-x-2">
                      {tr(ind.name, locale)}
                      {i === 0 && <span className="ml-3 inline-block translate-y-[-3px] rounded-chip bg-navy px-2 py-1 align-middle font-sans text-[11px] font-semibold tracking-[0.12em] text-teal-light uppercase">{locale === "fr" ? "Priorité" : "Priority"}</span>}
                    </h3>
                    <p className="mt-2 max-w-[60ch] text-[15.5px]">{tr(ind.intro, locale)}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ind.services.slice(0, 4).map((id) => <span key={id} className="chip">{tr(serviceById(id).name, locale)}</span>)}
                    </div>
                  </div>
                  <span className="grid size-12 place-items-center rounded-ctl border-[1.5px] border-navy text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-teal-light">
                    <Icon name="arrow" className="size-5" strokeWidth={2} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Service area map */}
      <section className="wrap py-20 lg:py-32" aria-labelledby="map-h">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end" data-reveal>
          <div>
            <p className="eyebrow">{tn("areas")}</p>
            <h2 id="map-h" className="h-section mt-4">{t("mapH")}</h2>
          </div>
          <p className="lede">{t("mapP")}</p>
        </div>
        <CoverageMap hqLabel={tc("headOffice")}
          label={t("mapLabel")}
          note={t("mapNote")}
          regions={AREAS.map((a) => ({ id: a.id, name: tr(a.name, locale), sub: tr(a.places, locale)[0], languages: a.languages, slug: tr(a.slug, locale) }))}
        />
      </section>

      {/* 7. Featured projects / testimonials: бриф — только реальные, с разрешения. Секция включится, когда CRC пришлёт материалы. */}

      {/* 8. CTA band */}
      <CtaBand />
    </>
  );
}
