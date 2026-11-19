import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, Faq, Placeholder } from "@/components/Blocks";
import { QuoteForm } from "@/components/Forms";
import { SetAlternates } from "@/components/Alternates";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { SERVICES, GROUPS, serviceBySlug, serviceById } from "@/content/services";
import { AREAS } from "@/content/areas";
import { SITE } from "@/lib/site";
import { tr } from "@/lib/i18n-text";
import { altPaths } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

type P = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SERVICES.map((s) => ({ locale, slug: s.slug[locale] })));
}

export async function generateMetadata({ params }: P) {
  const { locale, slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return pageMeta({ locale, alt: altPaths("/services/[slug]", s.slug), title: tr(s.name, locale), description: tr(s.meta, locale) });
}

export default async function ServicePage({ params }: P) {
  const { locale, slug } = await params;
  const s = serviceBySlug(slug);
  if (!s || s.slug[locale] !== slug) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const alt = altPaths("/services/[slug]", s.slug);
  const process = t.raw("service.process") as { t: string; d: string }[];
  const faq = tr(s.faq, locale);

  return (
    <>
      <SetAlternates alt={alt} />
      <PageHero
        eyebrow={tr(GROUPS[s.group], locale)}
        title={tr(s.name, locale)}
        lead={tr(s.summary, locale)}
        crumbs={[
          { label: t("nav.home"), href: "/", url: altPaths("/")[locale] },
          { label: t("nav.services"), href: "/services", url: altPaths("/services")[locale] },
          { label: tr(s.name, locale) },
        ]}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#quote" className="btn btn-teal">{t("nav.quote")}<Icon name="arrow" strokeWidth={2} /></a>
          <a href={SITE.phoneHref} className="btn btn-ghost"><Icon name="phone" />{SITE.phone}</a>
        </div>
      </PageHero>

      {/* What we offer */}
      <section className="wrap grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28" aria-labelledby="offer-h">
        <div className="lg:sticky lg:top-32 lg:self-start" data-reveal>
          <span className="grid size-16 place-items-center rounded-media bg-navy text-teal-light"><Icon name={s.icon} className="size-8" /></span>
          <h2 id="offer-h" className="h-section mt-6">{t("service.offerH")}</h2>
        </div>
        <ul className="grid border-t border-line sm:grid-cols-2">
          {tr(s.offers, locale).map((o) => (
            <li key={o} className="flex items-start gap-3 border-b border-line py-5 pr-6 text-[17px] font-medium text-navy" data-reveal>
              <Icon name="check" className="mt-0.5 size-5 shrink-0 text-teal" strokeWidth={2.2} />{o}
            </li>
          ))}
        </ul>
      </section>

      {/* Benefits */}
      <section className="bg-grey" aria-labelledby="ben-h">
        <div className="wrap py-20 lg:py-28">
          <h2 id="ben-h" className="h-section max-w-[18ch]" data-reveal>{t("service.benefitsH")}</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-media bg-line md:grid-cols-3">
            {tr(s.benefits, locale).map((b) => (
              <div key={b.title} className="bg-white p-7 lg:p-9" data-reveal>
                <h3 className="text-[22px] font-semibold leading-snug">{b.title}</h3>
                <p className="mt-3 text-[16px]">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases + brands */}
      <section className="wrap grid gap-14 py-20 lg:grid-cols-2 lg:py-28">
        <div data-reveal>
          <h2 className="text-[clamp(24px,2.6vw,34px)] font-semibold">{t("service.useH")}</h2>
          <ul className="mt-6 grid gap-2">
            {tr(s.useCases, locale).map((u) => (
              <li key={u} className="flex items-center gap-3 rounded-ctl border border-line px-4 py-3.5 text-[16px] text-navy">
                <span className="size-2 rounded-full bg-teal" aria-hidden="true" />{u}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <h2 className="text-[clamp(24px,2.6vw,34px)] font-semibold">{t("service.brandsH")}</h2>
          <p className="mt-3 text-[15px] text-ink-soft">{t("service.brandsP")}</p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <Placeholder key={i} className="h-16">Logo</Placeholder>)}
          </div>
        </div>
      </section>

      {/* Process: настоящая последовательность, поэтому здесь номера оправданы */}
      <section className="on-dark bg-navy text-on-navy" aria-labelledby="proc-h">
        <div className="wrap py-20 lg:py-28">
          <h2 id="proc-h" className="h-section text-white" data-reveal>{t("service.processH")}</h2>
          <ol className="relative mt-14 grid gap-8 lg:grid-cols-5 lg:gap-6">
            <span aria-hidden="true" className="absolute top-[22px] right-0 left-0 hidden h-px bg-white/15 lg:block" />
            {process.map((p, i) => (
              <li key={p.t} className="relative grid grid-cols-[44px_1fr] gap-4 lg:block" data-reveal>
                <span className="relative grid size-11 place-items-center rounded-ctl bg-teal font-display text-[15px] font-semibold text-navy">{String(i + 1).padStart(2, "0")}</span>
                <div className="lg:mt-6">
                  <h3 className="text-[19px] font-semibold text-white">{p.t}</h3>
                  <p className="mt-1.5 text-[15px] text-on-navy">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <div className="wrap py-20 lg:py-28"><Faq title={t("service.faqH")} items={faq} /></div>

      {/* Quote form pre-filled with this service */}
      <section id="quote" className="scroll-mt-28 bg-grey" aria-labelledby="quote-h">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:py-28">
          <div>
            <h2 id="quote-h" className="h-section">{t("service.quoteH")}</h2>
            <p className="mt-4">{t("service.quoteP")}</p>
            <p className="mt-6 text-[15px]"><a className="link" href={SITE.phoneHref}>{SITE.phone}</a><br /><a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          </div>
          <div className="rounded-media bg-white p-6 sm:p-8"><QuoteForm preselect={[s.id]} /></div>
        </div>
      </section>

      {/* Related */}
      <section className="wrap py-20 lg:py-28" aria-labelledby="rel-h">
        <h2 id="rel-h" className="h-section">{t("service.relatedH")}</h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {s.related.map((id) => {
            const r = serviceById(id);
            return (
              <li key={id} data-reveal>
                <Link href={{ pathname: "/services/[slug]", params: { slug: tr(r.slug, locale) } }} className="group flex h-full flex-col gap-3 rounded-media border border-line p-6 no-underline transition-colors duration-300 hover:border-navy hover:bg-navy">
                  <span className="grid size-11 place-items-center rounded-ctl bg-grey text-navy group-hover:bg-teal"><Icon name={r.icon} /></span>
                  <h3 className="text-[19px] font-semibold group-hover:text-white">{tr(r.name, locale)}</h3>
                  <p className="text-[15px] text-slate group-hover:text-on-navy">{tr(r.short, locale)}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Service",
        name: tr(s.name, locale), description: tr(s.summary, locale), serviceType: s.name.en,
        provider: { "@id": SITE.url + "/#business" },
        areaServed: AREAS.map((a) => a.name.en), url: SITE.url + alt[locale], inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }} />
    </>
  );
}
